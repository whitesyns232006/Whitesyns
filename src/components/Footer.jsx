import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#F0F0F0] border-t border-[#C2E5D8] py-8 md:py-10 px-[5%] md:px-[10%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6">
        {/* Logo Section */}
        <div className="flex flex-col">
          <Link to="/" className="font-['Tenor_Sans'] text-2xl md:text-[1.8rem] bg-linear-to-r from-[#D4AF37] to-[#C9A227] bg-clip-text text-transparent no-underline tracking-wide font-medium mb-2">
            Whitesyns
          </Link>
          <p className="text-sm md:text-base text-[#555] leading-relaxed max-w-62.5">
            Natural Care Solutions
          </p>
        </div>

        {/* Information Section */}
        <div>
          <h3 className="text-base md:text-lg text-[#333] font-medium mb-3 relative inline-block">
            Information
            <span className="absolute -bottom-2 left-0 w-8 h-px bg-[#D4AF37]"></span>
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-sm md:text-base text-[#555] no-underline transition-all duration-300 hover:text-[#D4AF37] hover:translate-x-1 inline-block relative">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 hover:w-5"></span>
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-sm md:text-base text-[#555] no-underline transition-all duration-300 hover:text-[#D4AF37] hover:translate-x-1 inline-block relative">
                FAQs
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 hover:w-5"></span>
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm md:text-base text-[#555] no-underline transition-all duration-300 hover:text-[#D4AF37] hover:translate-x-1 inline-block relative">
                Terms Of Service
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 hover:w-5"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-base md:text-lg text-[#333] font-medium mb-3 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-8 h-px bg-[#D4AF37]"></span>
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/orders" className="text-sm md:text-base text-[#555] no-underline transition-all duration-300 hover:text-[#D4AF37] hover:translate-x-1 inline-block relative">
                Place Order
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 hover:w-5"></span>
              </Link>
            </li>
            <li>
              <Link to="/track" className="text-sm md:text-base text-[#555] no-underline transition-all duration-300 hover:text-[#D4AF37] hover:translate-x-1 inline-block relative">
                Track Shipment
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 hover:w-5"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Reach Us Section */}
        <div>
          <h3 className="text-base md:text-lg text-[#333] font-medium mb-3 relative inline-block">
            Reach Us
            <span className="absolute -bottom-2 left-0 w-8 h-px bg-[#D4AF37]"></span>
          </h3>
          
          {/* Email */}
          <div className="flex items-center gap-2 mb-3 text-sm md:text-base text-[#555]">
            <svg className="w-4 h-4 md:w-5 md:h-5 min-w-4 opacity-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 8L12 13L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>whitesyns232006@gmail.com</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 mb-4 text-sm md:text-base text-[#555]">
            <svg className="w-4 h-4 md:w-5 md:h-5 min-w-4 opacity-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 7C15.5304 7 16.0391 7.21071 16.4142 7.58579C16.7893 7.96086 17 8.46957 17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 3C16.5913 3 18.1174 3.63214 19.2426 4.75736C20.3679 5.88258 21 7.4087 21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>+92 336 960 1623</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {/* Facebook - Updated Link */}
            <a 
              href="https://www.facebook.com/Whitesynspak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-[#555] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#1877F2] hover:border-[#1877F2] group"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 fill-[#555] group-hover:fill-white transition-all duration-300" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/whitesynsPakistan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-[#555] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-linear-to-r hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent group"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 fill-[#555] group-hover:fill-white transition-all duration-300" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/channel/UCxRK6Oq0Br-IKW1pe26weWw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-[#555] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF0000] hover:border-[#FF0000] group"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 fill-[#555] group-hover:fill-white transition-all duration-300" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/923369601623?text=Assalam%20o%20alaikum%2C%20I%20have%20a%20query%20about%20Whitesyns%20product"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-[#555] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#25D366] hover:border-[#25D366] group"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 fill-[#555] group-hover:fill-white transition-all duration-300" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.148 0 11.5c0 2.03.554 4.013 1.604 5.74L0 24l7.016-1.844c1.66.563 3.083.844 4.984.844 6.627 0 12-5.148 12-11.5S18.627 0 12 0zm0 21.5c-1.653 0-2.92-.326-4.348-.854l-.311-.114-4.02 1.057 1.072-3.932-.203-.321C3.44 15.977 3 14.15 3 11.5 3 6.253 7.486 2 12 2c4.514 0 9 4.253 9 9.5s-4.486 10-9 10zm5.021-6.191c-.273-.137-1.611-.795-1.861-.885-.25-.092-.432-.137-.613.137s-.705.885-.865 1.066c-.159.184-.318.206-.591.069-.273-.137-1.154-.424-2.197-1.352-.812-.72-1.36-1.61-1.52-1.884-.159-.273-.017-.421.12-.558.124-.123.273-.318.409-.478.137-.159.182-.273.273-.455.091-.182.046-.342-.023-.479-.068-.137-.613-1.478-.84-2.021-.221-.531-.445-.460-.613-.469l-.523-.009c-.182 0-.478.069-.727.342-.25.273-.955.933-.955 2.274s.977 2.637 1.113 2.818c.137.182 1.921 2.934 4.652 4.112.65.281 1.157.449 1.552.574.652.207 1.246.178 1.715.108.523-.078 1.611-.658 1.838-1.293.227-.637.227-1.183.159-1.293-.068-.11-.25-.182-.523-.318z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-4 mt-4 border-t border-[#C2E5D8] text-sm md:text-base text-[#555] tracking-wide">
        ©2025 whitesyns
      </div>

      {/* ✅ Extra Space for Sticky Modal - Footer ke neeche extra height */}
      <div className="h-20 md:h-24 lg:h-28"></div>
    </footer>
  );
};

export default Footer;