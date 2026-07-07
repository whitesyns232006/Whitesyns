// src/Pages/TermsOfService.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {/* Terms Header */}
      <div className="text-center mb-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 bg-[#C0A020]/5 rounded-full blur-2xl -z-10"></div>
        <h1 className="font-['Tenor_Sans'] text-4xl md:text-5xl lg:text-[3.2rem] text-[#C0A020] inline-block relative mb-4">
          Terms Of Service
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#C0A020] to-transparent"></span>
        </h1>
        <p className="text-[#666] font-['Josefin_Sans'] text-sm tracking-[0.3em] uppercase mt-4">
          Please Read Carefully
        </p>
      </div>

      {/* Terms Container */}
      <div className="max-w-225 mx-auto bg-white/85 backdrop-blur-sm p-6 md:p-10 lg:p-12 rounded-2xl shadow-xl border border-[#C0A020]/20 relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C0A020]/20 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C0A020]/20 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C0A020]/20 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C0A020]/20 rounded-br-2xl"></div>

        {/* Terms Content */}
        <div className="space-y-6 relative z-10">
          {/* ============================================
              EXISTING TERMS (1-9)
          ============================================ */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">1.</span>
            <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
              By placing an order on our website, you agree to the terms and conditions listed on this page.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">2.</span>
            <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
              Our product is Safe and Edible <span className="font-bold text-[#C0A020]">BUT</span> for Limited use only. Follow all instructions provided on the packaging and Website. We are not responsible for misuse.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">3.</span>
            <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
              Once an order is placed, you will receive a confirmation email. Please make sure all information (name, address, phone number) is accurate at the time of checkout.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">4.</span>
            <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
              We currently offer Cash on Delivery (COD) only. Please ensure payment is ready at the time of delivery.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">5.</span>
            <div className="flex-1">
              <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] mb-3">
                Delivery time varies by location:
              </p>
              <ul className="space-y-2 pl-4 md:pl-6">
                <li className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] flex items-center gap-2">
                  <span className="text-[#C0A020]">—</span>
                  Punjab & KPK: 4–6 business days
                </li>
                <li className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] flex items-center gap-2">
                  <span className="text-[#C0A020]">—</span>
                  Sindh & Balochistan: 6–8 business days
                </li>
                <li className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8] flex items-center gap-2">
                  <span className="text-[#C0A020]">—</span>
                  Northern Areas: 7 business days
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">6.</span>
            <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
              Due to the nature of our product (personal care/consumable), we do not offer refunds or returns unless the product is damaged or incorrect. In such cases, contact us within 48 hours of delivery with photos of the issue.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">7.</span>
            <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
              Your personal data (name, email, address) is collected only for order processing and will not be shared with third parties.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">8.</span>
            <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
              We reserve the right to update or modify these Terms of Service at any time without prior notice. Changes will be reflected on this page.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">9.</span>
            <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
              For any other queries, reach us through our email: <a href="mailto:whitesyns232006@gmail.com" className="text-[#C0A020] font-bold hover:underline transition-colors duration-300">whitesyns232006@gmail.com</a>.
            </p>
          </motion.div>

          {/* ============================================
              🆕 COPYRIGHT & TRADEMARK SECTION
          ============================================ */}
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#C0A020]/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white/85 px-6 text-[#C0A020] font-['Tenor_Sans'] text-lg tracking-wider">
                © Intellectual Property & Trademark
              </span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">©</span>
            <div>
              <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                <span className="font-bold text-[#C0A020]">Trademark Protection:</span> The name "Whitesyns", our logo, product packaging, website design, and all associated branding elements are the exclusive intellectual property of Whitesyns Pakistan. These are protected under applicable trademark and copyright laws.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.55 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">™</span>
            <div>
              <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                <span className="font-bold text-[#C0A020]">Unauthorized Use Prohibited:</span> No individual, business, or entity may copy, reproduce, distribute, or use the "Whitesyns" name, logo, product formulations, packaging design, or any proprietary content without explicit written permission from Whitesyns Pakistan.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">⚖️</span>
            <div>
              <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                <span className="font-bold text-[#C0A020]">Legal Action:</span> Any unauthorized use, imitation, or counterfeit sale of products under the "Whitesyns" brand name will result in immediate legal action, including but not limited to cease and desist orders, financial penalties, and prosecution under Pakistani and international intellectual property laws.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.65 }}
            className="flex items-start gap-3"
          >
            <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">🛡️</span>
            <div>
              <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                <span className="font-bold text-[#C0A020]">Quality Assurance:</span> Only products purchased directly from Whitesyns Pakistan or our authorized distributors are genuine. We are not responsible for the quality, safety, or effectiveness of counterfeit or unauthorized products sold under our name.
              </p>
            </div>
          </motion.div>

          {/* ============================================
              🆕 REVIEWS POLICY SECTION
          ============================================ */}
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#C0A020]/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white/85 px-6 text-[#C0A020] font-['Tenor_Sans'] text-lg tracking-wider">
                ⭐ Customer Reviews Policy
              </span>
            </div>
          </div>

          {/* Review Policy Points */}
          <div className="space-y-5 bg-[#FDFBF7] p-6 md:p-8 rounded-xl border border-[#C0A020]/10">
            <h3 className="font-['Tenor_Sans'] text-xl md:text-2xl text-[#333] text-center mb-4">
              How Our Review System Works
            </h3>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="flex items-start gap-3"
            >
              <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">📝</span>
              <div>
                <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                  <span className="font-bold text-[#C0A020]">Submit a Review:</span> Only customers who have placed a valid order can submit a review. You must use the same email address that was used for your order to verify your purchase.
                </p>
                <p className="font-['Tenor_Sans'] text-sm text-[#666] mt-1">
                  ✅ Each customer is allowed to submit only one review per product.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.75 }}
              className="flex items-start gap-3"
            >
              <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">✏️</span>
              <div>
                <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                  <span className="font-bold text-[#C0A020]">Edit Your Review:</span> If you need to update your review, click the "Help" button and select "Edit Your Review". Enter the email address you used for your original review, make your changes, and submit.
                </p>
                <p className="font-['Tenor_Sans'] text-sm text-[#666] mt-1">
                  ⚠️ Your review will only be updated if the email matches our records.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="flex items-start gap-3"
            >
              <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">🗑️</span>
              <div>
                <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                  <span className="font-bold text-[#C0A020]">Delete Your Review:</span> To permanently remove your review, click the "Help" button and select "Delete Your Review". Enter the email address used for your original review.
                </p>
                <p className="font-['Tenor_Sans'] text-sm text-red-600 mt-1">
                  ⚠️ This action cannot be undone. Your review will be permanently removed from our website.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.85 }}
              className="flex items-start gap-3"
            >
              <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">🚫</span>
              <div>
                <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                  <span className="font-bold text-[#C0A020]">Duplicate Reviews:</span> Each customer is allowed to submit only one review. If you have already submitted a review, the system will not allow you to submit another one. You can edit or delete your existing review instead.
                </p>
                <p className="font-['Tenor_Sans'] text-sm text-[#666] mt-1">
                  💡 If you need to make changes, use the "Help" button to edit your existing review.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              className="flex items-start gap-3"
            >
              <span className="text-[#C0A020] text-xl font-bold min-w-[24px]">✅</span>
              <div>
                <p className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] leading-[1.8]">
                  <span className="font-bold text-[#C0A020]">Verification & Approval:</span> All reviews are verified against our orders database. Verified reviews are automatically approved and displayed with a "Verified Purchase" badge.
                </p>
                <p className="font-['Tenor_Sans'] text-sm text-[#666] mt-1">
                  ⏳ Non-verified reviews may be held for moderation. Only genuine customer experiences are published.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Quick Summary Box */}
          <div className="bg-gradient-to-r from-[#C0A020]/5 to-[#D4AF37]/5 p-4 md:p-6 rounded-xl border border-[#C0A020]/20 mt-4">
            <h4 className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] text-center mb-3">
              📌 Quick Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-[#555]">One review per customer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">✏️</span>
                <span className="text-[#555]">Edit anytime with email</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-600">🗑️</span>
                <span className="text-[#555]">Delete permanently with email</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37]">⭐</span>
                <span className="text-[#555]">Verified badge for real customers</span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2 justify-center">
                <span className="text-[#C0A020]">©</span>
                <span className="text-[#555]">All content is protected by trademark & copyright law</span>
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
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#C0A020] to-[#D4AF37] text-white rounded-full font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C0A020]/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="max-w-225 mx-auto mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-[#C0A020] to-[#D4AF37] mx-auto rounded-full"></div>
      </div>
    </motion.main>
  );
};

export default TermsOfService;