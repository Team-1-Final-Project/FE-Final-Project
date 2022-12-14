import React from 'react';
import { useNavigate } from 'react-router-dom';

const Review = ({ author, content, id, createdAt, reviewThumbImage }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer hover:scale-[1.02] ease-in duration-300 shadow-lg shadow-[#d2d2d2] mb-10 outline outline-lightGrayColor outline-1 rounded"
      onClick={() => navigate(`/review/detail/${id}`)}
    >
      <div className="w-64">
        {reviewThumbImage ? (
          <img
            src={reviewThumbImage}
            alt="reviewThumbImage"
            className="w-72 h-56 object-cover mb-2 rounded"
          />
        ) : (
          <div className="w-72 h-56 mb-2" />
        )}
        <p className="h-20 p-2 line-clamp-3">{content}</p>
        <div className="flex mt-2 px-2 py-5">
          <img
            src={author.profileImage}
            alt="writerProfile"
            className="w-9 h-9 rounded-full object-cover mr-2"
          />
          <div className="flex flex-col">
            <span className="text-sm">{author.nickname}</span>
            <span className="text-xs">{createdAt.split('T')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
