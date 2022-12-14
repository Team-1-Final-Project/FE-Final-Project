import React from 'react';
import MeetingDetail from 'components/meeting/detail/MeetingDetail';
import UserInfoCard from 'components/meeting/detail/UserInfoCard';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from 'components/navbar/Navbar';
import { useEffect } from 'react';
import { apis } from 'api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Layout } from 'utils/styles/GlobalStyles';
import ReviewList from 'components/meeting/review/ReviewList';
import swal from 'sweetalert';
import Footer from 'components/footer/Footer';
import { BsFillPencilFill } from 'react-icons/bs';
import MeetingCommentList from 'components/meeting/comment/MeetingCommentList';
import Close from 'assets/images/Close.png';
import CommentModal from 'components/modal/CommentModal';

const MeetingDetailPage = () => {
  const navigate = useNavigate();
  const loginState = sessionStorage.getItem('Access_token');

  const [reviews, setReviews] = useState('');
  const [modal, setModal] = useState(false);

  //여기부터 참여하기 파트입니다
  const [applyState, setApplyState] = useState(false);
  const [applyerData, setApplyerData] = useState([]);
  const email = sessionStorage.getItem('email');

  useEffect(() => {
    let finder = applyerData.find((item) => item.email === email); //finder는 참여자데이터에 내이메일을 찾아주는 역할을합니다.
    finder ? setApplyState(true) : setApplyState(false); //finder가 존재한다면, 즉 참여자명단에 내가 포함되어 있는지에 따라 참여버튼을 변경합니다.
  }, [applyerData, email]);

  const onClickApplyHandler = () => {
    loginState
      ? applyState
        ? apis
            .cancelMeeting(params)
            .then((res) => {
              setApplyState(false);
            })
            .catch((err) => console.log(err))
        : apis
            .applyMeeting(params)
            .then((res) => {
              setApplyState(true);
              res.data.error && swal(res.data.error.message);
            })
            .catch((err) => console.log(err))
      : swal('로그인이 필요한 기능입니다.');
  };

  //여기부터 수정하기 파트입니다

  let params = useParams().id; // URL로 부터 params를 따옵니다.

  const [detailData, setDetailData] = useState(); //detailData는 모임 상세정보 데이터입니다.

  useEffect(() => {
    apis
      .getMeeting(params)
      .then((res) => {
        setDetailData(res.data.data);
        setApplyerData(res.data.data.crews);
      })
      .catch((err) => console.log('err', err, params));
  }, [applyState]);

  const onUpdateHandler = () => {
    if (
      applyerData.length > 1 &&
      (detailData.meetingStatus.code === 'CAN_JOIN' ||
        detailData.meetingStatus.code === 'COMPLETE_JOIN')
    ) {
      swal('참여인원이 2명 이상일 경우 수정이 불가능합니다.');
      return;
    }

    if (
      detailData.meetingStatus.code === 'PASS_DEADLINE' ||
      detailData.meetingStatus.code === 'COMPLETED_MEETING'
    ) {
      swal('모집기간에만 수정할 수 있습니다.');
      return;
    }

    navigate(`/meeting/update/${params}`);
  };
  //여기까지 수정하기 파트입니다

  //여기부터 삭제하기 파트입니다
  const onClickDelete = () => {
    apis
      .deleteMeeting(params)
      .then((res) => {
        swal(res.data.data);
        navigate('/meeting');
      })
      .catch((err) => console.log(err));
  };

  //여기부터 모임 참여 유저 조회 파트입니다.

  useEffect(() => {
    apis
      .getMeetingUser(params)
      .then((res) => {
        // setApplyerData(res.data.data);
        // console.log('applyer', res.data.data);
      })
      .catch((err) => console.log('err', err));
  }, [applyState]);

  //모임 후기
  useEffect(() => {
    apis
      .getMeetingReviewList(params)
      .then((res) => setReviews(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  let reviewWrite = reviews && reviews.find((review) => review.author.email === email);
  //버튼관련 파트입니다
  //모집기간이 지날경우 모집마감된 모임이라고 표시해줍니다.

  //유저카드 관련 파트입니다.

  return (
    <Layout>
      <Container>
        <Navbar />
        <div className="flex justify-center py-10">
          <MeetingDetail data={detailData} />
        </div>
        <ButtonLayout>
          {applyerData &&
            applyerData.map((item) => {
              return item.email === email ? (
                <Button
                  onClick={() => {
                    setModal(true); // navigate(`/meeting/Comment/${params}`);
                  }}
                >
                  소통의 장
                </Button>
              ) : null;
            })}
          {modal ? (
            <CommentModal
              children={
                <div className="w-full h-full flex flex-col items-center">
                  <button className="absolute right-5 top-5" onClick={() => setModal(false)}>
                    <StyledImg className="h-8 w-8" src={Close} />
                  </button>
                  <MeetingCommentList />
                </div>
              }
              onConfirm={() => setModal(false)}
            />
          ) : null}

          {detailData &&
            (detailData.meetingStatus.code === 'CAN_JOIN' ||
              detailData.meetingStatus.code === 'COMPLETE_JOIN') &&
            detailData.admin.email !== email &&
            applyState && (
              <>
                <Button
                  onClick={() => {
                    onClickApplyHandler();
                  }}
                >
                  참여취소
                </Button>
              </>
            )}

          {detailData &&
            detailData.meetingStatus.code === 'CAN_JOIN' &&
            detailData.admin.email !== email &&
            !applyState && (
              <Button
                onClick={() => {
                  onClickApplyHandler();
                }}
              >
                참여하기
              </Button>
            )}
          {detailData &&
            detailData.meetingStatus.code !== 'CAN_JOIN' &&
            detailData.admin.email !== email &&
            !applyState && (
              <DisabledButton type="button" disabled>
                {detailData.meetingStatus.message}
              </DisabledButton>
            )}
          {detailData && detailData.admin.email === email && (
            <>
              <Button onClick={onUpdateHandler}>수정하기</Button>
              <Button
                onClick={() => {
                  email === detailData.admin.email ? onClickDelete() : swal('접근권한이 없습니다'); //작성자가 아닐경우에는 입장못하게 해야함.
                }}
              >
                삭제하기
              </Button>
            </>
          )}
          {detailData &&
            applyState &&
            detailData.meetingStatus.code === 'COMPLETED_MEETING' &&
            !reviewWrite && (
              <button
                className="flex items-center justify-center h-10 px-4 border rounded-full min-w-max text-defaultColor border-defaultColor hover:transition hover:duration-100 hover:scale-105"
                onClick={() => navigate(`/review/create/${params}`)}
              >
                <BsFillPencilFill className="mr-2" />
                후기 작성하기
              </button>
            )}
        </ButtonLayout>

        <div>
          <h1 className="py-10 ml-20 text-3xl">참여중인 멤버</h1>
          <div className="flex flex-wrap px-20">
            {applyerData &&
              applyerData.map((item, idx) => {
                if (!idx)
                  return (
                    <UserInfoCard
                      position={'리더'}
                      nickname={item.nickname}
                      email={item.email}
                      profileImage={item.profileImage}
                      badgeList={item.badgeList}
                    />
                  );
                else
                  return (
                    <UserInfoCard
                      position={'참여자'}
                      nickname={item.nickname}
                      email={item.email}
                      profileImage={item.profileImage}
                      badgeList={item.badgeList}
                    />
                  );
              })}
          </div>
          {reviews.length > 0 && (
            <>
              <h1 className="mt-10 ml-20 text-3xl">모임 후기</h1>
              <ReviewList reviewData={reviews} />
            </>
          )}
        </div>
        <Footer />
      </Container>
    </Layout>
  );
};

export default MeetingDetailPage;

const ButtonLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
`;

const Button = styled.button`
  padding: 0px 10px;
  height: 40px;
  width: 120px;
  background-color: #3cc2df;
  color: #ffffff;
  border-radius: 40px;
  margin-right: 20px;
  transition: 100ms transform;
  &:hover {
    transform: scale(1.05);
  }
  float: right;
`;

const DisabledButton = styled.button`
  padding: 0px 10px;
  height: 40px;
  width: 120px;
  background-color: #cccccc;
  color: rgba(145, 148, 163, 1);
  border-radius: 40px;
  margin-right: 20px;
  float: right;
`;
const StyledImg = styled.img`
  filter: opacity(0.5) drop-shadow(0 0 0 #ffffff);
`;
