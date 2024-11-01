import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import wingsLogo from '../pages/wings.png'; // Path for logo
import backgroundImg from '../images/cocktail.jpeg'; // Path for background image

function Lock() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', username);
      alert('Login successful!...Welcome back ' + username);
      navigate('/Home');
    } else {
      alert('Invalid credentials! Please try again.');
    }
  };

  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find((u) => u.username === username);

    if (userExists) {
      alert('Username is already taken! Please choose another one.');
    } else {
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign up successful! You can now log in.');
      toggleAuth();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Navigation bar */}
      <nav style={styles.navbar}>
        <h1 id="main-header" style={styles.navHeading}>Wings Cafe - Login </h1>
      </nav>

      
      <div className="container" id="auth-container" style={styles.formContainer}>
        {/* Logo */}
        <img src={wingsLogo} alt="Wings Logo" style={styles.logo} />
        
        <h2 id="auth-header" style={styles.formHeader}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <br />
          
          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="switch" onClick={toggleAuth} style={styles.switch}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Wings Cafe. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

// Internal CSS styles object
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    backgroundPosition: 'center',
  },
  navbar: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark transparent navbar
    padding: '15px',
    textAlign: 'center',
    zIndex: 1, 
  },
  navHeading: {
    color: 'lightblue',
    fontSize: '24px',
    margin: 0,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '350px',
    margin: 'auto',
  },
  logo: {
    width: '120px',
    marginBottom: '20px',
  },
  formHeader: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#ff6600', 
    color: 'white',
    padding: '15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px', 
    marginTop: '10px',
    width: '100%', // Full-width button for consistency
  },
  switch: {
    marginTop: '20px',
    color: '#007bff',
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark footer background
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    width: '100%',
  },
};

export default Lock;
