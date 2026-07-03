import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get order data from location state
    if (location.state && location.state.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // If no data, redirect to home
      navigate('/');
    }
  }, [location, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xl text-[#333]">Loading...</p>
      </div>
    );
  }

  // Calculate total and delivery time
  const quantity = parseInt(orderData.quantity);
  let total;
  let displayText;
  let isSpecialOffer = false;

  if (quantity === 2) {
    total = 1299;
    displayText = `699 × 2 = 1398 − 99 = Rs. ${total} (Offer on 2 containers)`;
    isSpecialOffer = true;
  } else {
    total = 699 * quantity;
    displayText = `699 × ${quantity} = Rs. ${total}`;
  }

  // Determine delivery time
  let deliveryTime = "6 days";
  if (orderData.city === "punjab" || orderData.city === "kpk") {
    deliveryTime = "5 days";
  }

  // Province display name
  let provinceDisplay = "";
  switch(orderData.city) {
    case "punjab": provinceDisplay = "Punjab"; break;
    case "sindh": provinceDisplay = "Sindh"; break;
    case "balochistan": provinceDisplay = "Balochistan"; break;
    case "kpk": provinceDisplay = "Khyber Pakthoonkhwa"; break;
    case "gb": provinceDisplay = "Gilgit Baltistan"; break;
    default: provinceDisplay = orderData.city;
  }

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[70vh] bg-gradient-to-b from-[#FDFBF7] to-[#F5F0E8] py-12 md:py-16 px-[5%] md:px-[10%]"
    >
      {/* Decorative top bar */}
      <div className="max-w-225 mx-auto mb-8">
        <div className="w-20 h-1 bg-gradient-to-r from-[#C0A020] to-[#D4AF37] mx-auto rounded-full"></div>
      </div>

      {/* Order Confirmation Header */}
      <div className="text-center mb-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 bg-[#C0A020]/5 rounded-full blur-2xl -z-10"></div>
        <h1 className="font-['Tenor_Sans'] text-4xl md:text-5xl lg:text-[3.2rem] text-[#C0A020] inline-block relative mb-4">
          Order Details
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#C0A020] to-transparent"></span>
        </h1>
        <p className="text-[#666] font-['Josefin_Sans'] text-sm tracking-[0.3em] uppercase mt-4">
          Your Order Has Been Confirmed
        </p>
      </div>

      {/* Order Confirmation Container */}
      <div className="max-w-225 mx-auto bg-white/85 backdrop-blur-sm p-6 md:p-10 lg:p-12 rounded-2xl shadow-xl border border-[#C0A020]/20 relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C0A020]/20 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C0A020]/20 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C0A020]/20 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C0A020]/20 rounded-br-2xl"></div>

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          {/* Left Side - Order Details */}
          <div className="flex-1">
            {/* Thanks Message */}
            <div className="text-center mb-6">
              <h2 className="font-['Lobster'] text-3xl md:text-4xl bg-gradient-to-r from-[#D4AF37] to-[#2dd4bf] bg-clip-text text-transparent">
                Thanks For Purchase
              </h2>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <div className="border-b border-[#C2E5D8] pb-3">
                <span className="font-bold text-[#C0A020]">Full Name:</span>
                <span className="ml-2 text-[#333]">{orderData.fullName}</span>
              </div>

              <div className="border-b border-[#C2E5D8] pb-3">
                <span className="font-bold text-[#C0A020]">Email:</span>
                <span className="ml-2 text-[#333]">{orderData.email}</span>
              </div>

              <div className="border-b border-[#C2E5D8] pb-3">
                <span className="font-bold text-[#C0A020]">Quantity:</span>
                <span className="ml-2 text-[#333]">{orderData.quantity}</span>
              </div>

              <div className="border-b border-[#C2E5D8] pb-3">
                <span className="font-bold text-[#C0A020]">Delivery Address:</span>
                <span className="ml-2 text-[#333]">{orderData.address}</span>
              </div>

              <div className="border-b border-[#C2E5D8] pb-3">
                <span className="font-bold text-[#C0A020]">Province:</span>
                <span className="ml-2 text-[#333]">{provinceDisplay}</span>
              </div>

              <div className="border-b border-[#C2E5D8] pb-3">
                <span className="font-bold text-[#C0A020]">Phone:</span>
                <span className="ml-2 text-[#333]">{orderData.phone}</span>
              </div>
            </div>

            {/* Amount Calculation */}
            <div className="mt-6 p-4 bg-[#E0F5EE] rounded-lg text-center">
              <p className="text-lg font-['Tenor_Sans'] text-[#333]">
                Be Ready With This Amount On The Receiving Day:
              </p>
              <p className="text-xl font-bold text-[#C0A020] mt-2">
                {displayText}
              </p>
            </div>

            {/* Delivery Time */}
            <div className="mt-4 p-4 bg-[#F5E6C8] rounded-lg text-center">
              <p className="text-lg font-['Tenor_Sans'] text-[#333]">
                Estimated delivery time: <span className="font-bold text-[#C0A020]">{deliveryTime}</span>
              </p>
            </div>
          </div>

          {/* Right Side - Product Image */}
          <div className="flex-1 flex flex-col items-center">
            <img 
              src="b.webp" 
              alt="Whitesyns Product" 
              className="w-full max-w-sm h-auto rounded-xl shadow-lg"
            />
            <div className="mt-4 text-center">
              <p className="font-['Tenor_Sans'] text-lg text-[#333]">
                <span className="font-bold text-[#C0A020]">{orderData.quantity}</span> × Edible Teeth Whitening Solution By Whitesyns
              </p>
            </div>

            {/* Share Section */}
            <div className="mt-6 w-full p-4 bg-[#F5FFFA] rounded-lg border border-[#C2E5D8]">
              <p className="text-center font-['Tenor_Sans'] text-base text-[#333] mb-3">
                Share Your Experience
              </p>
              <div className="flex justify-center gap-4">
                {/* Facebook */}
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-[#3b5998] flex items-center justify-center hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/whitesynsPakistan/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Share on Instagram"
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/923427750673?text=Assalam%20o%20alaikum%2C%20I%20have%20a%20query%20about%20Whitesyns%20product"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.148 0 11.5c0 2.03.554 4.013 1.604 5.74L0 24l7.016-1.844c1.66.563 3.083.844 4.984.844 6.627 0 12-5.148 12-11.5S18.627 0 12 0zm0 21.5c-1.653 0-2.92-.326-4.348-.854l-.311-.114-4.02 1.057 1.072-3.932-.203-.321C3.44 15.977 3 14.15 3 11.5 3 6.253 7.486 2 12 2c4.514 0 9 4.253 9 9.5s-4.486 10-9 10zm5.021-6.191c-.273-.137-1.611-.795-1.861-.885-.25-.092-.432-.137-.613.137s-.705.885-.865 1.066c-.159.184-.318.206-.591.069-.273-.137-1.154-.424-2.197-1.352-.812-.72-1.36-1.61-1.52-1.884-.159-.273-.017-.421.12-.558.124-.123.273-.318.409-.478.137-.159.182-.273.273-.455.091-.182.046-.342-.023-.479-.068-.137-.613-1.478-.84-2.021-.221-.531-.445-.460-.613-.469l-.523-.009c-.182 0-.478.069-.727.342-.25.273-.955.933-.955 2.274s.977 2.637 1.113 2.818c.137.182 1.921 2.934 4.652 4.112.65.281 1.157.449 1.552.574.652.207 1.246.178 1.715.108.523-.078 1.611-.658 1.838-1.293.227-.637.227-1.183.159-1.293-.068-.11-.25-.182-.523-.318z"/>
                  </svg>
                </a>

                {/* Twitter */}
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C0A020]/30"></div>
          <span className="text-[#C0A020] text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C0A020]/30"></div>
        </div>

        {/* Back button */}
        <div className="text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#C0A020] to-[#D4AF37] text-white rounded-full font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C0A020]/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </a>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="max-w-225 mx-auto mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-[#C0A020] to-[#D4AF37] mx-auto rounded-full"></div>
      </div>
    </motion.main>
  );
};

export default OrderConfirmation;