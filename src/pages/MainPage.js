import React, { useState, useEffect } from 'react';
import Navbar from 'components/navbar/ Navbar';
import Dailymission from 'components/main/Dailymission';
import { apis } from 'api/api';
import TopPost from 'components/main/TopPost';
import Gather from 'components/main/Gather';
// import LoginGoogle from 'components/login/LoginGoogle';
import Banner from 'components/banner/Banner';
import Footer from 'components/footer/Footer';

function MainPage() {
  const [mission, setMission] = useState();
  const [post, setPost] = useState();
  const [gather, setGather] = useState();

  useEffect(() => {
    apis.getMainPage().then((res) => {
      setMission(res[0].mission);
      setPost(res[0].post);
      setGather(res[0].gather);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center w-full">
      <Navbar />
      <Banner />
      <Dailymission mission={mission} />
      <TopPost post={post} />
      <Gather gather={gather} />
      <Footer />
      {/* <LoginGoogle /> */}
    </div>
  );
}

export default MainPage;
