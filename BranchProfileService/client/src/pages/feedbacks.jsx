// import { useEffect, useRef } from "react";

// export function CompanyProfileWebsite() {
//   const reviews = [
//     { name: "Maahi Laljibhai", message: "Excellent support team and quick resolution to my issue. Would definitely recommend!", rating: 5 },
//     { name: "Neel Patel", message: "Product was good, but took too long to resolve my shipping issue.", rating: 3 },
//     { name: "Krisha Shah", message: "Very smooth experience from start to finish. The interface is intuitive and user-friendly.", rating: 5 },
//     { name: "Dhruvi Mehta", message: "Got my refund within 30 minutes of requesting. Impressive service standards.", rating: 4 },
//     { name: "Raj Sharma", message: "Quality exceeded my expectations. Will be a returning customer for sure.", rating: 5 },
//     { name: "Priya Desai", message: "Responsive customer service, but the product had minor defects.", rating: 3 },
//     { name: "Arjun Kumar", message: "Fast delivery and excellent packaging. Product works perfectly.", rating: 5 },
//     { name: "Ananya Joshi", message: "Website was easy to navigate and checkout process was seamless.", rating: 4 },
//     { name: "Vikram Singh", message: "Great value for money. Exactly what I was looking for.", rating: 4 },
//     { name: "Meera Patel", message: "Had some initial setup issues but support team was very helpful.", rating: 4 }
//   ];
  
//   // Disable page scrolling
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);
  
//   const getRandomColor = (name) => {
//     const colors = [
//       { bg: "#bbf7d0", text: "#166534" }, // Green
//       { bg: "#bfdbfe", text: "#1e40af" }, // Blue
//       { bg: "#fef3c7", text: "#92400e" }, // Yellow
//       { bg: "#fecdd3", text: "#9f1239" }, // Red
//       { bg: "#e9d5ff", text: "#6b21a8" }, // Purple
//     ];
    
//     const index = name.charCodeAt(0) % colors.length;
//     return colors[index];
//   };

//   const getStars = (rating) => {
//     return Array(5).fill(0).map((_, i) => (
//       <span key={i} style={{ color: i < rating ? "#f59e0b" : "#d1d5db" }}>
//         ★
//       </span>
//     ));
//   };
  
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: "12%",
//         left: 0,
//         right: 0,
//         bottom: "7%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//         zIndex: 100,
//         marginInlineStart:"10%"
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "800px",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//           borderRadius: "12px",
//           backgroundColor: "white",
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           height: "100%"
//         }}
//       >
//         {/* Fixed header */}
//         <div
//           style={{
//             padding: "20px 25px",
//             borderBottom: "1px solid #f3f4f6",
//             backgroundColor: "white",
//             position: "sticky",
//             top: 0,
//             zIndex: 10
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <h2 style={{ 
//               fontSize: "1.5rem", 
//               fontWeight: "600", 
//               color: "#111827",
//               margin: 0
//             }}>
//               Customer Feedback
//             </h2>
//             <div style={{ 
//               backgroundColor: "#f3f4f6", 
//               padding: "6px 12px", 
//               borderRadius: "16px",
//               fontSize: "0.875rem",
//               fontWeight: "500"
//             }}>
//               {reviews.length} reviews
//             </div>
//           </div>
//           <div style={{ 
//             display: "flex", 
//             alignItems: "center", 
//             marginTop: "8px",
//             color: "#4b5563",
//             fontSize: "0.9rem" 
//           }}>
//             <div style={{ display: "flex", marginRight: "8px" }}>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span key={star} style={{ color: "#f59e0b" }}>★</span>
//               ))}
//             </div>
//             <span>4.2 average rating</span>
//           </div>
//         </div>
        
//         {/* Scrollable content */}
//         <div
//           style={{
//             overflowY: "auto",
//             padding: "5px 20px 20px 20px",
//             flex: 1
//           }}
//         >
//           {reviews.map((review, index) => {
//             const colorScheme = getRandomColor(review.name);
            
//             return (
//               <div
//                 key={index}
//                 style={{
//                   padding: "16px",
//                   marginTop: "15px",
//                   borderRadius: "10px",
//                   backgroundColor: "#fafafa",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//                   transition: "transform 0.2s ease",
//                   position: "relative"
//                 }}
//               >
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <div
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       borderRadius: "50%",
//                       backgroundColor: colorScheme.bg,
//                       color: colorScheme.text,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "600",
//                       fontSize: "1.1rem",
//                       marginRight: "12px"
//                     }}
//                   >
//                     {review.name.charAt(0)}
//                   </div>
//                   <div>
//                     <div style={{ 
//                       fontWeight: "600", 
//                       color: "#111827",
//                       fontSize: "1rem",
//                       lineHeight: "1.3"
//                     }}>
//                       {review.name}
//                     </div>
//                     <div style={{ 
//                       fontSize: "0.85rem", 
//                       display: "flex",
//                       marginTop: "2px"
//                     }}>
//                       {getStars(review.rating)}
//                     </div>
//                   </div>
//                 </div>
//                 <p style={{ 
//                   margin: "12px 0 0 0",
//                   color: "#4b5563",
//                   lineHeight: "1.5",
//                   fontSize: "0.95rem"
//                 }}>
//                   {review.message}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";



export function CompanyProfileWebsite() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get email from the URL path (assumes email is the first segment in the URL path)
    const path = window.location.pathname;
    const privateID = path.split("/")[1]; // Extracts the email from URL like /email/brandReview
    console.log("Email from URL:", privateID); // Debugging line
    // Fetch reviews from the backend
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8083/${privateID}/customerReview`);
        
        const data = await response.json();
        console.log(response);
        setReviews(data); // Set fetched reviews in state
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getRandomColor = (name) => {
    const colors = [
      { bg: "#bbf7d0", text: "#166534" }, // Green
      { bg: "#bfdbfe", text: "#1e40af" }, // Blue
      { bg: "#fef3c7", text: "#92400e" }, // Yellow
      { bg: "#fecdd3", text: "#9f1239" }, // Red
      { bg: "#e9d5ff", text: "#6b21a8" }, // Purple
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#f59e0b" : "#d1d5db" }}>
        ★
      </span>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (window.location.pathname.includes("/status")) {
    return null;
  }
  
  if (window.location.pathname.includes("/postList")) {
    return null;
  }
  
  return (
    <div
      style={{
        position: "fixed",
        top: "12%",
        left: 0,
        right: 0,
        bottom: "7%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        zIndex: 100,
        marginInlineStart: "10%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          borderRadius: "12px",
          backgroundColor: "white",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Fixed header */}
        <div
          style={{
            padding: "20px 25px",
            borderBottom: "1px solid #f3f4f6",
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", margin: 0 }}>
              Your Reviews
            </h2>
            <div
              style={{
                backgroundColor: "#f3f4f6",
                padding: "6px 12px",
                borderRadius: "16px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              {reviews.length} reviews
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "8px",
              color: "#4b5563",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ display: "flex", marginRight: "8px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ color: "#f59e0b" }}>★</span>
              ))}
            </div>
            <span>4.2 average rating</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            overflowY: "auto",
            padding: "5px 20px 20px 20px",
            flex: 1,
          }}
        >
          {reviews.map((review, index) => {
            const colorScheme = getRandomColor(review.name);

            return (
               
              <div
                key={index}
                style={{
                  padding: "16px",
                  marginTop: "15px",
                  borderRadius: "10px",
                  backgroundColor: "#fafafa",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: colorScheme.bg,
                      color: colorScheme.text,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      marginRight: "12px",
                    }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#111827",
                        fontSize: "1rem",
                        lineHeight: "1.3",
                      }}
                    >
                      {review.name}
                    </div>
                    <div style={{ fontSize: "0.85rem", display: "flex", marginTop: "2px" }}>
                      {getStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    margin: "12px 0 0 0",
                    color: "#4b5563",
                    lineHeight: "1.5",
                    fontSize: "0.95rem",
                  }}
                >
                  {review.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}