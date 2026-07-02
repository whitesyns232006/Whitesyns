// src/components/ShopNowModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ShopNowModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const modalRef = useRef(null);

  // ✅ Remove all hide/show logic - Always visible

  // Show on page load
  useEffect(() => {
    setIsVisible(true);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={modalRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1 
          }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            duration: 0.4, 
            type: 'spring', 
            stiffness: 300, 
            damping: 30 
          }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9998] w-[92%] max-w-xl"
        >
          <div className="bg-gradient-to-r from-[#F5F5F5] via-white to-[#F5F5F5] backdrop-blur-md rounded-full shadow-2xl border border-[#D4AF37]/30 p-1.5 md:p-2 flex items-center gap-3 md:gap-4">
            {/* Left - Product Image */}
            <div className="flex-shrink-0 ml-1 md:ml-2">
              <img 
                src="/b.webp" 
                alt="Whitesyns Product" 
                className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#D4AF37]/30 shadow-md"
              />
            </div>

            {/* Center - Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-['Tenor_Sans'] text-[#333] truncate">
                 <span className="font-bold text-[#D4AF37]">Whitesyns</span>
              </p>
              <p className="text-[10px] md:text-xs text-[#666] truncate">
                Natural Herbal Teeth Whitening Care
              </p>
            </div>

            {/* Right - Shop Now Button */}
            <Link
              to="/orders"
              className="flex-shrink-0 mr-1 md:mr-2 px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white text-xs md:text-sm font-['Josefin_Sans'] font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/30 active:scale-95 whitespace-nowrap"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShopNowModal;