import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FiShoppingBag, 
  FiSearch, 
  FiFilter, 
  FiStar, 
  FiShoppingCart,
  FiTag,
  FiClock,
  FiTruck,
  FiShield,
  FiMessageSquare,
  FiUsers,
  FiX,
  FiCheck,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

// Mock product data
const categories = [
  { id: 1, name: 'All', icon: '🛍️' },
  { id: 2, name: 'Electronics', icon: '📱' },
  { id: 3, name: 'Fashion', icon: '👕' },
  { id: 4, name: 'Books', icon: '📚' },
  { id: 5, name: 'Home', icon: '🏠' },
  { id: 6, name: 'Sports', icon: '⚽' },
  { id: 7, name: 'Beauty', icon: '💄' },
  { id: 8, name: 'Toys', icon: '🧸' },
];

const products = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 124,
    image: 'https://via.placeholder.com/300x300?text=Wireless+Earbuds',
    category: 'Electronics',
    isNew: true,
    isOnSale: true,
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.2,
    reviewCount: 89,
    image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
    category: 'Electronics',
    isNew: true,
    isOnSale: false,
    inStock: true
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.0,
    reviewCount: 56,
    image: 'https://via.placeholder.com/300x300?text=T-Shirt',
    category: 'Fashion',
    isNew: false,
    isOnSale: true,
    inStock: true
  },
  {
    id: 4,
    name: 'Programming Book: React Guide',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 42,
    image: 'https://via.placeholder.com/300x300?text=React+Book',
    category: 'Books',
    isNew: true,
    isOnSale: true,
    inStock: true
  }
];

const StoreHomepage = () => {
  // Styles (light defaults with dark variants)
  const pageStyles = 'min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white';
  const headerStyles = 'backdrop-blur-sm border-b bg-white/70 border-neutral-200 dark:bg-neutral-900/80 dark:border-neutral-800';
  const cardStyles = 'bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700';
  const buttonStyles = 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors';
  const secondaryButtonStyles = 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-4 py-2 rounded-lg font-medium transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white';
  const inputStyles = 'w-full rounded-lg px-4 py-2 border outline-none bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300 focus:border-blue-500 dark:bg-neutral-800 dark:text-white dark:border-neutral-700';
  const tagStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium';
  const priceStyles = 'text-lg font-semibold text-neutral-900 dark:text-white';
  const originalPriceStyles = 'text-sm text-neutral-500 line-through dark:text-neutral-400';
  const ratingStyles = 'flex items-center text-yellow-500 text-sm dark:text-yellow-400';
  const filterPanelStyles = 'bg-white border border-neutral-200 p-4 rounded-lg dark:bg-neutral-900 dark:border-neutral-800';
  const filterTitleStyles = 'text-neutral-900 dark:text-white font-medium mb-3';
  const filterItemStyles = 'flex items-center gap-2 py-1.5 text-neutral-600 hover:text-neutral-900 cursor-pointer dark:text-neutral-300 dark:hover:text-white';
  const activeFilterItemStyles = 'text-blue-600 dark:text-blue-400';
  const sectionTitleStyles = 'text-xl font-semibold text-neutral-900 dark:text-white mb-4';
  const dividerStyles = 'border-t border-neutral-200 dark:border-neutral-800 my-4';

  // State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || product.inStock;
    const matchesSale = !onSaleOnly || product.isOnSale;
    const price = product.price;
    const matchesMinPrice = !minPrice || price >= parseFloat(minPrice);
    const matchesMaxPrice = !maxPrice || price <= parseFloat(maxPrice);
    const matchesRating = selectedRatings.length === 0 || 
      selectedRatings.some(rating => Math.floor(product.rating) === rating);

    return (
      matchesCategory && 
      matchesSearch && 
      matchesStock && 
      matchesSale && 
      matchesMinPrice && 
      matchesMaxPrice &&
      matchesRating
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: return 0;
    }
  });

  // Helper functions
  const getDiscount = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSelectedRatings([]);
    setShowFilters(false);
    setSelectedCategory('All');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } w-4 h-4`}
          />
        ))}
        <span className="text-sm text-gray-400 ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  // Filter panel component
  const FilterPanel = () => (
    <div className={filterPanelStyles}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Filters</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="md:hidden text-neutral-400 hover:text-white"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium text-neutral-300 mb-2">Price Range</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                placeholder="Min"
                className={`${inputStyles} text-sm`}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Max"
                className={`${inputStyles} text-sm`}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* In Stock */}
        <div>
          <div className="flex items-center">
            <input
              id="in-stock"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-700 rounded bg-neutral-800"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <label htmlFor="in-stock" className="ml-2 text-sm text-neutral-300">
              In Stock Only
            </label>
          </div>
        </div>

        {/* On Sale */}
        <div>
          <div className="flex items-center">
            <input
              id="on-sale"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-700 rounded bg-neutral-800"
              checked={onSaleOnly}
              onChange={(e) => setOnSaleOnly(e.target.checked)}
            />
            <label htmlFor="on-sale" className="ml-2 text-sm text-neutral-300">
              On Sale
            </label>
          </div>
        </div>

        {/* Ratings */}
        <div>
          <h4 className="text-sm font-medium text-neutral-300 mb-2">Customer Review</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  id={`rating-${rating}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-700 rounded bg-neutral-800"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => toggleRating(rating)}
                />
                <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-neutral-300 flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-neutral-600'}`}
                    />
                  ))}
                  <span className="ml-1">& Up</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={clearFilters}
          className={`w-full ${secondaryButtonStyles} mt-4`}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className={pageStyles}>
      <Helmet>
        <title>Gnanify Store - Shop Now</title>
        <meta name="description" content="Discover amazing products at Gnanify Store" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome to Gnanify Store</h1>
              <p className="text-xl text-blue-100">Discover amazing products at the best prices</p>
            </div>
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`${inputStyles} pl-10`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className={sectionTitleStyles}>Shop by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters Button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              <FiFilter className="h-4 w-4" />
              Filters
              {showMobileFilters ? (
                <FiChevronUp className="h-4 w-4" />
              ) : (
                <FiChevronDown className="h-4 w-4" />
              )}
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border border-neutral-300 text-neutral-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FiChevronDown className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <FilterPanel />
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="md:hidden mb-6">
              <FilterPanel />
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                <span className="text-sm text-neutral-400 ml-2">
                  ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'})
                </span>
              </h2>
              <div className="hidden md:block">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border border-neutral-300 text-neutral-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FiChevronDown className="h-4 w-4 text-neutral-400" />
                  </div>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <FiSearch className="mx-auto h-12 w-12 text-neutral-600" />
                <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">No products found</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={clearFilters}
                    className={buttonStyles}
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className={cardStyles}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="relative pb-[100%] rounded-t-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute h-full w-full object-cover"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                      {product.isOnSale && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-black text-xs font-medium px-2 py-1 rounded-full">
                          {getDiscount(product.price, product.originalPrice)}% OFF
                        </span>
                      )}
                      <button
                        className="absolute bottom-2 right-2 bg-neutral-900/80 p-2 rounded-full shadow-md hover:bg-neutral-800 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart logic here
                        }}
                      >
                        <FiShoppingCart className="h-5 w-5 text-white" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-2 h-10 mb-2">
                        {product.name}
                      </h3>
                      <div className="mb-2">
                        {renderStars(product.rating)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={priceStyles}>
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className={`${originalPriceStyles} ml-2`}>
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.inStock ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <button
                        className={`w-full mt-3 ${buttonStyles} ${
                          !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          <div className="bg-white border border-neutral-200 p-6 rounded-lg text-center dark:bg-neutral-900 dark:border-neutral-800">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
              <FiTruck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">Free Shipping</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Free delivery for orders over $50</p>
          </div>
          <div className="bg-white border border-neutral-200 p-6 rounded-lg text-center dark:bg-neutral-900 dark:border-neutral-800">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4 dark:bg-green-900/30 dark:text-green-400">
              <FiClock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">24/7 Support</h3>
            <p className="text-neutral-600 dark:text-neutral-400">We're always here to help</p>
          </div>
          <div className="bg-white border border-neutral-200 p-6 rounded-lg text-center dark:bg-neutral-900 dark:border-neutral-800">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 mb-4 dark:bg-purple-900/30 dark:text-purple-400">
              <FiShield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">Secure Payment</h3>
            <p className="text-neutral-600 dark:text-neutral-400">100% secure payment</p>
          </div>
          <div className="bg-white border border-neutral-200 p-6 rounded-lg text-center dark:bg-neutral-900 dark:border-neutral-800">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4 dark:bg-yellow-900/30 dark:text-yellow-400">
              <FiTag className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">Hot Deals</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Discounts up to 50%</p>
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 mb-4">
              <FiMessageSquare className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with other shoppers, ask questions, and share your experiences in our community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition"
              >
                Visit Community
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition"
              >
                Ask a Question
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="rounded-2xl p-8 mb-12 bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-neutral-900 border-neutral-300 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-12 pb-6 bg-white border-t border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Gnanify Store</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Your one-stop shop for all your needs. Quality products at affordable prices.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white">All Products</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white">New Arrivals</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white">Featured</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white">Deals & Offers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white">Shipping & Returns</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white" aria-label="Facebook">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84z" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:text-white" aria-label="Instagram">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.415-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.45
.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <div className="mt-4">
                <p className="text-sm text-neutral-400">support@gnanifystore.com</p>
                <p className="text-sm text-neutral-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-6">
            <p className="text-sm text-neutral-500 text-center">
              &copy; {new Date().getFullYear()} Gnanify Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreHomepage;