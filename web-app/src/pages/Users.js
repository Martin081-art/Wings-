import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State for hover effect on Add User button

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const addUser = () => {
    if (username && password) {
      const newUser = { username, password };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      alert('User added successfully!');
      setUsername('');
      setPassword('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  const editUser = (index) => {
    const newUsername = prompt('Enter new username:', users[index].username);
    const newPassword = prompt('Enter new password:', users[index].password);

    if (newUsername && newPassword) {
      const updatedUsers = [...users];
      updatedUsers[index] = { username: newUsername, password: newPassword };
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      alert('User updated successfully!');
    } else {
      alert('Please provide valid inputs.');
    }
  };

  const deleteUser = (index) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((_, i) => i !== index);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      alert('User deleted successfully!');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>User Management - Wings Cafe Inventory System</h1>
      </header>

      <nav style={styles.nav}>
        <Link to="/Home" style={styles.navLink}>
          <i className="fas fa-tachometer-alt" style={styles.icon}></i> Dashboard
        </Link>
        <Link to="/Product" style={styles.navLink}>
          <i className="fas fa-box" style={styles.icon}></i> Product Management
        </Link>
        <Link to="/Purchases" style={styles.navLink}>
          <i className="fas fa-shopping-cart" style={styles.icon}></i> Purchase Management
        </Link>
        <Link to="/Users" style={styles.navLink}>
          <i className="fas fa-users" style={styles.icon}></i> User Management
        </Link>
      </nav>

      <div style={styles.content}>
        <h2>Manage Users</h2>

        <div style={styles.formSection}>
          <h3>Add User</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
          />
          <button
            onClick={addUser}
            style={{
              ...styles.button,
              backgroundColor: isHovered ? '#0056b3' : '#007bff', // Change button color on hover
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Add User
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>Username</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{user.username}</td>
                <td style={styles.tableCell}>
                  <button style={styles.actionButton} onClick={() => editUser(index)}>Edit</button>
                  <button style={styles.actionButton} onClick={() => deleteUser(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// CSS styles as objects
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f55713',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: 'black',
    color: 'aqua',
    padding: '20px',
    textAlign: 'center',
  },
  nav: {
    backgroundColor: 'black',
    padding: '10px',
    textAlign: 'center',
  },
  navLink: {
    color: 'aqua',
    textDecoration: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    display: 'inline-block',
  },
  icon: {
    marginRight: '8px', 
  },
  content: {
    padding: '20px',
    textAlign: 'center',
    flexGrow: 1,
  },
  formSection: {
    margin: '20px auto',
    textAlign: 'center',
    width: '60%',
    backgroundColor: '#f1f1f1', 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
  },
  input: {
    padding: '10px',
    margin: '5px',
    width: '200px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px',
    margin: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s', 
  },
  table: {
    width: '60%',
    margin: '20px auto',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
  },
  tableHeaderCell: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tableRow: {
    transition: 'background-color 0.3s', 
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  actionButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginRight: '5px',
    transition: 'background-color 0.3s', 
  },
};

export default UserManagement;
