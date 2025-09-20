
// import React from "react"
// import { useState, useEffect, useRef } from "react"
// import { Link, useParams } from "react-router-dom"
// import { Star } from "lucide-react"
// import axios from "axios"
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer ,
//   Line,
//   LineChart
// } from 'recharts';


// const OrgPage = () => {
//   const { companyId, location } = useParams()
//   const [org, setOrg] = useState(null)
//   const [reviews, setReviews] = useState([])
//   const [complainAnalysis, setComplainAnalysis] = useState([]);
//   const [avgRating, setAvgRating] = useState(null)
//   const[avgRatingAnalysis, setAvgRatingAnalysis] = useState([])
//   const[complainpermonth, setComplainpermonth] = useState([])
//   const aboutRef = useRef(null)
//   const reviewRef = useRef(null)

//   const scrollToSection = (section) => {
//     const targetRef = section === "about" ? aboutRef : reviewRef
//     if (targetRef.current) {
//       targetRef.current.scrollIntoView({ behavior: "smooth" })
//     }
//   }

//   const ComplaintsBarChart = ({ data }) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return <p className="text-gray-500">No complaint data available.</p>;
//     }
  
//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="count" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     );
//   };
//   const RatingLineChart = ({ data }) => {
//     if(!Array.isArray(data) || data.length == 0){
//       return <p classname="text-gray-500">No reviews available</p>
//     }
//     const roundedData = data.map(item => ({
//       ...item,
//       avgRating: parseFloat(item.avgRating.toFixed(2)),
//     }));
    
//     return (
//     <ResponsiveContainer width ="100%" height={300}>
//       <LineChart data={roundedData}>
//         <CartesianGrid stockDasharray = "5 5"/>
//           <XAxis dataKey="week"/>
//           <YAxis/>
//           <Tooltip/>
//           <Line type="monotone" dataKey="avgRating" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
//     </ResponsiveContainer>
//     );
//   }
//   const complainpermonthAnalysis= ({data}) => {
//     if(!Array.isArray(data) || data.length==0){
//       return <p className="text-gray-500">No complaint data available.</p>;
//     }
//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={roundData}>
//           <CartesianGrid stockDasharray="4 4"/>
//           <XAxis dataKey="month"/>
//           <YAxis/>
//           <Tooltip/>
//           <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const orgRes = await axios.get(`http://localhost:8086/company/${companyId}/${location}`)
//         const reviewRes = await axios.get(`http://localhost:8086/review/${companyId}/${location}`)
//         const ratingVsMonth = await axios.get(`http://localhost:8086/complainAnalysis/${companyId}/${location}`)
//         const avgRatingRes = await axios.get(`http://localhost:8086/avgRatingAnalysis/${companyId}/${location}`)
//         const complainVsMonth = await axios.get(`http://localhost:8086/monthvscom/${companyId}/${location}`)
//         setOrg(orgRes.data.branchData)
//         setReviews(reviewRes.data.reviews)
//         setComplainAnalysis(ratingVsMonth.data.complaintsByMonth)
//         setAvgRatingAnalysis(avgRatingRes.data.avgRatingVsWeek)
//         setComplainpermonth(complainVsMonth.data.complaintsByMonth)
//       } catch (err) {
//         console.error(err)
//       }
//     }
//     fetchData()
//   }, [companyId, location])

//   useEffect(() => {
//     if (reviews.length > 0) {
//       const total = reviews.reduce((sum, review) => sum + review.rating, 0)
//       setAvgRating((total / reviews.length).toFixed(1))
//     } else {
//       setAvgRating(null)
//     }
//   }, [reviews])

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-10">
//       {/* Org Section */}
//       {org && (
//         <div className="border p-6 rounded-xl shadow-md flex gap-4 items-center">
//           <div className="bg-blue-200 text-blue-700 font-bold w-14 h-14 flex items-center justify-center rounded-full text-3xl">
//             {(org.branch_name && org.branch_name.charAt(0).toUpperCase()) || "?"}
//           </div>
//           <div>
//             <div className="text-2xl font-semibold">{org.branch_name}</div>
//             <div className="text-gray-500">{org.location}</div>
//             {avgRating && (
//               <div className="text-yellow-600 font-medium flex items-center gap-1">
//                 Average Rating: {avgRating}
//                 <Star size={16} fill="currentColor" />
//               </div>
//             )}
//             <p className="mt-2 text-sm text-gray-600">{org.shortBio}</p>
//           </div>
//         </div>
//       )}

//       {/* Scroll Buttons */}
//       <div className="flex space-x-4">
//         <button
//           onClick={() => scrollToSection("about")}
//           className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           About
//         </button>
//         <button
//           onClick={() => scrollToSection("reviews")}
//           className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           Read Reviews
//         </button>
//         <Link
//         to={`/write-review/${companyId}/${location}`}
//         replace={true}
//           // to={`${companyId}/${location}/write-review`}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           Write a Review
//         </Link>
//       </div>

//       {/* About Section */}
//       <section id="about" ref={aboutRef} className="py-16 px-4 bg-gray-100 rounded-xl shadow-inner">
//         <h2 className="text-2xl font-bold mb-4">About {org?.branch_name}</h2>
//         <p className="text-gray-700 leading-relaxed">{org?.longBio|| "No description available."}</p>
//       </section>
//        {/* <section className="py-16 px-4 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Monthly Complaints Analysis</h2>
//       <ComplaintsBarChart data={complainAnalysis} />
//     </section>  */}
//      <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Monthly Complaints Analysis</h2>
//       {complainAnalysis.length > 0 ? (
//         <ComplaintsBarChart data={complainAnalysis} />
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>

//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Rating Analysis</h2>
//       {avgRatingAnalysis.length > 0 ? (
//         <RatingLineChart data={avgRatingAnalysis} />
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Complain Analysis</h2>
//       {complainpermonth.length > 0 ? (
//         <complainpermonthAnalysis data={complainpermonth} />
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>

//       {/* Reviews Section */}
//       <section id="reviews" ref={reviewRef} className="py-16 px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold">Customer Reviews</h2>
//           <Link
//            to={`/write-review/${companyId}/${location}`}
//         replace={true}
//             className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
//           >
//             Write a review
//           </Link>
//         </div>

//         {/* Individual Reviews */}
//         <div className="space-y-6">
//           {reviews.length === 0 ? (
//             <p className="text-gray-500">No reviews yet.</p>
//           ) : (
//             reviews.map((review, idx) => (
//               <div key={idx} className="bg-white rounded-lg shadow-md p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="bg-green-200 text-green-700 font-bold w-10 h-10 flex items-center justify-center rounded-full text-xl">
//                     {review.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="font-medium">{review.name}</div>
//                 </div>
//                 <p className="text-gray-700 mb-2">{review.comment}</p>
//                 <div className="flex gap-1 text-yellow-500">
//                   {Array(review.rating).fill().map((_, i) => (
//                     <Star key={i} size={18} fill="currentColor" />
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }


// export default OrgPage

// import React, { useState, useEffect, useRef } from "react"
// import { Link, useParams } from "react-router-dom"
// import { Star } from "lucide-react"
// import axios from "axios"
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   Line,
//   LineChart, Cell,
//   PieChart, Pie
// } from "recharts"

// const COLORS = ["#4CAF50", "#F44336"];
// const OrgPage = () => {
//   const { companyId, location } = useParams()
//   const [org, setOrg] = useState(null)
//   const [reviews, setReviews] = useState([])
//   const [complainAnalysis, setComplainAnalysis] = useState([])
//   const [avgRating, setAvgRating] = useState(null)
//   const [avgRatingAnalysis, setAvgRatingAnalysis] = useState([])
//   const [complainpermonth, setComplainpermonth] = useState([])
//   const [complainTypeDist, setComplainTypeDist] = useState([])
//   const aboutRef = useRef(null)
//   const reviewRef = useRef(null)

//   const scrollToSection = (section) => {
//     const targetRef = section === "about" ? aboutRef : reviewRef
//     if (targetRef.current) {
//       targetRef.current.scrollIntoView({ behavior: "smooth" })
//     }
//   }

//   const ComplaintsBarChart = ({ data }) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return <p className="text-gray-500">No complaint data available.</p>
//     }

//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="count" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     )
//   }

//   const RatingLineChart = ({ data }) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return <p className="text-gray-500">No reviews available</p>
//     }

//     const roundedData = data.map(item => ({
//       ...item,
//       avgRating: parseFloat(item.avgRating.toFixed(2)),
//     }))

//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={roundedData}>
//           <CartesianGrid strokeDasharray="5 5" />
//           <XAxis dataKey="week" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="avgRating" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     )
//   }

//   const ComplainPerMonthChart = ({ data }) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return <p className="text-gray-500">No complaint data available.</p>
//     }

//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="4 4" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     )
//   }

//   const ComplaintTypePieChart = ({ data }) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return <p className="text-gray-500">No complaint type data available.</p>
//     }
  
//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="count"
//             nameKey="type"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     )
//   }
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const orgRes = await axios.get(`http://localhost:8086/company/${companyId}/${location}`)
//         const reviewRes = await axios.get(`http://localhost:8086/review/${companyId}/${location}`)
//         const ratingVsMonth = await axios.get(`http://localhost:8086/complainAnalysis/${companyId}/${location}`)
//         const avgRatingRes = await axios.get(`http://localhost:8086/avgRatingAnalysis/${companyId}/${location}`)
//         const complainVsMonth = await axios.get(`http://localhost:8086/monthvscom/${companyId}/${location}`)
//         //const res = await axios.get(`http://localhost:8086/authStatusStats/${org_name}/${cleanlocation}`);
//         const complainTypeRes = await axios.get(`http://localhost:8086/authStatusStats/${companyId}/${location}`)

//         setOrg(orgRes.data.branchData)
//         setReviews(reviewRes.data.reviews)
//         setComplainAnalysis(ratingVsMonth.data.complaintsByMonth)
//         setAvgRatingAnalysis(avgRatingRes.data.avgRatingVsWeek)
//         setComplainpermonth(complainVsMonth.data.complaintsByMonth)
//         setComplainTypeDist(complainTypeRes.data.complaintsByType)
        
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchData()
//   }, [companyId, location])

//   useEffect(() => {
//     if (reviews.length > 0) {
//       const total = reviews.reduce((sum, review) => sum + review.rating, 0)
//       setAvgRating((total / reviews.length).toFixed(1))
//     } else {
//       setAvgRating(null)
//     }
//   }, [reviews])

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-10">
//       {/* Org Section */}
//       {org && (
//         <div className="border p-6 rounded-xl shadow-md flex gap-4 items-center">
//           <div className="bg-blue-200 text-blue-700 font-bold w-14 h-14 flex items-center justify-center rounded-full text-3xl">
//             {(org.branch_name && org.branch_name.charAt(0).toUpperCase()) || "?"}
//           </div>
//           <div>
//             <div className="text-2xl font-semibold">{org.branch_name}</div>
//             <div className="text-gray-500">{org.location}</div>
//             {avgRating && (
//               <div className="text-yellow-600 font-medium flex items-center gap-1">
//                 Average Rating: {avgRating}
//                 <Star size={16} fill="currentColor" />
//               </div>
//             )}
//             <p className="mt-2 text-sm text-gray-600">{org.shortBio}</p>
//           </div>
//         </div>
//       )}
      
      

//       {/* Scroll Buttons */}
//       <div className="flex space-x-4">
//         <button
//           onClick={() => scrollToSection("about")}
//           className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           About
//         </button>
//         <button
//           onClick={() => scrollToSection("reviews")}
//           className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           Read Reviews
//         </button>
//         <Link
//           to={`/write-review/${companyId}/${location}`}
//           replace={true}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           Write a Review
//         </Link>
//       </div>

//       {/* About Section */}
//       <section id="about" ref={aboutRef} className="py-16 px-4 bg-gray-100 rounded-xl shadow-inner">
//         <h2 className="text-2xl font-bold mb-4">About {org?.branch_name}</h2>
//         <p className="text-gray-700 leading-relaxed">{org?.longBio || "No description available."}</p>
//       </section>

//       {/* Charts */}
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">Monthly Complaints Analysis</h2>
//         <ComplaintsBarChart data={complainAnalysis} />
//       </div>

//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">Rating Analysis</h2>
//         <RatingLineChart data={avgRatingAnalysis} />
//       </div>

//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">Complain Trend Over Time</h2>
//         <ComplainPerMonthChart data={complainpermonth} />
//       </div>
//       <div className="p-4">
//   <h2 className="text-xl font-semibold mb-2">Complaint Type Distribution</h2>
//   <ComplaintTypePieChart data={complainTypeDist} />
// </div>


//       {/* Reviews Section */}
//       <section id="reviews" ref={reviewRef} className="py-16 px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold">Customer Reviews</h2>
//           <Link
//             to={`/write-review/${companyId}/${location}`}
//             replace={true}
//             className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
//           >
//             Write a review
//           </Link>
//         </div>

//         {/* Individual Reviews */}
//         <div className="space-y-6">
//           {reviews.length === 0 ? (
//             <p className="text-gray-500">No reviews yet.</p>
//           ) : (
//             reviews.map((review, idx) => (
//               <div key={idx} className="bg-white rounded-lg shadow-md p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="bg-green-200 text-green-700 font-bold w-10 h-10 flex items-center justify-center rounded-full text-xl">
//                     {review.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="font-medium">{review.name}</div>
//                 </div>
//                 <p className="text-gray-700 mb-2">{review.comment}</p>
//                 <div className="flex gap-1 text-yellow-500">
//                   {Array(review.rating).fill().map((_, i) => (
//                     <Star key={i} size={18} fill="currentColor" />
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }

// export default OrgPage

import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { Star } from "lucide-react"
import axios from "axios"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  Cell,
  PieChart,
  Pie,
} from "recharts"

const COLORS = ["#4CAF50", "#F44336"]

const OrgPage = () => {
  const { companyId, location } = useParams()
  const [org, setOrg] = useState(null)
  const [reviews, setReviews] = useState([])
  const [complainAnalysis, setComplainAnalysis] = useState([])
  const [avgRating, setAvgRating] = useState(null)
  const [avgRatingAnalysis, setAvgRatingAnalysis] = useState([])
  const [complainpermonth, setComplainpermonth] = useState([])
  const [complainTypeDist, setComplainTypeDist] = useState([])
  const [data, setData] = useState([]);
  const aboutRef = useRef(null)
  const reviewRef = useRef(null)

  
  const scrollToSection = (section) => {
    const targetRef = section === "about" ? aboutRef : reviewRef
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const ComplaintsBarChart = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-500">No complaint data available.</p>
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2196F3" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  const RatingLineChart = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-500">No reviews available</p>
    }

    const roundedData = data.map((item) => ({
      ...item,
      avgRating: parseFloat(item.avgRating.toFixed(2)),
    }))

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={roundedData}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="avgRating"
            stroke="#2196F3"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const ComplainPerMonthChart = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-500">No complaint data available.</p>
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2196F3"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const StatusChart = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-500">No complaint data available.</p>
    }
      return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#3182ce" barSize={40} >
              {data.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={
          entry.name === "Resolved"
            ? "#4CAF50"
            : entry.name === "Active"
            ? "#2196F3" 
            : "#8884d8"
        }
      />
    ))}
    </Bar>
            </BarChart>
          </ResponsiveContainer>
       
      );
    };
    


  const ComplaintTypePieChart = ({ data }) => {
    // Check if data is available, else show a message
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-500">No complaint type data available.</p>;
    }
  
    // Format the data to make sure it's in the correct structure
    const formattedData = data.map(item => ({
      type: item.type,  // Replace with actual key from the backend
      count: item.count  // Replace with actual key from the backend
    }));
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgRes = await axios.get(
          `http://localhost:8086/company/${companyId}/${location}`
        )
        const reviewRes = await axios.get(
          `http://localhost:8086/review/${companyId}/${location}`
        )
        const ratingVsMonth = await axios.get(
          `http://localhost:8086/complainAnalysis/${companyId}/${location}`
        )
        const avgRatingRes = await axios.get(
          `http://localhost:8086/avgRatingAnalysis/${companyId}/${location}`
        )
        const complainVsMonth = await axios.get(
          `http://localhost:8086/monthvscom/${companyId}/${location}`
        )
        const complainTypeRes = await axios.get(
          `http://localhost:8086/authStatusStats/${companyId}/${location}`
        )
        const res = await axios.get(`http://localhost:8086/statusAnalysis/${companyId}/${location}`);

        console.log("Complaint Type Distribution Response:", complainTypeRes.data);
        const formatted = [
          { name: "Active", count: res.data.Active },
          { name: "Resolved", count: res.data.Resolved },
        ];
        setData(formatted);
        setOrg(orgRes.data.branchData)
        setReviews(reviewRes.data.reviews)
        setComplainAnalysis(ratingVsMonth.data.complaintsByMonth)
        setAvgRatingAnalysis(avgRatingRes.data.avgRatingVsWeek)
        setComplainpermonth(complainVsMonth.data.complaintsByMonth)
        setComplainTypeDist(complainTypeRes.data.complaintsByType)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [companyId, location])

  useEffect(() => {
    if (reviews.length > 0) {
      const total = reviews.reduce((sum, review) => sum + review.rating, 0)
      setAvgRating((total / reviews.length).toFixed(1))
    } else {
      setAvgRating(null)
    }
  }, [reviews])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Org Section */}
      {org && (
        <div className="border p-6 rounded-xl shadow-md flex gap-4 items-center">
          <div className="bg-blue-200 text-blue-700 font-bold w-14 h-14 flex items-center justify-center rounded-full text-3xl">
            {org.branch_name?.charAt(0).toUpperCase() || "?"}
          </div>
          <div>
            <div className="text-2xl font-semibold">{org.branch_name}</div>
            <div className="text-gray-500">{org.location}</div>
            {avgRating && (
              <div className="text-yellow-600 font-medium flex items-center gap-1">
                Average Rating: {avgRating}
                <Star size={16} fill="currentColor" />
              </div>
            )}
            <p className="mt-2 text-sm text-gray-600">{org.shortBio}</p>
          </div>
        </div>
      )}

      {/* Scroll Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => scrollToSection("about")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors"
        >
          About
        </button>
        <button
          onClick={() => scrollToSection("reviews")}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Read Reviews
        </button>
        <Link
          to={`/write-review/${companyId}/${location}`}
          replace
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Write a Review
        </Link>
      </div>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-16 px-4 bg-gray-100 rounded-xl shadow-inner"
      >
        <h2 className="text-2xl font-bold mb-4">About {org?.branch_name}</h2>
        <p className="text-gray-700 leading-relaxed">
          {org?.longBio || "No description available."}
        </p>
      </section>

      {/* Charts */}
      <div className="flex w-full mb-6">
      <div className="w-full md:w-1/2 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Monthly number of Rating Analysis</h2>
        <ComplaintsBarChart data={complainAnalysis} />
      </div>

      <div className="w-full md:w-1/2 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Rating Analysis</h2>
        <RatingLineChart data={avgRatingAnalysis} />
      </div>
</div>
      <div className="w-full md:w-1/1 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Complain Trend Over Time</h2>
        <ComplainPerMonthChart data={complainpermonth} />
      </div>

      <div className="flex w-full mb-6">
  {/* Complaint Type Pie Chart */}
  <div className="w-full md:w-1/2 p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Complaint Type Distribution</h2>
    <ComplaintTypePieChart data={complainTypeDist} />
  </div>

  {/* Status Distribution Bar Chart */}
  <div className="w-full md:w-1/2 p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Status Distribution</h2>
    <StatusChart data={data} />
  </div>
</div>


      {/* Reviews Section */}
      <section id="reviews" ref={reviewRef} className="py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <Link
            to={`/write-review/${companyId}/${location}`}
            replace
            className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
          >
            Write a review
          </Link>
        </div>

        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-200 text-green-700 font-bold w-10 h-10 flex items-center justify-center rounded-full text-xl">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="font-medium">{review.name}</div>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <div className="flex gap-1 text-yellow-500">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default OrgPage


// import React, { useState, useEffect, useRef } from "react"
// import { Link, useParams } from "react-router-dom"
// import { Star } from "lucide-react"
// import axios from "axios"
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   LineChart,
//   Line
// } from 'recharts';

// const OrgPage = () => {
//   const { companyId, location } = useParams();
//   const [org, setOrg] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [complainAnalysis, setComplainAnalysis] = useState([]);
//   const [avgRating, setAvgRating] = useState(null);
//   const [avgRatingAnalysis, setAvgRatingAnalysis] = useState([]);

//   const aboutRef = useRef(null);
//   const reviewRef = useRef(null);

//   const scrollToSection = (section) => {
//     const targetRef = section === "about" ? aboutRef : reviewRef;
//     if (targetRef.current) {
//       targetRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const ComplaintsBarChart = ({ data }) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return <p className="text-gray-500">No complaint data available.</p>;
//     }

//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="count" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     );
//   };

//   const RatingLineChart = ({ data }) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return <p className="text-gray-500">No reviews available</p>;
//     }

//     const roundedData = data.map(item => ({
//       ...item,
//       avgRating: parseFloat(item.avgRating.toFixed(2)),
//     }));

//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={roundedData}>
//           <CartesianGrid strokeDasharray="5 5" />
//           <XAxis dataKey="week" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="avgRating" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const orgRes = await axios.get(`http://localhost:8086/company/${companyId}/${location}`);
//         const reviewRes = await axios.get(`http://localhost:8086/review/${companyId}/${location}`);
//         const complainVsMonth = await axios.get(`http://localhost:8086/complainAnalysis/${companyId}/${location}`);
//         const avgRatingRes = await axios.get(`http://localhost:8086/avgRatingAnalysis/${companyId}/${location}`);

//         setOrg(orgRes.data.branchData);
//         setReviews(reviewRes.data.reviews);
//         setComplainAnalysis(complainVsMonth.data.complaintsByMonth);
//         setAvgRatingAnalysis(avgRatingRes.data.avgRatingVsWeek);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, [companyId, location]);

//   useEffect(() => {
//     if (reviews.length > 0) {
//       const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//       setAvgRating((total / reviews.length).toFixed(1));
//     } else {
//       setAvgRating(null);
//     }
//   }, [reviews]);

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-10">
//       {org && (
//         <div className="border p-6 rounded-xl shadow-md flex gap-4 items-center">
//           <div className="bg-blue-200 text-blue-700 font-bold w-14 h-14 flex items-center justify-center rounded-full text-3xl">
//             {(org.branch_name && org.branch_name.charAt(0).toUpperCase()) || "?"}
//           </div>
//           <div>
//             <div className="text-2xl font-semibold">{org.branch_name}</div>
//             <div className="text-gray-500">{org.location}</div>
//             {avgRating && (
//               <div className="text-yellow-600 font-medium flex items-center gap-1">
//                 Average Rating: {avgRating}
//                 <Star size={16} fill="currentColor" />
//               </div>
//             )}
//             <p className="mt-2 text-sm text-gray-600">{org.shortBio}</p>
//           </div>
//         </div>
//       )}

//       <div className="flex space-x-4">
//         <button
//           onClick={() => scrollToSection("about")}
//           className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           About
//         </button>
//         <button
//           onClick={() => scrollToSection("reviews")}
//           className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           Read Reviews
//         </button>
//         <Link
//           to={`/write-review/${companyId}/${location}`}
//           replace={true}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
//         >
//           Write a Review
//         </Link>
//       </div>

//       <section id="about" ref={aboutRef} className="py-16 px-4 bg-gray-100 rounded-xl shadow-inner">
//         <h2 className="text-2xl font-bold mb-4">About {org?.branch_name}</h2>
//         <p className="text-gray-700 leading-relaxed">{org?.longBio || "No description available."}</p>
//       </section>

//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">Monthly Complaints Analysis</h2>
//         <ComplaintsBarChart data={complainAnalysis} />
//       </div>

//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">Rating Analysis</h2>
//         <RatingLineChart data={avgRatingAnalysis} />
//       </div>

//       <section id="reviews" ref={reviewRef} className="py-16 px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold">Customer Reviews</h2>
//           <Link
//             to={`/write-review/${companyId}/${location}`}
//             replace={true}
//             className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
//           >
//             Write a review
//           </Link>
//         </div>

//         <div className="space-y-6">
//           {reviews.length === 0 ? (
//             <p className="text-gray-500">No reviews yet.</p>
//           ) : (
//             reviews.map((review, idx) => (
//               <div key={idx} className="bg-white rounded-lg shadow-md p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="bg-green-200 text-green-700 font-bold w-10 h-10 flex items-center justify-center rounded-full text-xl">
//                     {review.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="font-medium">{review.name}</div>
//                 </div>
//                 <p className="text-gray-700 mb-2">{review.comment}</p>
//                 <div className="flex gap-1 text-yellow-500">
//                   {Array(review.rating).fill().map((_, i) => (
//                     <Star key={i} size={18} fill="currentColor" />
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default OrgPage;