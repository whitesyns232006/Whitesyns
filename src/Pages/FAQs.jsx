import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const FAQs = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // FAQ data
  const faqData = [
    {
      question: "What is 'Whitesyns'?",
      answer: "'Whitesyns' is an edible teeth-whitening product made with natural ingredients like Alum, Mint, Pellitory, Calamine, and Clove etc,. It helps brighten your smile without any harmful chemicals."
    },
    {
      question: "Is it really edible?",
      answer: "hmm somewhat Yes! Our formula is safe to consume (BUT for very limited usage). It's made from natural herbs ingredients and tested for oral safety."
    },
    {
      question: "How does it whiten teeth?",
      answer: "'Whitesyns' gently removes surface stains caused by tea, coffee, smoking, and food using natural polishing agents like Alum, Mint, Pellitory, Calamine, and Clove etc,."
    },
    {
      question: "How often should I use it?",
      answer: "For best results, use once or twice daily (no need to wash mouth after using it because it is 'Edible or Eatable'). You'll start noticing visible changes within 5–7 days of regular use."
    },
    {
      question: "Is it suitable for sensitive teeth?",
      answer: "Absolutely! Whitesyns is designed to be gentle on enamel and safe for sensitive gums and teeth."
    },
    {
      question: "Can kids or pregnant women use it?",
      answer: "While our formula is made with safe, natural ingredients, we recommend consulting a doctor before use in case of pregnancy or for children, safe for above 6 (One time a day)."
    },
    {
      question: "How much dosage is safe per day?",
      answer: "For adults, 2 times a day is completely safe. For children above 6 years, once a day is the recommended dosage."
    },
    {
      question: "When should I use 'Whitesyns' during the day?",
      answer: "For best results, use once early in the morning and once at night before sleep."
    },
    {
      question: "What is the product's expiry date?",
      answer: "Whitesyns has a shelf life of 1 year from the date of opening of bottle."
    },
    {
      question: "Where can I check my order confirmation details?",
      answer: "All your order details — including name, address, quantity, price, and delivery time — are sent to your email right after you Confirm order placement form."
    },
    {
      question: "What are the delivery charges and time?",
      answer: "Delivery charges are Rs. 100 flat. Orders usually arrive in 5–7 business days, depending on your location."
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes, we offer Cash on Delivery (COD) for all orders across Pakistan. Currently, this is the only payment method available. You simply pay in cash when your order is delivered — no advance payment required."
    },
    {
      question: "Can I return or exchange the product?",
      answer: "Due to hygiene concerns, we do not accept returns or exchanges unless the product is damaged or incorrect. Please report such cases within 48 hours."
    },
    {
      question: "How can I contact 'Whitesyns' manufacturers?",
      answer: "You can email us at whitesyns232006@gmail.com or reach out via our contact pages on the website. We usually respond within 24 hours."
    }
  ];

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[70vh] bg-gradient-to-b from-[#FCF9F4] to-[#F5F0E8] py-12 md:py-16 px-[5%] md:px-[10%]"
    >
      {/* Decorative top bar */}
      <div className="max-w-225 mx-auto mb-8">
        <div className="w-20 h-1 bg-gradient-to-r from-[#C0A020] to-[#D4AF37] mx-auto rounded-full"></div>
      </div>

      {/* FAQs Header */}
      <div className="text-center mb-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 bg-[#C0A020]/5 rounded-full blur-2xl -z-10"></div>
        <h1 className="font-['Tenor_Sans'] text-4xl md:text-5xl lg:text-[3.2rem] text-[#C0A020] inline-block relative mb-4">
          Frequently Asked Questions
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#C0A020] to-transparent"></span>
        </h1>
        <p className="text-[#666] font-['Josefin_Sans'] text-sm tracking-[0.3em] uppercase mt-4">
          Everything You Need To Know
        </p>
      </div>

      {/* FAQ Container */}
      <div className="max-w-225 mx-auto bg-white/85 backdrop-blur-sm p-6 md:p-10 lg:p-12 rounded-2xl shadow-xl border border-[#C0A020]/20 relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C0A020]/20 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C0A020]/20 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C0A020]/20 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C0A020]/20 rounded-br-2xl"></div>

        {/* FAQ Items */}
        <div className="space-y-6 relative z-10">
          {faqData.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-b border-[#C0A020]/15 pb-5 last:border-none last:pb-0"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 min-w-2 bg-[#C0A020] rounded-full mt-3"></div>
                <div>
                  <h3 className="font-['Tenor_Sans'] text-lg md:text-xl text-[#C0A020] mb-2">
                    {faq.question}
                  </h3>
                  <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
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

export default FAQs;