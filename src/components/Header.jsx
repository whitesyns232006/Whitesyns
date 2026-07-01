import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Search data
  const searchData = [
    {
      keywords: ['home', 'welcome', 'main'],
      title: 'Home Page',
      description: 'Return to the main landing page',
      path: '/',
      section: 'home'
    },
    {
      keywords: ['about', 'company', 'mission', 'whitesyns', 'story'],
      title: 'About Us',
      description: 'Learn about our company and mission',
      path: '/about',
      section: 'about'
    },
    {
      keywords: ['faq', 'questions', 'help', 'support', 'answers'],
      title: 'FAQs',
      description: 'Frequently asked questions about our product',
      path: '/faq',
      section: 'faqs'
    },
    {
      keywords: ['terms', 'service', 'tos', 'agreement', 'policy', 'conditions'],
      title: 'Terms of Service',
      description: 'Legal terms and conditions for using our service',
      path: '/terms',
      section: 'tos'
    },
    {
      keywords: ['product', 'teeth', 'whitening', 'whiten', 'solution', 'whitesyns'],
      title: 'Teeth Whitening Solution',
      description: 'Our premium edible teeth whitening product',
      path: '/',
      section: 'home'
    },
    {
      keywords: ['offer', 'discount', 'sale', 'deal', 'price', 'promotion'],
      title: 'Special Offer',
      description: 'Current discounts and special promotions',
      path: '/',
      section: 'home'
    },
    {
      keywords: ['order', 'place order', 'buy', 'purchase'],
      title: 'Place Order',
      description: 'Order your Whitesyns product now',
      path: '/orders',
      section: 'orders'
    },
    {
      keywords: ['track', 'shipment', 'delivery', 'track order'],
      title: 'Track Shipment',
      description: 'Track your order delivery status',
      path: '/track',
      section: 'track'
    }
  ];

  // Handle search
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchData.filter(item => {
        return item.keywords.some(keyword => keyword.includes(searchQuery.toLowerCase())) ||
               item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.description.toLowerCase().includes(searchQuery.toLowerCase());
      }).slice(0, 4);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close search on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      document.getElementById('search-input')?.focus();
    }, 100);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultClick = (path) => {
    handleSearchClose();
    // Navigate to the result path
    window.location.href = path;
  };

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-white to-[#F5F5F5] shadow-md sticky top-0 z-[1000] px-[5%] py-4 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-[#C2E5D8]">
        {/* Left Navigation */}
        <nav className="flex justify-center md:justify-start gap-6 md:gap-8 order-2 md:order-1">
          <Link to="/" className={`nav-link text-[#333] text-base md:text-lg no-underline relative py-2 transition-all duration-300 hover:text-[#D4AF37] ${location.pathname === '/' ? 'text-[#D4AF37]' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link text-[#333] text-base md:text-lg no-underline relative py-2 transition-all duration-300 hover:text-[#D4AF37] ${location.pathname === '/about' ? 'text-[#D4AF37]' : ''}`}>
            About Us
          </Link>
          <Link to="/faq" className={`nav-link text-[#333] text-base md:text-lg no-underline relative py-2 transition-all duration-300 hover:text-[#D4AF37] ${location.pathname === '/faq' ? 'text-[#D4AF37]' : ''}`}>
            FAQs
          </Link>
          <Link to="/terms" className={`nav-link text-[#333] text-base md:text-lg no-underline relative py-2 transition-all duration-300 hover:text-[#D4AF37] ${location.pathname === '/terms' ? 'text-[#D4AF37]' : ''}`}>
            Terms Of Service
          </Link>
        </nav>

        {/* Logo */}
        <Link to="/" className="font-['Tenor_Sans'] text-2xl md:text-[2.4rem] bg-gradient-to-r from-[#D4AF37] to-[#C9A227] bg-clip-text text-transparent text-center no-underline tracking-wide font-medium relative mx-0 md:mx-8 order-1 md:order-2">
          Whitesyns
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[50%] h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></span>
        </Link>

        {/* Right Navigation */}
        <nav className="flex justify-center md:justify-end items-center gap-4 md:gap-6 order-3">
          <Link to="/orders" className={`nav-link text-[#333] text-base md:text-lg no-underline relative py-2 transition-all duration-300 hover:text-[#D4AF37] ${location.pathname === '/orders' ? 'text-[#D4AF37]' : ''}`}>
            Place Order
          </Link>
          <Link to="/track" className="nav-link text-[#333] text-base md:text-lg no-underline relative py-2 transition-all duration-300 hover:text-[#D4AF37]">
            Track Shipment
          </Link>
          <button 
            onClick={handleSearchClick}
            className="bg-transparent border-none cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300 p-1"
            aria-label="Search"
          >
            <svg className="w-5 h-5 md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </nav>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleSearchClose();
            }
          }}
        >
          <div className="w-[90%] max-w-[700px] bg-[#F5F5F5] rounded-xl p-6 md:p-8 shadow-2xl transform translate-y-0 transition-transform duration-300">
            <div className="relative mb-4">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, information, etc..."
                className="w-full px-4 py-3 md:px-6 md:py-4 pr-12 text-base md:text-lg border-2 border-[#D4AF37] rounded-full outline-none font-['Josefin_Sans'] shadow-md focus:shadow-lg focus:border-[#C0A020] transition-all duration-300"
              />
              <button
                onClick={handleSearchClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-[#333] opacity-70 hover:opacity-100 hover:text-[#D4AF37] transition-all duration-300"
                aria-label="Close search"
              >
                ×
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto pr-2">
              <h3 className="font-['Tenor_Sans'] text-lg md:text-xl text-[#333] mb-3 pb-2 border-b border-[#C2E5D8]">
                Recommendations
              </h3>
              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(result.path)}
                      className="p-3 md:p-4 bg-white rounded-lg cursor-pointer transition-all duration-300 border-l-4 border-[#D4AF37] shadow-sm hover:shadow-md hover:translate-x-1 hover:border-l-[#C0A020] hover:bg-[#F5E6C8]"
                    >
                      <h4 className="font-['Josefin_Sans'] text-base md:text-lg text-[#333] mb-1">
                        {result.title}
                      </h4>
                      <p className="text-sm md:text-base text-[#555] m-0">
                        {result.description}
                      </p>
                    </div>
                  ))
                ) : searchQuery.length >= 2 ? (
                  <div className="p-4 md:p-6 text-center text-[#555] italic">
                    No results found. Try different keywords.
                  </div>
                ) : (
                  <div className="p-4 md:p-6 text-center text-[#555]">
                    Type at least 2 characters to search...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for nav-link underline */}
      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #D4AF37;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link.text-\\[\\#D4AF37\\]::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Header;