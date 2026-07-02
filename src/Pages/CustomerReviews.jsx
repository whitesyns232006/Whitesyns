// src/Pages/CustomerReviews.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState('');

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6aLE7qMmrbImV7aRF6fRYOxz8DDrQAaw4K4BfCw6z2Mok0akIj-m5cZZHzUbKBJDE/exec';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SCRIPT_URL}?action=getReviews`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setReviews(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    if (reviewsData.length === 0) {
      setStats({ average: 0, total: 0 });
      return;
    }
    
    const total = reviewsData.length;
    const sum = reviewsData.reduce((acc, review) => acc + parseInt(review.rating), 0);
    const average = (sum / total).toFixed(1);
    
    setStats({ average, total });
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ FIXED: no-cors mode
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitMessage('');
    setSubmitMessageType('');
    
    if (!formData.name.trim()) {
      setSubmitMessage('Please enter your name');
      setSubmitMessageType('error');
      return;
    }
    if (!formData.email.trim()) {
      setSubmitMessage('Please enter your email to verify your purchase');
      setSubmitMessageType('error');
      return;
    }
    if (formData.rating === 0) {
      setSubmitMessage('Please select a rating');
      setSubmitMessageType('error');
      return;
    }
    if (!formData.review.trim()) {
      setSubmitMessage('Please write your review');
      setSubmitMessageType('error');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // ✅ Use no-cors mode
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submitReview',
          name: formData.name,
          email: formData.email,
          rating: formData.rating,
          review: formData.review
        })
      });
      
      // ✅ Reset form and show success
      setFormData({ name: '', email: '', rating: 0, review: '' });
      setSubmitMessage('Thank you! We Will publish it After the verification.');
      setSubmitMessageType('success');
      
      setTimeout(() => {
        fetchReviews();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage('❌ Network error. Please try again.');
      setSubmitMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  // Render stars
  const renderStars = (rating, interactive = false, showVerified = false) => {
    const stars = [];
    const maxRating = 5;
    const currentRating = interactive ? (hoverRating || rating) : rating;
    
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => interactive && handleStarClick(i)}
          onMouseEnter={() => interactive && setHoverRating(i)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`text-xl md:text-2xl transition-all duration-200 ${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          } ${i <= currentRating ? 'text-[#D4AF37]' : 'text-gray-300'}`}
          disabled={!interactive}
          aria-label={`Rate ${i} stars`}
        >
          ★
        </button>
      );
    }
    
    if (showVerified) {
      stars.push(
        <span key="verified" className="ml-2 text-xs text-green-600 font-medium">
          ✅ Verified
        </span>
      );
    }
    
    return stars;
  };

  const loadMoreReviews = () => {
    setVisibleCount(prev => prev + 5);
  };

  const getVisibleReviews = () => {
    return reviews.slice(0, visibleCount);
  };

  if (loading) {
    return (
      <section className="py-12 px-[5%] md:px-[10%] bg-[#F5FFFA] border-y border-[#C2E5D8]">
        <div className="max-w-300 mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-7 bg-gray-200 rounded w-40 mx-auto mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-28 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 px-[5%] md:px-[10%] bg-gradient-to-b from-[#F5FFFA] to-[#E8F5EE] border-y border-[#C2E5D8]"
    >
      <div className="max-w-300 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="font-['Tenor_Sans'] text-2xl md:text-3xl text-[#333] mb-2 relative inline-block">
            ⭐ Customer Reviews
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#D4AF37]"></span>
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#D4AF37]">{stats.average}</span>
              <div className="flex">
                {renderStars(Math.round(stats.average))}
              </div>
            </div>
            <span className="text-[#555] text-sm">
              ({stats.total} {stats.total === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>

        {/* Reviews Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {getVisibleReviews().length > 0 ? (
            getVisibleReviews().map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-[#C2E5D8] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="font-['Tenor_Sans'] text-base text-[#333] flex items-center gap-2 flex-wrap">
                      {review.name}
                      {review.verified === 'Yes' && (
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                          ✅ Verified
                        </span>
                      )}
                    </h4>
                    <div className="flex mt-0.5 items-center">
                      {renderStars(parseInt(review.rating), false, review.verified === 'Yes')}
                    </div>
                  </div>
                  <span className="text-xs text-[#888] whitespace-nowrap ml-3">
                    {review.date || 'Recent'}
                  </span>
                </div>
                <p className="text-[#555] text-sm leading-relaxed mt-1">
                  "{review.review}"
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-6 text-[#555]">
              <p className="text-sm">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>

        {/* View More Button */}
        {reviews.length > 5 && visibleCount < reviews.length && (
          <div className="text-center mb-8">
            <button
              onClick={loadMoreReviews}
              className="px-6 py-2 text-sm font-['Josefin_Sans'] text-[#D4AF37] border border-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              View More Reviews ({reviews.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* Submit Review Form */}
        <div className="bg-white/90 backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-lg border border-[#D4AF37]/30 max-w-2xl mx-auto">
          <h3 className="font-['Tenor_Sans'] text-xl text-center text-[#333] mb-4">
            Share Your Experience
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#555] mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#555] mb-1">
                Email <span className="text-red-500">*</span>
                <span className="text-xs text-gray-400 ml-2">(Required to verify your purchase)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter the email you used for order"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                💡 Only customers who have placed an order can submit a review
              </p>
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium text-[#555] mb-1">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-xl md:text-2xl transition-all duration-200 cursor-pointer hover:scale-110 ${
                      star <= (hoverRating || formData.rating) ? 'text-[#D4AF37]' : 'text-gray-300'
                    }`}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {formData.rating === 0 && hoverRating === 0 && (
                <p className="text-xs text-red-500 mt-1">Please select a rating</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#555] mb-1">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                rows="3"
                placeholder="Write your review here..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 resize-y"
                required
              />
            </div>

            {submitMessage && (
              <div className={`text-center text-sm p-2 rounded-lg ${
                submitMessageType === 'success' 
                  ? 'text-green-600 bg-green-50 border border-green-200' 
                  : 'text-red-500 bg-red-50 border border-red-200'
              }`}>
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-2.5 rounded-full font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 ${
                submitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4AF37]/30'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>

            <p className="text-xs text-center text-[#888] mt-1">
              ✅ Verified customers get auto-approved. Others need moderation.
            </p>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default CustomerReviews;