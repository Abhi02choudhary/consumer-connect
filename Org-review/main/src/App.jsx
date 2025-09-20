import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CompanyList from "./pages/CompanyList"
import CompanyProfile from "./pages/ComapanyProfile"
import WriteReview from "./pages/WriteReview"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/company/:companyId/:location" element={<CompanyProfile />} />
        <Route path="/write-review/:companyId/:location" element={<WriteReview />} />
      </Routes>
    </Router>
  )
}

export default App