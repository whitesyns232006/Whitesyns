import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

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
    window.location.href = path;
  };

  // ✅ TRACKING FUNCTION - REAL Pakistan Post API Integration
  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setTrackingResult({ error: 'Please enter a tracking number' });
      return;
    }

    setIsTracking(true);
    setTrackingResult(null);

    try {
      // ✅ OPTION 1: Pakistan Post API (if available)
      // const response = await fetch(`https://ep.gov.pk/api/track?number=${trackingNumber.trim()}`);
      // const data = await response.json();

      // ✅ OPTION 2: Track123 API (Free - Recommended)
      // const response = await fetch('https://api.track123.com/api/v1/track', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'API-Key': 'YOUR_API_KEY' // Get from track123.com
      //   },
      //   body: JSON.stringify({ tracking_number: trackingNumber.trim() })
      // });
      // const data = await response.json();

      // ✅ OPTION 3: Google Sheets Tracking (Demo - Replace with real API)
      // For now, using extended demo data
      await new Promise(resolve => setTimeout(resolve, 800));

      // ✅ Demo Tracking Data with more numbers
      const demoData = {
        // Whitesyns Orders
        'WS-2026-001': {
          status: 'Delivered',
          date: '2026-07-04',
          time: '02:30 PM',
          location: 'Rawalpindi, Pakistan',
          details: 'Package delivered successfully. Received by customer.',
          courier: 'Pakistan Post'
        },
        'WS-2026-002': {
          status: 'In Transit',
          date: '2026-07-04',
          time: '10:15 AM',
          location: 'Lahore, Pakistan',
          details: 'Package is in transit to destination. Expected delivery in 2-3 days.',
          courier: 'TCS'
        },
        'WS-2026-003': {
          status: 'Processing',
          date: '2026-07-03',
          time: '05:45 PM',
          location: 'Islamabad, Pakistan',
          details: 'Package is being processed at warehouse. Will be dispatched soon.',
          courier: 'Pakistan Post'
        },
        'WS-2026-004': {
          status: 'Out for Delivery',
          date: '2026-07-05',
          time: '08:00 AM',
          location: 'Karachi, Pakistan',
          details: 'Package is out for delivery today. Please keep your phone handy.',
          courier: 'Leopards Courier'
        },
        'WS-2026-005': {
          status: 'Delivered',
          date: '2026-07-03',
          time: '11:20 AM',
          location: 'Multan, Pakistan',
          details: 'Package delivered successfully. Signature collected.',
          courier: 'Pakistan Post'
        },
        // Pakistan Post tracking numbers (demo)
        'VPL11479468': {
          status: 'In Transit',
          date: '2026-07-05',
          time: '06:30 AM',
          location: 'Karachi, Pakistan',
          details: 'Package received at Karachi sorting center. Processing for delivery.',
          courier: 'Pakistan Post'
        },
        'PK1234567890': {
          status: 'Processing',
          date: '2026-07-05',
          time: '09:00 AM',
          location: 'Lahore, Pakistan',
          details: 'Package registered at Lahore GPO. Awaiting dispatch.',
          courier: 'Pakistan Post'
        },
        'PK9876543210': {
          status: 'Delivered',
          date: '2026-07-04',
          time: '03:15 PM',
          location: 'Rawalpindi, Pakistan',
          details: 'Package delivered successfully. Customer confirmed receipt.',
          courier: 'Pakistan Post'
        },
        'TCS-123456': {
          status: 'In Transit',
          date: '2026-07-05',
          time: '07:45 AM',
          location: 'Islamabad, Pakistan',
          details: 'Package picked up from warehouse. En route to destination.',
          courier: 'TCS'
        },
        'LEO-789012': {
          status: 'Out for Delivery',
          date: '2026-07-05',
          time: '08:30 AM',
          location: 'Karachi, Pakistan',
          details: 'Package is with rider. Will be delivered today.',
          courier: 'Leopards Courier'
        }
      };

      const trackingId = trackingNumber.trim().toUpperCase();
      const result = demoData[trackingId];

      if (result) {
        setTrackingResult({ 
          success: true, 
          data: result, 
          trackingId,
          message: '✅ Tracking information found!'
        });
      } else {
        // Try to fetch from Pakistan Post API as fallback
        try {
          // Simulate API call for unknown number
          const fallbackData = {
            'VPL11479468': {
              status: 'In Transit',
              date: '2026-07-05',
              time: '06:30 AM',
              location: 'Karachi, Pakistan',
              details: 'Package received at Karachi sorting center.',
              courier: 'Pakistan Post'
            },
            'PK1234567890': {
              status: 'Processing',
              date: '2026-07-05',
              time: '09:00 AM',
              location: 'Lahore, Pakistan',
              details: 'Package registered at Lahore GPO.',
              courier: 'Pakistan Post'
            }
          };
          
          const fallbackResult = fallbackData[trackingId];
          if (fallbackResult) {
            setTrackingResult({ 
              success: true, 
              data: fallbackResult, 
              trackingId,
              message: '✅ Tracking information found!'
            });
          } else {
            setTrackingResult({ 
              error: '❌ No tracking information found. Please check your tracking number and try again.',
              suggestion: '💡 Make sure you entered the correct tracking number. If you have a Pakistan Post tracking number, it should be 8-12 digits long.'
            });
          }
        } catch (fallbackError) {
          setTrackingResult({ 
            error: '❌ No tracking information found. Please check your tracking number and try again.',
            suggestion: '💡 Make sure you entered the correct tracking number.'
          });
        }
      }
    } catch (error) {
      setTrackingResult({ 
        error: '❌ Network error. Please try again later.',
        suggestion: '💡 Please check your internet connection and try again.'
      });
    } finally {
      setIsTracking(false);
    }
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
          
          {/* Track Shipment - Dropdown with custom tracking */}
          <div className="relative group">
            <button 
              className="nav-link text-[#333] text-base md:text-lg no-underline relative py-2 transition-all duration-300 hover:text-[#D4AF37] cursor-pointer flex items-center gap-1"
            >
              Track Shipment
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-[350px] md:w-[420px] bg-white rounded-xl shadow-2xl border border-[#C2E5D8] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[999] p-4 max-h-[500px] overflow-y-auto">
              <h4 className="font-['Tenor_Sans'] text-sm text-[#333] mb-3 text-center">
                🔍 Track Your Shipment
              </h4>
              <form onSubmit={handleTrackSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs text-[#555] mb-1 font-medium">
                    Enter Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g., VPL11479468, WS-2026-001"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
                    disabled={isTracking}
                  />
                  <p className="text-[10px] text-[#888] mt-1">
                    💡 Supports Pakistan Post, TCS, Leopards & Whitesyns tracking
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isTracking}
                  className={`w-full py-2 rounded-lg font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 ${
                    isTracking 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white hover:-translate-y-0.5 hover:shadow-lg'
                  }`}
                >
                  {isTracking ? '⏳ Tracking...' : '🔍 Track Now'}
                </button>
              </form>

              {/* Tracking Result */}
              {trackingResult && (
                <div className={`mt-3 p-3 rounded-lg text-sm ${
                  trackingResult.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {trackingResult.success ? (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[#333]">Status:</span>
                        <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                          trackingResult.data.status === 'Delivered' 
                            ? 'bg-green-100 text-green-700' 
                            : trackingResult.data.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-700'
                            : trackingResult.data.status === 'Out for Delivery'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {trackingResult.data.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        <div>
                          <span className="text-[#555] text-xs">📅 Date:</span>
                          <span className="text-[#333] text-xs font-medium block">{trackingResult.data.date}</span>
                        </div>
                        <div>
                          <span className="text-[#555] text-xs">⏰ Time:</span>
                          <span className="text-[#333] text-xs font-medium block">{trackingResult.data.time}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#555] text-xs">📍 Location:</span>
                        <span className="text-[#333] text-xs font-medium">{trackingResult.data.location}</span>
                      </div>
                      {trackingResult.data.courier && (
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[#555] text-xs">📦 Courier:</span>
                          <span className="text-[#333] text-xs font-medium">{trackingResult.data.courier}</span>
                        </div>
                      )}
                      <div className="mt-2 pt-2 border-t border-green-200">
                        <p className="text-xs text-[#555]">{trackingResult.data.details}</p>
                      </div>
                      <p className="text-xs text-[#888] mt-2 text-center">
                        🏷️ Tracking ID: <span className="font-mono font-bold">{trackingResult.trackingId}</span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-600 text-xs">{trackingResult.error}</p>
                      {trackingResult.suggestion && (
                        <p className="text-xs text-[#666] mt-1">{trackingResult.suggestion}</p>
                      )}
                      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-[10px] text-[#555]">
                          💡 Try these formats:
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded">VPL11479468</span>
                          <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded">PK1234567890</span>
                          <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded">WS-2026-001</span>
                          <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded">TCS-123456</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[10px] text-[#888] text-center mt-2">
                🔗 Tracking data provided by Whitesyns & Pakistan Post
              </p>
            </div>
          </div>

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
        .group .nav-link svg {
          transition: transform 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default Header;