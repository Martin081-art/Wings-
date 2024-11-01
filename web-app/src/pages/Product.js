import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (storedProducts.length > 0) {
      setProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { id, name, description, category, price, quantity } = productForm;
    if (id !== null) {
      const updatedProducts = products.map((product, index) =>
        index === id ? { name, description, category, price, quantity: parseInt(quantity) } : product
      );
      setProducts(updatedProducts);
    } else {
      const newProducts = [...products, { name, description, category, price, quantity: parseInt(quantity) }];
      setProducts(newProducts);
    }
    setProductForm({
      id: null,
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
    });
  };

  const editProduct = (index) => {
    const product = products[index];
    setProductForm({
      id: index,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    if (updatedProducts.length > 0) {
      setProducts(updatedProducts);
    }
  };

  return (
    <div id="full" style={styles.full}>
      {/* Nav Bar*/}
      <nav style={styles.nav}>
        <h1 style={styles.heading}>Product Management - Inventory System</h1>
        <div style={styles.links}>
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
        </div>
      </nav>

      <div id="productManagement">
        <form onSubmit={handleFormSubmit} style={styles.productForm}>
          <input
            type="text"
            name="name"
            value={productForm.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
            style={styles.input}
          />
          <input
            type="text"
            name="description"
            value={productForm.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            required
            style={styles.input}
          />
          <input
            type="text"
            name="category"
            value={productForm.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
            style={styles.input}
          />
          <input
            type="number"
            name="price"
            value={productForm.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            style={styles.input}
          />
          <input
            type="number"
            name="quantity"
            value={productForm.quantity}
            onChange={handleInputChange}
            placeholder="Initial Quantity"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            {productForm.id !== null ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <div id="productList" style={styles.productList}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} style={styles.productItem}>
                <strong>{product.name}</strong> M{product.price}   Quantity: {product.quantity}
                <button onClick={() => editProduct(index)} style={styles.editButton}>Edit</button>
                <button onClick={() => deleteProduct(index)} style={styles.deleteButton}>Delete</button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

//  CSS styles
const styles = {
  full: {
    backgroundSize: 'cover',
    minHeight: '100vh',
    color: 'white',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    backgroundColor: 'black', 
    padding: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    margin: '0', 
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
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
  productForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '100%',
    maxWidth: '300px',
    boxSizing: 'border-box',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  productList: {
    marginTop: '20px',
  },
  productItem: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '10px',
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '10px',
  },
};

export default ProductManagement;
