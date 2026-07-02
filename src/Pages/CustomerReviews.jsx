// src/Pages/CustomerReviews.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef(null);

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalReview, setModalReview] = useState('');
  const [modalRating, setModalRating] = useState(0);
  const [modalHoverRating, setModalHoverRating] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [modalMessageType, setModalMessageType] = useState('');

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcUAMOQmjXU8RpZYyYNXSIf-jR9qf8onAMpkjrRc0SSv2LKc1bHkbnMrQoIcCobwXV/exec';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target) && isFormOpen) {
        setIsFormOpen(false);
        resetForm();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (isFormOpen) {
          setIsFormOpen(false);
          resetForm();
        }
        if (showHelpModal) setShowHelpModal(false);
        if (showModal) setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isFormOpen, showHelpModal, showModal]);

  const resetForm = () => {
    setFormData({ name: '', email: '', rating: 0, review: '' });
    setHoverRating(0);
    setSubmitMessage('');
    setSubmitMessageType('');
  };

  const openForm = () => {
    setIsFormOpen(true);
    resetForm();
  };

  const closeForm = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const openHelpModal = () => setShowHelpModal(true);
  
  const handleHelpChoice = (choice) => {
    setShowHelpModal(false);
    if (choice === 'edit') openModal('edit');
    else if (choice === 'delete') openModal('delete');
  };

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

  const openModal = (mode) => {
    setModalMode(mode);
    setShowModal(true);
    setModalEmail('');
    setModalReview('');
    setModalRating(0);
    setModalHoverRating(0);
    setModalMessage('');
    setModalMessageType('');
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
    setModalMessageType('');
  };

  const handleModalStarClick = (rating) => {
    setModalRating(rating);
  };

  // ✅ SUBMIT REVIEW
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

      // ✅ Real request (no 'no-cors') so we can actually read the server's response.
      // Content-Type is text/plain to avoid a CORS preflight (Apps Script has no doOptions),
      // while the body itself is still valid JSON that the backend parses normally.
      // A minimum delay is added so the "validating your email" feel is never instant/jumpy.
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1200));

      const [response] = await Promise.all([
        fetch(SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            action: 'submitReview',
            name: formData.name,
            email: formData.email,
            rating: formData.rating,
            review: formData.review
          })
        }),
        minDelay
      ]);

      const result = await response.json();

      if (result.success) {
        setFormData({ name: '', email: '', rating: 0, review: '' });
        setSubmitMessage('Review Published Successfully');
        setSubmitMessageType('success');

        setTimeout(() => {
          fetchReviews();
          closeForm();
        }, 2000);
      } else if (result.code === 'NOT_VERIFIED') {
        setSubmitMessage('You have not placed order');
        setSubmitMessageType('error');
      } else if (result.code === 'ALREADY_SUBMITTED') {
        setSubmitMessage('Only One Review Per Customer');
        setSubmitMessageType('error');
      } else {
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
        setSubmitMessageType('error');
      }

    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage('❌ Network error. Please try again.');
      setSubmitMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ EDIT REVIEW
  const handleEditReview = async () => {
    setModalMessage('');
    setModalMessageType('');

    if (!modalEmail.trim()) {
      setModalMessage('Please enter your email');
      setModalMessageType('error');
      return;
    }
    if (!modalReview.trim()) {
      setModalMessage('Please write your review');
      setModalMessageType('error');
      return;
    }
    if (modalRating === 0) {
      setModalMessage('Please select a rating');
      setModalMessageType('error');
      return;
    }

    try {
      setSubmitting(true);

      // ✅ Real request (no 'no-cors') so we can actually read the server's response
      // and show the correct validation message (email not verified / no review found / etc).
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'editReview',
          email: modalEmail,
          review: modalReview,
          rating: modalRating
        })
      });

      const result = await response.json();

      if (result.success) {
        setModalMessage('Review Updated Successfully');
        setModalMessageType('success');

        setTimeout(() => {
          closeModal();
          fetchReviews();
        }, 2000);
      } else if (result.code === 'NOT_VERIFIED') {
        setModalMessage('You have not placed order');
        setModalMessageType('error');
      } else if (result.code === 'NOT_FOUND') {
        setModalMessage(result.error || 'No review found with this email');
        setModalMessageType('error');
      } else {
        setModalMessage(result.error || 'Something went wrong. Please try again.');
        setModalMessageType('error');
      }

    } catch (error) {
      console.error('Error editing review:', error);
      setModalMessage('❌ Network error. Please try again.');
      setModalMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ DELETE REVIEW
  const handleDeleteReview = async () => {
    setModalMessage('');
    setModalMessageType('');

    if (!modalEmail.trim()) {
      setModalMessage('Please enter your email');
      setModalMessageType('error');
      return;
    }

    try {
      setSubmitting(true);

      // ✅ Real request (no 'no-cors') so we can actually read the server's response
      // and show the correct validation message (email not verified / no review found / etc).
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'deleteReview',
          email: modalEmail
        })
      });

      const result = await response.json();

      if (result.success) {
        setModalMessage('Review Deleted Successfully');
        setModalMessageType('success');

        setTimeout(() => {
          closeModal();
          fetchReviews();
        }, 2000);
      } else if (result.code === 'NOT_VERIFIED') {
        setModalMessage('You have not placed order');
        setModalMessageType('error');
      } else if (result.code === 'NOT_FOUND') {
        setModalMessage(result.error || 'No review found with this email');
        setModalMessageType('error');
      } else {
        setModalMessage(result.error || 'Something went wrong. Please try again.');
        setModalMessageType('error');
      }

    } catch (error) {
      console.error('Error deleting review:', error);
      setModalMessage('❌ Network error. Please try again.');
      setModalMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================
  // RENDER STARS
  // ============================================

  const renderStars = (rating, interactive = false, onStarClick = null, onStarHover = null, showVerified = false, isModal = false) => {
    const stars = [];
    const maxRating = 5;
    const currentRating = interactive ? (isModal ? (modalHoverRating || modalRating) : (hoverRating || rating)) : rating;
    
    const handleClick = (star) => {
      if (interactive && onStarClick) {
        if (isModal) {
          handleModalStarClick(star);
        } else {
          onStarClick(star);
        }
      }
    };

    const handleHover = (star) => {
      if (interactive && onStarHover) {
        if (isModal) {
          setModalHoverRating(star);
        } else {
          onStarHover(star);
        }
      }
    };

    const handleLeave = () => {
      if (interactive && onStarHover) {
        if (isModal) {
          setModalHoverRating(0);
        } else {
          onStarHover(0);
        }
      }
    };

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleLeave}
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

  // ============================================
  // LOAD MORE
  // ============================================

  const loadMoreReviews = () => {
    setVisibleCount(prev => prev + 5);
  };

  const getVisibleReviews = () => {
    return reviews.slice(0, visibleCount);
  };

  // ============================================
  // LOADING STATE
  // ============================================

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

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <>
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
                        {renderStars(parseInt(review.rating), false, null, null, review.verified === 'Yes')}
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

          {/* Write a Review Button */}
          <div className="text-center mb-6">
            <button
              onClick={openForm}
              className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white rounded-full font-['Josefin_Sans'] text-base font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/30"
            >
              ✍️ Write a Review
            </button>
          </div>

          {/* Review Form */}
          {isFormOpen && (
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/95 backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-2xl border border-[#D4AF37]/30 max-w-2xl mx-auto"
            >
              <button
                onClick={closeForm}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
                aria-label="Close review form"
              >
                ×
              </button>

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

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex-1 py-2.5 rounded-full font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 ${
                      submitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4AF37]/30'
                    }`}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>

                  <button
                    type="button"
                    onClick={openHelpModal}
                    className="px-4 py-2.5 rounded-full font-['Josefin_Sans'] text-sm font-medium text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
                  >
                    Help
                  </button>
                </div>

                <p className="text-xs text-center text-[#888] mt-1">
                  ✅ Verified customers get auto-approved. Others need moderation.
                </p>

                <div className="text-center mt-2">
                  <Link 
                    to="/privacy-policy" 
                    className="text-xs text-[#D4AF37] hover:underline transition-colors duration-300"
                  >
                    📖 Learn About Our Reviews Policy
                  </Link>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* HELP MODAL */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">🛠️</div>
              <h3 className="font-['Tenor_Sans'] text-xl text-[#333]">Choose an Option</h3>
              <p className="text-sm text-[#555] mt-1">What would you like to do with your review?</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleHelpChoice('edit')}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white rounded-xl font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4AF37]/30 flex items-center justify-center gap-2"
              >
                <span>✏️</span> Edit Your Review
              </button>
              
              <button
                onClick={() => handleHelpChoice('delete')}
                className="w-full py-3 px-4 bg-red-500 text-white rounded-xl font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
              >
                <span>🗑️</span> Delete Your Review
              </button>
              
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full py-3 px-4 border border-[#C2E5D8] text-[#555] rounded-xl font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <span>❌</span> Cancel
              </button>
            </div>

            <p className="text-xs text-center text-[#888] mt-4">
              💡 Your review will be updated or deleted if the email matches our records.
            </p>
          </motion.div>
        </div>
      )}

      {/* EDIT/DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['Tenor_Sans'] text-xl text-[#333]">
                {modalMode === 'edit' ? '✏️ Edit Your Review' : '🗑️ Delete Your Review'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#555] mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
              />
              <p className="text-xs text-gray-400 mt-1">
                ⚠️ Use the same email you used for your original review
              </p>
            </div>

            {modalMode === 'edit' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#555] mb-1">
                    New Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleModalStarClick(star)}
                        onMouseEnter={() => setModalHoverRating(star)}
                        onMouseLeave={() => setModalHoverRating(0)}
                        className={`text-xl md:text-2xl transition-all duration-200 cursor-pointer hover:scale-110 ${
                          star <= (modalHoverRating || modalRating) ? 'text-[#D4AF37]' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#555] mb-1">
                    New Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={modalReview}
                    onChange={(e) => setModalReview(e.target.value)}
                    rows="3"
                    placeholder="Write your updated review..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#C2E5D8] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 resize-y"
                  />
                </div>
              </>
            )}

            {modalMode === 'delete' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  ⚠️ This action cannot be undone. Your review will be permanently removed.
                </p>
              </div>
            )}

            {modalMessage && (
              <div className={`text-center text-sm p-2 rounded-lg mb-4 ${
                modalMessageType === 'success' 
                  ? 'text-green-600 bg-green-50 border border-green-200' 
                  : 'text-red-500 bg-red-50 border border-red-200'
              }`}>
                {modalMessage}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={modalMode === 'edit' ? handleEditReview : handleDeleteReview}
                disabled={submitting}
                className={`flex-1 py-2.5 rounded-full font-['Josefin_Sans'] text-sm font-medium transition-all duration-300 ${
                  submitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : modalMode === 'edit'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-white hover:-translate-y-0.5 hover:shadow-lg'
                      : 'bg-red-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30'
                }`}
              >
                {submitting ? 'Processing...' : modalMode === 'edit' ? 'Save Changes' : 'Delete Review'}
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2.5 rounded-full font-['Josefin_Sans'] text-sm font-medium text-[#555] border border-[#C2E5D8] hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-center text-[#888] mt-3">
              {modalMode === 'edit' 
                ? '💡 Your review will be updated if the email matches our records.' 
                : '💡 Your review will be deleted if the email matches our records.'}
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CustomerReviews;