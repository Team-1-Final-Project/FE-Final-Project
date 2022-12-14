import React, { useState, useEffect } from 'react';
import Navbar from 'components/navbar/Navbar';
import Dailymission from 'components/main/Dailymission';
import { apis } from 'api/api';
import TopPost from 'components/main/TopPost';
import Meeting from 'components/main/Meeting';
import Banner from 'components/banner/Banner';
import Footer from 'components/footer/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { Container, Layout } from 'utils/styles/GlobalStyles';
import PostingButton from 'components/button/PostingButton';

function MainPage() {
  const [mission, setMission] = useState();
  const [clearCount, setClearCount] = useState(0);
  const [hitBoard, setHitBoard] = useState();
  const [meeting, setMeeting] = useState();

  const loginState = sessionStorage.getItem('Access_token');

  useEffect(() => {
    apis.getMainMission().then((res) => {
      setMission(res.data);
      setClearCount(res.data.clearCount);
    });
    apis.getMainMeeting().then((res) => {
      setMeeting(res.data);
    });
    apis.getMainHitBoard().then((res) => {
      setHitBoard(res.data);
    });
  }, []);

  const checkDailyMission = () => {
    apis.postDailiyMissionCheck().then((res) => {
      if (res.success == true) {
        swal('미션을 성공하였습니다.');
        setClearCount(clearCount + 1);
      } else {
        swal(res.error.message);
      }
    });
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <Layout>
        <Container>
          <Navbar />
          <Banner />
          <Dailymission
            mission={mission}
            checkDailyMission={checkDailyMission}
            clearCount={clearCount}
          />
          <TopPost hitBoard={hitBoard} />
          <Meeting meeting={meeting} />
          <Footer />
          {loginState && <PostingButton />}
        </Container>
      </Layout>
      {/* <LoginGoogle /> */}
    </div>
  );
}

export default MainPage;
