import React, { useEffect, useState } from 'react';
import ComplaintPost from './ComplaintPost';
import { useParams } from "react-router-dom";
import { MessageSquare, RefreshCw, Filter, ThumbsUp, Calendar, Clock, Eye, ChevronUp, ChevronDown, Search } from 'lucide-react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const privateID = useParams().privateID;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/${privateID}/postListBranch`);
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [privateID]);

  // Filtered and sorted posts
  const filteredPosts = posts
    .filter(post => {
      if (searchTerm && !post.postText?.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !post.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      if (activeFilter === 'all') return true;
      if (activeFilter === 'with-image') return !!post.imageUrl;
      if (activeFilter === 'no-image') return !post.imageUrl;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return -1;
      if (sortOrder === 'oldest') return 1;
      if (sortOrder === 'most-liked') return (b.likes || 0) - (a.likes || 0);
      return 0;
    });

  // Theme colors
  const colors = {
    primary: 'bg-indigo-600 hover:bg-indigo-700',
    primaryLight: 'bg-indigo-50',
    secondary: 'bg-pink-600 hover:bg-pink-700',
    accent: 'bg-amber-500 hover:bg-amber-600',
    success: 'bg-emerald-500 hover:bg-emerald-600',
    error: 'bg-rose-500 hover:bg-rose-600',
    warning: 'bg-orange-500 hover:bg-orange-600',
  };

  const filterButtons = [
    { id: 'all', label: 'All Posts', color: colors.primary },
    { id: 'with-image', label: 'With Images', color: colors.secondary },
    { id: 'no-image', label: 'Text Only', color: colors.accent },
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest First', icon: <Clock size={14} /> },
    { id: 'oldest', label: 'Oldest First', icon: <Calendar size={14} /> },
    { id: 'most-liked', label: 'Most Liked', icon: <ThumbsUp size={14} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto h-screen pt-6 px-4 md:px-6 lg:px-8 ml-[15%] mt-[-7%]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer complaints</h1>
          <p className="text-sm text-gray-500 mt-1">View complaints raised for you</p>
        </div>
        <button 
          onClick={fetchPosts}
          className={`flex items-center px-4 py-2 ${colors.primary} text-white rounded-md transition-all transform hover:scale-105 text-sm`}
        >
          <RefreshCw size={16} className="mr-2 animate-spin-slow" />
          Refresh
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center text-sm font-medium transition-colors"
          >
            <Filter size={16} className="mr-2 text-gray-600" />
            Filters
            {showFilters ? (
              <ChevronUp size={16} className="ml-2 text-gray-600" />
            ) : (
              <ChevronDown size={16} className="ml-2 text-gray-600" />
            )}
          </button>
        </div>
        
        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm animate-fade-in mb-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by:</h3>
              <div className="flex flex-wrap gap-2">
                {filterButtons.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      activeFilter === filter.id 
                        ? `${filter.color} text-white` 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sort by:</h3>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSortOrder(option.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center ${
                      sortOrder === option.id 
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.icon}
                    <span className="ml-1">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Posts Container */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-rose-500 text-2xl">!</span>
            </div>
            <p className="text-gray-700 text-center">{error}</p>
            <button 
              onClick={fetchPosts}
              className={`mt-4 px-4 py-2 ${colors.primary} text-white rounded-md transition-all transform hover:scale-105`}
            >
              Try Again
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <MessageSquare size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No complaints found</h3>
            <p className="text-gray-500 text-center mt-1">
              {searchTerm ? "Try different search terms or filters" : "When customers post complaints, they'll appear here"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 max-h-[calc(100vh-270px)] overflow-y-auto">
            {filteredPosts.map((post, index) => (
              <div key={index} className="hover:bg-indigo-50 transition-colors group">
                <ComplaintPost
                  customerEmail={post.customerEmail}
                  postText={post.postText}
                  imageUrl={post.imageUrl}
                  avatar={`https://api.dicebear.com/6.x/micah/svg?seed=${post.customerEmail || 'Anonymous'}`}
                  initials={post.customerEmail?.[0]?.toUpperCase() || "U"}
                  date="27 March 2025"
                  likes={Math.floor(Math.random() * 100)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Status Bar */}
      {!loading && !error && filteredPosts.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 flex justify-between items-center px-2">
          <span className="flex items-center">
            <Eye size={16} className="mr-1 text-indigo-400" /> 
            Showing {filteredPosts.length} of {posts.length} complaint{posts.length !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center">
            <Clock size={16} className="mr-1 text-indigo-400" />
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      )}
      
      {/* Floating Action Button */}
      <button className={`fixed bottom-6 right-6 w-12 h-12 rounded-full ${colors.secondary} text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110`}>
        <RefreshCw size={18} onClick={fetchPosts} />
      </button>
    </div>
  );
};

export default PostList;