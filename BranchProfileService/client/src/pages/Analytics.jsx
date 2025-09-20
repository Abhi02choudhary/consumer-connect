import React, { useEffect, useState } from 'react'
import axios from 'axios'
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

const AnalyticsSummary = () => {
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [reviews, setReviews] = useState([])
  const [complainAnalysis, setComplainAnalysis] = useState([])
  const [avgRatingAnalysis, setAvgRatingAnalysis] = useState([])
  const [complainPerMonth, setComplainPerMonth] = useState([])
  const [complainTypeDist, setComplainTypeDist] = useState([])
  const [data, setData] = useState([])

  const privateID = window.location.pathname.split('/')[1]

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
          <Line type="monotone" dataKey="avgRating" stroke="#2196F3" activeDot={{ r: 8 }} />
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
          <Line type="monotone" dataKey="count" stroke="#2196F3" activeDot={{ r: 8 }} />
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
          <Bar dataKey="count" fill="#3182ce" barSize={40}>
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
    )
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const ComplaintTypePieChart = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-500">No complaint type data available.</p>
    }
    const formattedData = data.map(item => ({
      type: item.type,
      count: item.count
    }))
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8084/analytics/${privateID}`)
        const companyName = res.data.branch_name
        const location = res.data.cleanlocation
        setCompany(companyName)
        setLocation(location)
        console.log(companyName)
        console.log(res)

        const [
          orgRes,
          reviewRes,
          ratingVsMonth,
          avgRatingRes,
          complainVsMonth,
          complainTypeRes,
          statusData
        ] = await Promise.all([
          axios.get(`http://localhost:8086/company/${companyName}/${location}`),
          axios.get(`http://localhost:8086/review/${companyName}/${location}`),
          axios.get(`http://localhost:8086/complainAnalysis/${companyName}/${location}`),
          axios.get(`http://localhost:8086/avgRatingAnalysis/${companyName}/${location}`),
          axios.get(`http://localhost:8086/monthvscom/${companyName}/${location}`),
          axios.get(`http://localhost:8086/authStatusStats/${companyName}/${location}`),
          axios.get(`http://localhost:8086/statusAnalysis/${companyName}/${location}`)
        ])

        setReviews(reviewRes.data.reviews)
        setComplainAnalysis(ratingVsMonth.data.complaintsByMonth)
        setAvgRatingAnalysis(avgRatingRes.data.avgRatingVsWeek)
        setComplainPerMonth(complainVsMonth.data.complaintsByMonth)
        setComplainTypeDist(complainTypeRes.data.complaintsByType)
        const formatted = [
          { name: "Active", count: statusData.data.Active },
          { name: "Resolved", count: statusData.data.Resolved }
        ]
        setData(formatted)
      } catch (err) {
        console.error('Error fetching analytics data:', err)
      }
    }
    fetchData()
  }, [privateID])

  return (
    <div className="p-4 w-full overflow-hidden ml-[-200px]">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="p-2 bg-white shadow-lg rounded-lg h-73 overflow-hidden">
      <h2 className="text-base font-semibold mb-2">Monthly number of Rating Analysis</h2>
      <ComplaintsBarChart data={complainAnalysis} />
    </div>

    <div className="p-2 bg-white shadow-lg rounded-lg h-73 overflow-hidden">
      <h2 className="text-base font-semibold mb-2">Rating Analysis</h2>
      <RatingLineChart data={avgRatingAnalysis} />
    </div>

    <div className="p-2 bg-white shadow-lg rounded-lg h-73 overflow-hidden">
      <h2 className="text-base font-semibold mb-2">Complain Trend Over Time</h2>
      <ComplainPerMonthChart data={complainPerMonth} />
    </div>

    <div className="p-2 bg-white shadow-lg rounded-lg h-73 overflow-hidden">
      <h2 className="text-base font-semibold mb-2">Status Distribution</h2>
      <StatusChart data={data} />
    </div>
  </div>
</div>

  );
  
}
export default AnalyticsSummary