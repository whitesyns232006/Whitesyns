import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    quantity: '',
    address: '',
    appartment: '',
    country: 'pakistan',
    city: '',
    postalCode: '',
    phone: '',
    billingOption: 'same',
    billingName: '',
    billingAddress: '',
    billingPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [showBilling, setShowBilling] = useState(false);
  const [phonePopup, setPhonePopup] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, name, checked } = e.target;
    
    if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        billingOption: value
      }));
      setShowBilling(value === 'another');
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }

    // Clear error for this field
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  // Phone number validation
  const validatePhone = (phone) => {
    return /^03\d{9}$/.test(phone);
  };

  // Email validation
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'protonmail.com'];
    const domain = email.split('@')[1] || '';
    return emailPattern.test(email) && allowedDomains.includes(domain.toLowerCase());
  };

  // Name validation
  const validateName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name.trim()) && name.trim().length > 0;
  };

  // Address validation
  const validateAddress = (address) => {
    return address.trim().length >= 15;
  };

  // Quantity validation
  const validateQuantity = (quantity) => {
    const num = parseInt(quantity);
    return num >= 1 && num <= 5 && !isNaN(num);
  };

  // Phone input restriction
  const handlePhoneInput = (e) => {
    const input = e.target;
    input.value = input.value.replace(/[^0-9]/g, '');
    
    if (input.value.length > 11) {
      input.value = input.value.slice(0, 11);
    }
    
    handleChange(e);
  };

  // Handle phone focus
  const handlePhoneFocus = () => {
    setPhonePopup(true);
    setTimeout(() => {
      setPhonePopup(false);
    }, 7000);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate full name
    if (!validateName(formData.fullName)) {
      newErrors.fullName = 'Write Correct Name (no numbers or special characters)';
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address with @ symbol (Gmail, Yahoo, Hotmail, Outlook)';
    }

    // Validate quantity
    if (!validateQuantity(formData.quantity)) {
      newErrors.quantity = 'Max 5 jars for single purchase';
    }

    // Validate address
    if (!validateAddress(formData.address)) {
      newErrors.address = 'Write Address In Proper Format (minimum 15 characters)';
    }

    // Validate city
    if (!formData.city) {
      newErrors.city = 'Please select your province';
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must start with 03 and be 11 digits';
    }

    // Validate billing fields if another address is selected
    if (formData.billingOption === 'another') {
      if (!validateName(formData.billingName)) {
        newErrors.billingName = 'Write Correct Name (no numbers or special characters)';
      }
      if (!validateAddress(formData.billingAddress)) {
        newErrors.billingAddress = 'Write Address In Proper Format (minimum 15 characters)';
      }
      if (!validatePhone(formData.billingPhone)) {
        newErrors.billingPhone = 'Phone number must start with 03 and be 11 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle confirm order button
  const handleConfirmOrder = () => {
    if (validateForm()) {
      // Calculate total
      const quantity = parseInt(formData.quantity);
      let total;
      let isSpecialOffer = false;
      
      if (quantity === 2) {
        total = 1299;
        isSpecialOffer = true;
      } else {
        total = 699 * quantity;
      }

      // Prepare order data
      const orderData = {
        ...formData,
        totalAmount: total,
        quantity: quantity,
        isSpecialOffer: isSpecialOffer
      };

      // Navigate to order confirmation page
      navigate('/confirmation', { state: { orderData } });
    }
  };

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

      {/* Order Form Header */}
      <div className="text-center mb-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 bg-[#C0A020]/5 rounded-full blur-2xl -z-10"></div>
        <h1 className="font-['Tenor_Sans'] text-4xl md:text-5xl lg:text-[3.2rem] text-[#C0A020] inline-block relative mb-4">
          Complete Details Below
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#C0A020] to-transparent"></span>
        </h1>
        <p className="text-[#666] font-['Josefin_Sans'] text-sm tracking-[0.3em] uppercase mt-4">
          Fill In Your Information
        </p>
      </div>

      {/* Order Form Container */}
      <div className="max-w-225 mx-auto bg-white/85 backdrop-blur-sm p-6 md:p-10 lg:p-12 rounded-2xl shadow-xl border border-[#C0A020]/20 relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C0A020]/20 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C0A020]/20 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C0A020]/20 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C0A020]/20 rounded-br-2xl"></div>

        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Quantity Of Containers <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max="5"
              placeholder="Enter quantity (1-5)"
              className={`w-full px-4 py-3 rounded-lg border ${errors.quantity ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300`}
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>

          {/* Delivery Address */}
          <div>
            <label htmlFor="address" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your complete delivery address"
              className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 resize-y`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Appartment */}
          <div>
            <label htmlFor="appartment" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Appartment (optional)
            </label>
            <input
              type="text"
              id="appartment"
              value={formData.appartment}
              onChange={handleChange}
              placeholder="Appartment, suite, etc."
              className="w-full px-4 py-3 rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            />
          </div>

          {/* Country (disabled) */}
          <div>
            <label htmlFor="country" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Select Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              value={formData.country}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-[#C2E5D8] bg-gray-100 cursor-not-allowed"
            >
              <option value="">Select your country</option>
              <option value="pakistan" selected>Pakistan</option>
            </select>
          </div>

          {/* Province */}
          <div>
            <label htmlFor="city" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Select Province <span className="text-red-500">*</span>
            </label>
            <select
              id="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300`}
            >
              <option value="">Select your province</option>
              <option value="punjab">Punjab</option>
              <option value="sindh">Sindh</option>
              <option value="balochistan">Balochistan</option>
              <option value="kpk">Khyber Pakthoonkhwa</option>
              <option value="gb">Gilgit Baltistan (northern areas)</option>
            </select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* Postal Code */}
          <div>
            <label htmlFor="postalCode" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Postal Code (optional)
            </label>
            <input
              type="text"
              id="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
              className="w-full px-4 py-3 rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handlePhoneInput}
                onFocus={handlePhoneFocus}
                maxLength="11"
                placeholder="03XXXXXXXXX"
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300`}
              />
              {phonePopup && (
                <div className="absolute bottom-full left-0 mb-2 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white px-4 py-2 rounded-lg text-sm shadow-lg w-full max-w-xs">
                  Enter Phone Number carefully, we may contact you to confirm order, Otherwise order will not be dispatched
                  <div className="absolute top-full left-5 border-8 border-transparent border-t-[#D4AF37]"></div>
                </div>
              )}
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Billing Address Options */}
          <div>
            <label className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
              Billing Address <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  value="same"
                  checked={formData.billingOption === 'same'}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="font-['Tenor_Sans'] text-base text-[#333]">Same as delivery address</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  value="another"
                  checked={formData.billingOption === 'another'}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="font-['Tenor_Sans'] text-base text-[#333]">Another address</span>
              </label>
            </div>
          </div>

          {/* Billing Fields */}
          {showBilling && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="space-y-4 overflow-hidden"
            >
              <div>
                <label htmlFor="billingName" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="billingName"
                  value={formData.billingName}
                  onChange={handleChange}
                  placeholder="Enter billing name"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.billingName ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300`}
                />
                {errors.billingName && <p className="text-red-500 text-sm mt-1">{errors.billingName}</p>}
              </div>

              <div>
                <label htmlFor="billingAddress" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
                  Complete Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your complete billing address"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.billingAddress ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 resize-y`}
                />
                {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
              </div>

              <div>
                <label htmlFor="billingPhone" className="font-['Tenor_Sans'] text-base md:text-lg text-[#333] block mb-2">
                  Active Phone No <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="billingPhone"
                  value={formData.billingPhone}
                  onChange={handlePhoneInput}
                  maxLength="11"
                  placeholder="03XXXXXXXXX"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.billingPhone ? 'border-red-500' : 'border-[#C2E5D8]'} focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300`}
                />
                {errors.billingPhone && <p className="text-red-500 text-sm mt-1">{errors.billingPhone}</p>}
              </div>
            </motion.div>
          )}

          {/* Buttons - In a single row */}
          <div className="flex flex-row gap-4 justify-center pt-4">
            <button
              type="button"
              onClick={handleConfirmOrder}
              className="px-10 py-3 bg-gradient-to-r from-[#A6ACAF] via-[#D5DBDB] to-[#7F8C8D] text-[#111] border border-white/30 rounded-full font-['Josefin_Sans'] text-base font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7F8C8D]/30 hover:scale-[1.02] active:scale-[0.98] flex-1"
            >
              Confirm Order
            </button>
            <a
              href="/"
              className="px-10 py-3 border border-[#333] text-[#333] rounded-full font-['Josefin_Sans'] text-base font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-[#333] hover:text-white text-center flex-1"
            >
              BACK
            </a>
          </div>
        </form>
      </div>

      {/* Bottom decorative bar */}
      <div className="max-w-225 mx-auto mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-[#C0A020] to-[#D4AF37] mx-auto rounded-full"></div>
      </div>
    </motion.main>
  );
};

export default OrderForm;