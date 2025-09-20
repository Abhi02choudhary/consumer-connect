import React, { useState } from 'react';
import avtar from "../assets/woman.png";
const ComplaintPost = ({
  customerEmail,
  postText,
  imageUrl,
  avatar,
  initials,
  date,
  likes: initialLikes
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <div className="flex items-center mb-2">
        <img
          src={avtar}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="font-semibold text-black">{customerEmail}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      <p className="text-gray-800 mb-2">{postText}</p>

      <img
        src={imageUrl}
        alt="Post"
        className="w-full h-64 object-contain rounded-lg mb-2"
      />

      <button
        onClick={handleLike}
        className={`flex items-center space-x-2 text-sm ${
          liked ? 'text-blue-600' : 'text-yellow-500'
        }`}
      >
        <span>👍</span>
        <span>{likes} likes</span>
      </button>
    </div>
  );
};

export default ComplaintPost;