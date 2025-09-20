


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const CompanyAvatar = ({ name }) => {
  const initial = name.charAt(0);
  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-orange-500"];
  const colorIndex = name.length % colors.length;
  return (
    <div className={`${colors[colorIndex]} text-white font-bold rounded-lg w-12 h-12 flex items-center justify-center text-xl`}>
      {initial}
    </div>
  );
};

const CompanyList = () => {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgRes = await axios.get("http://localhost:8086/");
        const branches = orgRes.data;
        
        const enrichedBranches = await Promise.all(
          branches.map(async (branch) => {
            try {
              const newlocation = branch.location.trim().replace(/,/g, "").replace(/\s+/g, "");
              const companyId=branch.branch_name;
              const reviewRes = await axios.get(`http://localhost:8086/review/${branch.branch_name}/${newlocation}`);
              const reviews = reviewRes.data.reviews || [];

              const avgRating =
                reviews.length > 0
                  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                  : null;

              return {
                ...branch,
                averageRating: avgRating,
                reviewCount: reviews.length,
                cleanlocation: newlocation,
              };
            } catch (error) {
              console.error(`Error fetching reviews for ${branch.branch_name}:`, error);
              return { ...branch, averageRating: null, reviewCount: 0 };
            }
          })
        );

        setOrgs(enrichedBranches);
      } catch (error) {
        console.error("Error fetching orgs:", error);
      }
    };

    fetchData();
  }, []);

  const handleCompanyClick = (companyId, newlocation) => {
    
    navigate(`/company/${companyId}/${newlocation}`);
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto p-4">
        {orgs.length === 0 ? (
          <p className="text-center text-gray-500">No organizations found.</p>
        ) : (
          orgs.map((branch) => (
            <div
              key={branch._id}
              onClick={() => handleCompanyClick(branch.branch_name,branch.cleanlocation)}
              className="cursor-pointer w-full"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <CompanyAvatar name={branch.branch_name} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold text-gray-800">{branch.branch_name}</h2>
                        <div className="flex items-center">
                          {branch.averageRating && (
                            <div className="text-yellow-600 font-medium flex items-center gap-1">
                              <Star size={16} fill="currentColor" />
                              {branch.averageRating}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{branch.location}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">{branch.shortBio}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{branch.reviewCount}</span> reviews
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyList;