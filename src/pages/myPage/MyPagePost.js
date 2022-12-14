import React from 'react';
import Navbar from 'components/navbar/Navbar';
import MenuBar from 'components/mypage/MenuBar';
import Footer from 'components/footer/Footer';
import { LikePost, WritePost } from 'components/mypage/Post';

function MyPagePost({ writePost, likePost }) {
  return (
    <>
      <div className="w-full">
        <Navbar />
        <div className="flex justify-center mt-20">
          <MenuBar />
          <div className="w-3/6">
            <WritePost writePost={writePost} />
            <LikePost likePost={likePost} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyPagePost;
