import './Controls.css';

function Controls({ roles, selectedRole, onFilter, onSort, sortOrder }) {
  return (
    <div className="controls">
      <select
        className="role-filter"
        value={selectedRole}
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="">All Roles</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>{role}</option>
        ))}
      </select>
      <button className="sort-button" onClick={onSort}>
        Sort by Age ({sortOrder === 'asc' ? '↑' : '↓'})
      </button>
    </div>
  );
}

export default Controls;
