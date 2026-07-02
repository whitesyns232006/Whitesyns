// src/Pages/CustomerReviews.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Review form state
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    review: '',
    email: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitMessage, setSubmitMessage] = useState('');

  // Google Apps Script URL (provided by you)
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzbufiZrYq25-lLcwb3fFnsAt8c-6KNSVRC9mQqpO6cg8HwC2F1rXJ1m4jIE16W9OxY/exec';

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch reviews from Google Sheets
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SCRIPT_URL}?action=getReviews`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setReviews(data);
        calculateStats(data);
      } else if (data.error) {
        console.error('Error fetching reviews:', data.error);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate average rating and total
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

  // Handle star click
  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setSubmitMessage('Please enter your name');
      return;
    }
    if (formData.rating === 0) {
      setSubmitMessage('Please select a rating');
      return;
    }
    if (!formData.review.trim()) {
      setSubmitMessage('Please write your review');
      return;
    }
    
    try {
      setSubmitting(true);
      setSubmitMessage('');
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submitReview',
          name: formData.name,
          rating: formData.rating,
          review: formData.review,
          email: formData.email || ''
        })
      });
      
      // Reset form
      setFormData({ name: '', rating: 0, review: '', email: '' });
      setSubmitMessage('✅ Thank you! Your review has been submitted for approval.');
      
      // Refresh reviews after 2 seconds
      setTimeout(() => {
        fetchReviews();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage('❌ Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Render stars
  const renderStars = (rating, interactive = false, onStarClick = null, onStarHover = null) => {
    const stars = [];
    const maxRating = 5;
    const currentRating = interactive ? hoverRating || rating : rating;
    
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => interactive && onStarClick && onStarClick(i)}
          onMouseEnter={() => interactive && onStarHover && onStarHover(i)}
          onMouseLeave={() => interactive && onStarHover && onStarHover(0)}
          className={`text-2xl md:text-3xl transition-all duration-200 ${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          } ${i <= currentRating ? 'text-[#D4AF37]' : 'text-gray-300'}`}
          disabled={!interactive}
          aria-label={`Rate ${i} stars`}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 px-[10%] bg-[#F5FFFA] border-y border-[#C2E5D8]">
        <div className="max-w-300 mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-[5%] md:px-[10%] bg-gradient-to-b from-[#F5FFFA] to-[#E8F5EE] border-y border-[#C2E5D8]"
    >
      <div className="max-w-300 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-['Tenor_Sans'] text-3xl md:text-4xl text-[#333] mb-3 relative inline-block">
            ⭐ Customer Reviews
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-[#D4AF37]"></span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#D4AF37]">{stats.average}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {reviews.length > 0 ? (
            reviews.slice(0, 6).map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#C2E5D8] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-['Tenor_Sans'] text-lg text-[#333]">{review.name}</h4>
                    <div className="flex mt-1">
                      {renderStars(parseInt(review.rating))}
                    </div>
                  </div>
                  <span className="text-xs text-[#888] whitespace-nowrap ml-4">
                    {review.date || 'Recent'}
                  </span>
                </div>
                <p className="text-[#555] text-sm leading-relaxed mt-2">
                  "{review.review}"
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-[#555]">
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>

        {/* Submit Review Form */}
        <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-[#D4AF37]/30 max-w-2xl mx-auto">
          <h3 className="font-['Tenor_Sans'] text-2xl text-center text-[#333] mb-6">
            Share Your Experience
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
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
                className="w-full px-4 py-2 rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
                required
              />
            </div>

            {/* Email Input (Optional) */}
            <div>
              <label className="block text-sm font-medium text-[#555] mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
              />
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium text-[#555] mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-1">
                {renderStars(5, true, handleStarClick, setHoverRating)}
              </div>
              {formData.rating === 0 && hoverRating === 0 && (
                <p className="text-xs text-red-500 mt-1">Please select a rating</p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-[#555] mb-1">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                rows="4"
                placeholder="Write your review here..."
                className="w-full px-4 py-2 rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 resize-y"
                required
              />
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div className={`text-center text-sm ${submitMessage.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-full font-['Josefin_Sans'] text-base font-medium transition-all duration-300 ${
                submitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/30'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>

            <p className="text-xs text-center text-[#888] mt-2">
              Your review will be published after moderation.
            </p>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default CustomerReviews;