import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PurchaseManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const buyProduct = (index) => {
    const quantity = prompt('Enter quantity to buy:', '1');
    if (quantity && !isNaN(quantity)) {
      const updatedProducts = [...products];
      updatedProducts[index].quantity += parseInt(quantity);
      updateLocalStorage(updatedProducts);
    }
  };

  const sellProduct = (index) => {
    const quantity = prompt('Enter quantity to sell:', '1');
    if (quantity && !isNaN(quantity) && products[index].quantity >= parseInt(quantity)) {
      const updatedProducts = [...products];
      updatedProducts[index].quantity -= parseInt(quantity);
      updateLocalStorage(updatedProducts);
    } else {
      alert('Invalid quantity or insufficient stock!');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Purchase Management - Wings Cafe Inventory System</h1>
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
        <h2>Manage Purchases</h2>
        {products.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableHeaderCell}>Product Name</th>
                <th style={styles.tableHeaderCell}>Quantity</th>
                <th style={styles.tableHeaderCell}>Price</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{product.name}</td>
                  <td style={styles.tableCell}>{product.quantity}</td>
                  <td style={styles.tableCell}>
                    M{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </td>
                  <td style={styles.tableCell}>
                    <button style={styles.button} onClick={() => buyProduct(index)}>Buy</button>
                    <button style={styles.button} onClick={() => sellProduct(index)}>Sell</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noProductsMessage}>No products available. Please add products first.</p>
        )}
      </div>
    </div>
  );
};

// CSS styles as objects
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
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
  table: {
    width: '100%',
    margin: '20px auto',
    borderCollapse: 'collapse',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
  },
  tableHeader: {
    backgroundColor: '#007BFF', 
    color: 'white',
  },
  tableHeaderCell: {
    padding: '15px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd', 
    transition: 'background-color 0.3s', 
  },
  tableCell: {
    padding: '15px',
    textAlign: 'left',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginRight: '5px',
    transition: 'background-color 0.3s', 
  },
  noProductsMessage: {
    color: 'red',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default PurchaseManagement;
