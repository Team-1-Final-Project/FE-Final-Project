import React, { useState } from 'react';
import Navbar from 'components/navbar/Navbar';
import MenuBar from 'components/mypage/MenuBar';
import Footer from 'components/footer/Footer';
import Badge from 'components/mypage/Badge';
import ImageSetting from 'components/mypage/ImageSetting';
import NicknameSetting from 'components/mypage/NicknameSetting';
import { useInput } from 'hooks/useInput';
import { apis } from 'api/api';
import Prepare from 'components/prepare/Prepare';
import swal from 'sweetalert';

function MyPageSetting({ myBadge }) {
  const badgeSetting = true;
  const profileImage = sessionStorage.getItem('profileImage');
  const defaultNickname = sessionStorage.getItem('nickname');

  const [repBadge, setRepBadge] = useState();
  const [repImage, setRepImage] = useState(profileImage);
  const [nickname, setNickname, nicknameChange] = useInput(defaultNickname);

  let formData = new FormData();

  const deleteImage = () => {
    formData.set('profileImage', null);
    apis.updateProfileImage(formData).then((res) => {
      setRepImage(res.profileImage);
      sessionStorage.setItem('profileImage', res.profileImage);
    });
  };

  const changeImage = (e) => {
    if (e.target.files[0]) {
      formData.set('profileImage', e.target.files[0]);
      apis.updateProfileImage(formData).then((res) => {
        setRepImage(res.profileImage);
        sessionStorage.setItem('profileImage', res.profileImage);
      });
    }
  };

  const updateNickname = (e) => {
    if (nickname?.length <= 8) {
      apis.updateNickname(e).then((res) => {
        setNickname('');
        sessionStorage.setItem('nickname', res.nickname);
      });
    } else {
      swal('닉네임을 8글자 이하로 입력해주세요.');
    }
  };

  return (
    <>
      <div className="w-full">
        <Navbar />
        <div className="flex justify-center mt-20">
          <MenuBar />
          <div className="w-3/6">
            <div className="flex flex-col">
              <div className="m-4 text-xl font-bold">닉네임 설정</div>
              <div>
                <NicknameSetting
                  updateNickname={updateNickname}
                  nicknameChange={nicknameChange}
                  nickname={nickname}
                  setNickname={setNickname}
                />
              </div>
              <div>
                <div className="m-4 text-xl font-bold">대표 이미지 설정</div>
                <div>
                  <ImageSetting
                    repImage={repImage}
                    changeImage={changeImage}
                    deleteImage={deleteImage}
                  />
                </div>
              </div>
              <div className="m-4 text-xl font-bold">대표 뱃지 설정</div>
              <div>
                <Prepare />

                {/* <Badge myBadge={myBadge} badgeSetting={badgeSetting} />
                 */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyPageSetting;
