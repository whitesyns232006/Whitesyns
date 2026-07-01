import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <main className="w-full bg-[#F5FFFA] overflow-x-hidden">
      
      {/* Hero Image - Full width with equal top and bottom cropping */}
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <img 
          src="header.webp" 
          alt="Whitesyns Product" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Welcome Section */}
      <section className="py-6 text-center bg-[#F5FFFA] border-y border-[#C2E5D8] max-w-300 mx-auto w-[90%]">
        <h1 className="font-['Tenor_Sans'] text-4xl md:text-5xl text-black tracking-wide font-medium relative inline-block">
          Welcome
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-25 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent"></span>
        </h1>
      </section>

      {/* Product Info - Text left, Image right */}
      <section className="py-24 px-[10%] flex flex-col md:flex-row items-center gap-20 bg-[#F5FFFA]">
        <motion.div 
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <h2 className="font-['Tenor_Sans'] text-3xl md:text-4xl text-[#333] mb-6 tracking-wide relative inline-block">
            Discover A Fresh Way To Whiten!
            <span className="absolute -bottom-2 left-0 w-15 h-0.5 bg-[#D4AF37]"></span>
          </h2>
          <p className="text-[#555] text-lg leading-[1.8] mb-4">
            WHITESYNS is Pakistan's first edible teeth-whitener made from 100% safe, natural ingredients. Enriched with Alum, Mint, Pellitory, Calamine, and Clove, it whitens teeth, freshens breath, and nourishes gums. Enjoy a confident smile anytime, without harsh chemicals.
          </p>
          <p className="text-[#555] text-lg leading-[1.8]">
            Our unique formula is clinically tested and approved by dental professionals, providing visible results within weeks while being gentle on your enamel.
          </p>
        </motion.div>

        <motion.div 
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <img 
            src="a.webp" 
            alt="Whitesyns Product" 
            className="w-full max-w-125 h-auto rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-500 hover:-translate-y-1"
          />
        </motion.div>
      </section>

      {/* Auto Slider Section */}
      <section className="w-full overflow-hidden py-8 bg-[#F5FFFA] border-y border-[#C2E5D8]">
        <div className="w-full overflow-hidden">
          <div className="flex w-fit animate-[slowScroll_40s_linear_infinite] hover:animation-pause">
            {/* First set */}
            <div className="flex-none w-75 h-50 mx-4 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="c.webp" alt="Whitesyns Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-75 h-50 mx-4 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="d.webp" alt="Whitesyns Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-75 h-50 mx-4 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="e.webp" alt="Whitesyns Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-75 h-50 mx-4 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="f.webp" alt="Whitesyns Product" className="w-full h-full object-cover" />
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex-none w-75 h-50 mx-4 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="c.webp" alt="Whitesyns Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-75 h-50 mx-4 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="d.webp" alt="Whitesyns Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-75 h-50 mx-4 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="e.webp" alt="Whitesyns Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-75 h-50 mx-4 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="f.webp" alt="Whitesyns Product" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <style>{`
          @keyframes slowScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .hover\\:animation-pause:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Offer Section - with tilted discount badge */}
      <section className="py-24 px-[10%] bg-[#E0F5EE] flex flex-col md:flex-row items-center gap-20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-[40%] h-full opacity-30 pointer-events-none bg-[radial-gradient(circle_at_10%_20%,rgba(212,175,55,0.03)_0%,transparent_20%),radial-gradient(circle_at_80%_70%,rgba(212,175,55,0.03)_0%,transparent_20%)]"></div>

        <div className="flex-1 flex justify-center relative z-10">
          <img 
            src="b.webp" 
            alt="Whitesyns Special Offer" 
            className="w-full max-w-112.5 h-auto rounded-xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        <div className="flex-1 relative z-10">
          <h2 className="font-['Josefin_Sans'] text-2xl md:text-[2.2rem] text-[#333] font-medium mb-6 tracking-wide">
            Natural Herbal Teeth Whitening Care
          </h2>

          <div className="flex items-center gap-6 flex-wrap mb-8 relative bg-[#e6f7e6] p-4 rounded-lg">
            <span className="text-[#555] text-2xl line-through opacity-70">Rs. 930.00</span>
            <span className="text-[#D4AF37] text-3xl md:text-4xl font-bold tracking-wide">Rs. 699.00</span>
            <span className="absolute -top-4 -right-4 bg-linear-to-br from-[#0A5C36] via-[#1E8449] to-[#145A32] text-white px-5 py-1.5 rounded-md text-lg font-bold shadow-md transform rotate-10 animate-[luxuryPulse_0.9s_infinite_ease-in-out]">
              25% OFF
            </span>
          </div>

          <button className="bg-linear-to-r from-[#A6ACAF] to-[#566573] text-[#111] border border-white/25 px-10 py-4 rounded-[30px] text-lg font-['Josefin_Sans'] font-medium cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group mb-8">
            <span className="absolute inset-0 -translate-x-full w-full h-full bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-500 group-hover:translate-x-full"></span>
            Shop Now
          </button>

          <p className="font-['Josefin_Sans'] text-[#555] text-xl tracking-wide italic relative pl-8">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl">🎁</span>
            Get 2 Containers In Just Rs. 1299. Limited Offer.
          </p>
        </div>
      </section>

      <style>{`
        @keyframes luxuryPulse {
          0% { transform: rotate(10deg) scale(1); box-shadow: 0 3px 8px rgba(20,90,50,0.4); }
          50% { transform: rotate(10deg) scale(1.12); box-shadow: 0 10px 25px rgba(30,132,73,0.7); }
          100% { transform: rotate(10deg) scale(1); box-shadow: 0 3px 8px rgba(20,90,50,0.4); }
        }
      `}</style>
    </main>
  );
};

export default HomePage;