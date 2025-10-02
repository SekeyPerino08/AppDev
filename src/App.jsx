import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ category: '', minPrice: 0, maxPrice: 10000, sortBy: 'title' });
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setCategories([...new Set(data.products.map(p => p.category))]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.category === '' || product.category === filters.category) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice
    )
    .sort((a, b) => {
      if (filters.sortBy === 'price') return a.price - b.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('details');
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const goHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== id));
  };

  const handleCompletePurchase = () => {
    setCart([]);
    setCurrentView('home');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src="https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/559110727_122206678280329418_3761945414484031418_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeERSLsisMgIhjzjozFCD_7_l6mWYe6KtiCXqZZh7oq2IEi8-bWAMYQq1MwBYAgN3TnVpsJAIGeMH8zhUIvAeFZV&_nc_ohc=Vevx3fhjfe8Q7kNvwHEX2An&_nc_oc=AdmuvPZe6i9EVEDx1aHpEJOjUJPi5ed0MV0pS62wnm9UW4QSiOW3YBgE4cfPA1PHZN8&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_gid=9LnXCspgSPrL29cq3Kpj4w&oh=00_AfYNvIRAT7s_SFL1G2QgmY8xls1Ncr0DZ6SSfMuidLozhQ&oe=68E46CC9" alt="KAKING Logo" style={{ height: '50px', marginRight: '10px' }} />
        <h1 style={{ margin: 0, color: '#1a237e' }}>KAKING</h1>
      </header>
      <button onClick={goHome}>Home</button>
      <button onClick={() => setCurrentView('cart')}>Cart ({cart.length})</button>
      {currentView === 'home' && (
        <>
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <Filters filters={filters} onFilterChange={setFilters} categories={categories} />
          <ProductList
            products={paginatedProducts}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
      {currentView === 'details' && (
        <ProductDetails
          product={selectedProduct}
          onAddToCart={() => handleAddToCart(selectedProduct)}
          onBack={goHome}
        />
      )}
      {currentView === 'cart' && (
        <Cart
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={() => setCurrentView('checkout')}
        />
      )}
      {currentView === 'checkout' && (
        <Checkout cart={cart} onCompletePurchase={handleCompletePurchase} />
      )}
    </div>
  );
}

export default App;
