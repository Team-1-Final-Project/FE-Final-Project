import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { BsTrash, BsPencil } from 'react-icons/bs';
import Navbar from 'components/navbar/Navbar';
import CommentList from 'components/comment/CommentList';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getDetailPost, getPostList } from 'redux/modules/postSlice';
import { getHeart, putChangeHeart } from 'redux/modules/heartSlice';
import { Container, Layout } from 'utils/styles/GlobalStyles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from 'components/footer/Footer';

// import { BsThreeDotsVertical, BsPencilSquare, BsTrash } from 'react-icons/bs';
const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailPost(params.id));
    dispatch(getHeart(params.id));
  }, [dispatch, params.id]);

  const data = useSelector((state) => state.post.detailPost.data);

  const heartData = useSelector((state) => state.heart.heart);

  const email = sessionStorage.getItem('email');

  const loginState = sessionStorage.getItem('Access_token');

  const [commentCount, setCommentCount] = useState(data?.commentNums);

  const toastifyHandler = () => {
    toast.error('로그인이 필요합니다.');
  };

  useEffect(() => {
    setCommentCount(data?.commentNums);
  }, [data]);

  return (
    <Layout>
      <Container>
        <Navbar />
        <ContainerStyle>
          <TopWrapStyle>
            <div className="tagList">
              {data?.tagBoards.map((tag) => {
                return (
                  <span key={tag.id} className="tag">
                    {`#${tag.tagName}`}{' '}
                  </span>
                );
              })}
            </div>
            <span className="date">{data?.createdAt.substr(0, 10)}</span>
          </TopWrapStyle>

          <ContentWrapStyle>
            {data?.boardImage && (
              <ImageStyled>
                <img className="boardImg" src={data?.boardImage} alt="img" />
              </ImageStyled>
            )}

            <div className="titleContentWrap">
              <TitleStyle>{data?.title}</TitleStyle>
              <ContentStyle>{data?.content}</ContentStyle>
            </div>
          </ContentWrapStyle>

          <IconButtonWrapStyle>
            <IconContainerstyle>
              <div
                className="iconWrap"
                onClick={(e) => {
                  e.stopPropagation();
                  if (loginState) {
                    dispatch(putChangeHeart(data?.boardId)).then(() => {
                      dispatch(getHeart(params.id));
                      dispatch(getDetailPost(data?.boardId));
                    });
                  } else {
                    toastifyHandler();
                  }
                }}
              >
                {heartData ? <AiFillHeart style={{ color: '#3cc2df' }} /> : <AiOutlineHeart />}
                <span className="count">{data?.heartBoardNums}</span>
              </div>
              <div
                className="iconWrap"
                onClick={(e) => {
                  navigate(`/communitydetail/${data?.boardId}`);
                  e.stopPropagation();
                }}
              >
                <AiOutlineComment />
                <span className="count">{commentCount}</span>
              </div>
            </IconContainerstyle>
            <ProfileButtonWrapStyle>
              <ContentsWrapStyle>
                <div className="profileIconWrap">
                  <div className="profileWrap">
                    <ProfileStyle>
                      <img className="img" src={data?.profileImage} alt="img" />
                    </ProfileStyle>
                    <NameStyle>{data?.writerName}</NameStyle>
                  </div>
                </div>
              </ContentsWrapStyle>

              {data?.email === email ? (
                <ButtonStyled>
                  <BsPencil
                    className="button cursor-pointer"
                    onClick={() => {
                      navigate(`/updatepost/${params.id}`);
                    }}
                  />
                  <BsTrash
                    className="button cursor-pointer"
                    onClick={() => {
                      dispatch(deletePost(params.id)).then(() => navigate('/community'));
                    }}
                  />
                </ButtonStyled>
              ) : null}
            </ProfileButtonWrapStyle>
          </IconButtonWrapStyle>
        </ContainerStyle>
        <CommentList
          commentListData={data?.commentResponseDtoList}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
        />
        <Footer />
      </Container>
    </Layout>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 2em;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  outline-color: #eaecee;

  @media (max-width: 650px) {
    min-width: 400px;
  }
`;

const ImageStyled = styled.div`
  border-radius: 10px;
  overflow: hidden;
  // max-width: 500px;
  width: 50%;
  height: 50%;
  min-width: 250px;
  min-height: 150px;

  .boardImg {
    width: 100%;
    height: 100%;
    /* max-height: 200px; */
    overflow: hidden;
    object-fit: cover;
  }
  @media (max-width: 650px) {
    margin: auto;
    margin-bottom: 10px;
  }
`;

const TopWrapStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .tagList {
    width: 70%;
  }
  .tag {
    /* width: max-content; */
    margin-bottom: 10px;
    padding: 0px 5px;
    font-size: 12px;
    color: #3cc2df;
    background-color: #f3f4f5;
    border: 1px solid #f3f4f5;
    border-radius: 20px;
    margin-right: 5px;
    word-break: keep-all;
    white-space: normal;
  }
  .date {
    color: #595f63;
    font-size: 14px;
  }
  /* .tag {
    width: max-content;
    margin-bottom: 10px;
    padding: 0px 10px;
    font-size: 14px;
    color: #3cc2df;
    background-color: #f3f4f5;
    border: 1px solid #f3f4f5;
    border-radius: 5px;
  }
  .date {
    color: #595f63;
    font-size: 14px;
  } */
`;

const ContentWrapStyle = styled.div`
  display: flex;
  flex-direction: column;

  .titleContentWrap {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 650px) {
    display: block;
  }
`;

const IconButtonWrapStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const IconContainerstyle = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  color: #595f63;
  cursor: pointer;
  .iconWrap {
    display: flex;
    align-items: center;
    color: #3cc2df;
  }
  .count {
    margin-right: 10px;
    margin-left: 5px;
    color: #595f63;
  }
`;

const ButtonStyled = styled.div`
  display: flex;
  flex-direction: column;

  .button {
    margin-top: 1px;
    color: #22d3ee;
    background-color: white;
    border: 1px solid #22d3ee;
    font-size: 20px;
    width: 60px;
    height: 30px;
    padding: 5px 10px;
    border-radius: 5px;
    &:hover {
      font-size: 21px;
    }
  }
`;

const ContentsWrapStyle = styled.div`
  display: flex;
  .profileIconWrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
  }
  .profileWrap {
    display: flex;
    align-items: top;
  }
`;

const ProfileStyle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameStyle = styled.span`
  margin-left: 10px;
  color: #333;
  font-size: 12px;
  position: relative;
  top: 7px;
`;

const TitleStyle = styled.h1`
  margin-bottom: 10px;
  color: #333;
  font-size: 20px;
  font-weight: bold;
`;
const ContentStyle = styled.pre`
  margin-right: 20px;
  font-size: 16px;
  color: #595f63;
  word-break: break-all;
  white-space: pre-wrap;
  font-family: 'Pretendard-Regular';
`;

const ProfileButtonWrapStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export default PostDetail;
