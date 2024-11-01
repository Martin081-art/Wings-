import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

function Home() {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(''); // Add state for logged-in user
  const navigate = useNavigate();

  // CSS styles
  const styles = {
    container: {
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      backgroundColor: 'black',
      color: 'aqua',
      padding: '20px',
      textAlign: 'center',
      position: 'relative', 
    },
    nav: {
      backgroundColor: 'black',
      padding: '10px',
      textAlign: 'center',
    },
    link: {
      color: 'aqua',
      textDecoration: 'none',
      padding: '10px 20px',
      margin: '0 10px',
      display: 'inline-block',
      fontSize: '18px',
    },
    icon: {
      marginRight: '8px',
    },
    userSection: {
      position: 'absolute', 
      right: '20px',
      top: '20px',
      display: 'flex',
      alignItems: 'center',
      color: 'aqua',
      fontSize: '24px',
    },
    userIcon: {
      marginRight: '8px',
      fontSize: '40px',
    },
    content: {
      padding: '20px',
      textAlign: 'center',
      flexGrow: 1, 
    },
    searchBar: {
      marginBottom: '20px',
    },
    stockList: {
      listStyleType: 'none',
      padding: '0',
    },
    stockItem: {
      padding: '10px',
      margin: '5px',
      backgroundColor: 'white',
      border: '1px solid #ddd',
    },
    lowStock: {
      backgroundColor: '#f8d7da',
    },
    noProductsMessage: {
      color: 'red',
      fontSize: '16px',
    },
    logoutButton: {
      color: '#c01515',
      cursor: 'pointer',
      backgroundColor: 'white',
      border: 'none',
      padding: '5px 10px',
      fontWeight: 'bold',
    },
    marquee: {
      border: 'solid 5px red',
      backgroundColor: 'blue',
      borderRadius: '10px',
      padding: '10px',
      color: 'white',
    },
    footer: {
      backgroundColor: 'black',
      color: 'aqua',
      padding: '10px',
      textAlign: 'center',
      marginTop: 'auto',
    },
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    setProductList(products);

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/L'); // Redirect to login page if not logged in
    } else {
      setLoggedInUser(loggedInUser); // Set the logged-in user
    }
  }, [navigate]);

  const displayProducts = (products) => {
    return products.map((product) => (
      <li
        key={product.name}
        style={{
          ...styles.stockItem,
          ...(product.quantity <= 5 ? styles.lowStock : {}),
        }}
      >
        {`${product.name} - ${product.quantity} units ${
          product.quantity <= 5 ? ' - Low Stock!' : ''
        }`}
      </li>
    ));
  };

  const searchProducts = () => {
    const filteredProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredProducts;
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    navigate('/'); // Redirect to login page
  };

  const filteredProducts = searchProducts();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Dashboard - Wings Cafe Inventory System</h1>
        
        <div style={styles.userSection}>
          <i className="fas fa-user-circle" style={styles.userIcon}></i>
          <span>{loggedInUser}</span>
        </div>
      </header>

      <nav style={styles.nav}>
        <Link to="/Home" style={styles.link}>
          <i className="fas fa-tachometer-alt" style={styles.icon}></i> Dashboard
        </Link>
        <Link to="/Product" style={styles.link}>
          <i className="fas fa-box" style={styles.icon}></i> Product Management
        </Link>
        <Link to="/Purchases" style={styles.link}>
          <i className="fas fa-shopping-cart" style={styles.icon}></i> Purchase Management
        </Link>
        <Link to="/Users" style={styles.link}>
          <i className="fas fa-users" style={styles.icon}></i> User Management
        </Link>
        <button style={styles.logoutButton} onClick={logout}>
          <i className="fas fa-sign-out-alt" style={styles.icon}></i> Logout
        </button>
      </nav>

      <div style={styles.content}>
        

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for a product..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <h2 style={styles.marquee}>
          <marquee>Overview of Current Stock Levels</marquee>
        </h2>

        {filteredProducts.length === 0 ? (
          <p style={styles.noProductsMessage}>No products found.</p>
        ) : (
          <ul style={styles.stockList}>{displayProducts(filteredProducts)}</ul>
        )}
      </div>

      <footer style={styles.footer}>
        &copy; 2024 Wings Cafe Inventory System
      </footer>
    </div>
  );
}

export default Home;
