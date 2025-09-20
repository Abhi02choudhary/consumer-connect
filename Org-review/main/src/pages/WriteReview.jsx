
import React, { useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const ReviewForm = () => {
  const { companyId, location } = useParams();  
  const org_name = companyId;


  const [formData, setFormData] = useState({
    email: "",
    comment: "",
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      org_name,
      location,
      ...formData,
      rating,
    };
    console.log("Sending Review Data:", reviewData);

    try {
      const response = await axios.post(
        `http://localhost:8086/write-review/${org_name}/${location}`, 
        reviewData
      );

      console.log("Data sent to backend:", response.data);

      setFormData({ email: "", comment: "" });
      setRating(0);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Thank you for your review!</h2>
              <p className="text-green-600 mb-4">Your feedback has been submitted successfully.</p>
              <p className="text-gray-600">Redirecting you back to the company profile...</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Write a Review for {org_name} - {location}
              </h2>
    
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border px-3 py-2 w-full rounded"
                  />
                </div>
                
    
                <div className="mb-4">
                  <label className="block mb-1">Comment</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    className="border px-3 py-2 w-full rounded"
                  />
                </div>
    
                <div className="mb-4">
                  <label className="block mb-1">Rating</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          star <= (hoverRating || rating)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
    
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };
    export default ReviewForm
    