import './UserGrid.css';
function UserGrid({ users }) {
  return (
    <div className="user-grid">
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>SSN:</strong> {user.ssn}</p>
        </div>
      ))}
    </div>
  );
}

export default UserGrid;
