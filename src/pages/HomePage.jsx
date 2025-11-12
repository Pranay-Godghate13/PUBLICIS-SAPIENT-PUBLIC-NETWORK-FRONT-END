import { useState, useEffect } from 'react';
import { loadData, searchUsers } from '../services/userService';
import { handleApiError } from '../utils/errorHandler';
import Header from '../components/Header/Header';
import SearchBar  from '../components/SearchBar/SearchBar';
import Controls from '../components/Controls/Controls';
// import UserGrid from '../components/UserGrid/UserGrid';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import axios from 'axios';
import { Suspense } from 'react';
import React from "react";
import { toast } from "react-toastify";

const UserGrid=React.lazy(()=>import('../components/UserGrid/UserGrid'));
function HomePage() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // useEffect(() => {
  //   // loadData()
  //   loadData()
  //   .then(r => console.log("Response:", r.data))
  //   .catch(err => console.log('Initial load failed',err));
  // }, []);
  useEffect(() => {
    let retryCount = 0;
    let maxRetries = 10; // optional limit, or keep infinite
    let retryDelay = 2000; // 2 seconds

    const fetchData = async () => {
      try {
        const r = await loadData();
        console.log("Response:", r.data);
        setUsers(r.data.content || []);
        setFilteredUsers(r.data.content || []);
        setError(null); // clear error if successful
      } catch (err) {
        console.log(`Attempt ${retryCount + 1} failed`, err);
        retryCount++;
        if (retryCount <= maxRetries) {
          setTimeout(fetchData, retryDelay);
        } else {
          setError("Unable to connect to backend after multiple attempts.");
        }
      }
    };

    fetchData();
  }, []);
  
  const handleSearch = async () => {
    if (!query || query.trim().length < 3)
      {
         toast.error("Please enter at least 3 characters!");
         return;
      } 
    try {
      setLoading(true);
      const res = await searchUsers(query);
      setUsers(res.data.content);
      setFilteredUsers(res.data.content);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    const sorted = [...filteredUsers].sort((a, b) =>
      sortOrder === 'asc' ? a.age - b.age : b.age - a.age
    );
    setFilteredUsers(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    const filtered = role
      ? users.filter(user => user.role.toLowerCase() === role.toLowerCase())
      : users;
    setFilteredUsers(filtered);
  };

  if (loading) return <p className="loading-class">Loading...</p>;
  if (error) return <ErrorFallback message={error} />;

  return (
    <div className="search-container">
      
      
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {users.length > 0 && (
        <Controls
          roles={[...new Set(users.map(u => u.role))]}
          selectedRole={selectedRole}
          onFilter={handleRoleFilter}
          onSort={handleSort}
          sortOrder={sortOrder}
        />
      )}
      {filteredUsers.length>0 &&(
      <Suspense fallback={<div>Loading...</div>}>
        <UserGrid users={filteredUsers} />
      </Suspense>)}
    </div>
  );
}

export default HomePage;
