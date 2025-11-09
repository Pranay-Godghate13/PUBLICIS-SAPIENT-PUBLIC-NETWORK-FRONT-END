import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = () => {
    console.log('Searching for:', query);
    fetch(`http://localhost:8080/user/keyword?keyword=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(json => {
      console.log('Results:', json.content); 
      setUsers(json.content);                
    })
      .catch(err => console.error('Search error:', err));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount >= 3) {
      handleSearch();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  
  return (
    <div className="search-container" id="search-container">
     <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {users.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Age</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
    </div>
  )
}

export default App
