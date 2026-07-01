import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[70vh] bg-gradient-to-b from-[#F5FFFA] to-[#E8F5EE] py-12 md:py-16 px-[5%] md:px-[10%]"
    >
      {/* Decorative top bar */}
      <div className="max-w-300 mx-auto mb-8">
        <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] mx-auto rounded-full"></div>
      </div>

      {/* About Header with decorative elements */}
      <div className="text-center mb-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 bg-[#D4AF37]/5 rounded-full blur-2xl -z-10"></div>
        <h1 className="font-['Tenor_Sans'] text-4xl md:text-5xl lg:text-[3.2rem] bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#B8960F] bg-clip-text text-transparent inline-block relative mb-4">
          About Us
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent"></span>
        </h1>
        <p className="text-[#666] font-['Josefin_Sans'] text-sm tracking-[0.3em] uppercase mt-4">
          Premium Teeth Whitening Solutions
        </p>
      </div>

      {/* About Content - More Stylish */}
      <div className="max-w-225 mx-auto bg-white/80 backdrop-blur-sm p-6 md:p-10 lg:p-12 rounded-2xl shadow-xl border border-[#C2E5D8] relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/20 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]/20 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37]/20 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]/20 rounded-br-2xl"></div>

        {/* Content with smaller font */}
        <div className="space-y-4 relative z-10">
          <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] text-justify">
            Welcome to <span className="font-bold text-[#D4AF37]">Whitesyns</span>, Pakistan's first edible teeth-whitening brand designed to bring you a confident, healthy smile — naturally and safely. At Whitesyns, we believe that oral care should be simple, safe, and effective.
          </p>

          <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] text-justify">
            That's why we've crafted a product that is gentle, edible, and made from premium natural ingredients like Alum, Mint, Pellitory, Calamine, and Clove — free from harsh chemicals or synthetic whiteners. It provides desired results if used under proper and limited dose.
          </p>

          <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] text-justify">
            Our mission is to revolutionize oral care by providing a solution that not only whitens teeth but also promotes overall oral health. We combine traditional wisdom with modern science to create products that are both effective and safe for daily use.
          </p>

          <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] text-justify">
            We are committed to sustainability and ethical practices. Our packaging is eco-friendly, and we source ingredients responsibly from local farmers whenever possible.
          </p>

          <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] text-justify">
            To check usage criteria, visit <a href="/" className="font-bold text-[#D4AF37] hover:text-[#C9A227] transition-colors duration-300 underline decoration-[#D4AF37]/30 decoration-2 underline-offset-2">Home page</a> of website. Feel free to reach out to us using the contact information provided.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/30"></div>
          <span className="text-[#D4AF37] text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/30"></div>
        </div>

        {/* Back button with icon */}
        <div className="text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white rounded-full font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </a>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="max-w-300 mx-auto mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] mx-auto rounded-full"></div>
      </div>
    </motion.main>
  );
};

export default AboutUs;