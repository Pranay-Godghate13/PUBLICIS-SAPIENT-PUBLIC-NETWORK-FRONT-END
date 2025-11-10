import './SearchBar.css';

function SearchBar({ query, setQuery, onSearch }) {
  const handleChange = (e) => setQuery(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      <button className="search-button" onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
