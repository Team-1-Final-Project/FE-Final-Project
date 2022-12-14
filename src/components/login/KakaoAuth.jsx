//redirct uriνμ΄μ§
import { api, apis, multi } from 'api/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const KakaoAuth = () => {
  function Sse() {
    const id = sessionStorage.getItem('id');
    if (sessionStorage.getItem('id') != null) {
      const sse = new EventSource(id && `${process.env.REACT_APP_SERVER}subscribe/${id}`, {
        withCredentials: true,
      });

      sse.addEventListener('message', function (e) {
        const data = JSON.parse(e.data);
        toast('π ' + data.content, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
      sse.onerror = (err) => {
        console.error('EventSource failed:', err);
      };
    }
  }

  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get('code');
  useEffect(() => {
    //μλ² λ°°ν¬μ localApi => api λ‘ λ³κ²½ νμ.
    api
      .get(`login/kakao?code=${code}`)
      .then((res) => {
        const ACCESS_TOKEN = res.headers['authorization'];
        sessionStorage.setItem('Access_token', ACCESS_TOKEN);
        //μλ² λ°°ν¬μ localApi => api λ‘ λ³κ²½ νμ.
        api.defaults.headers.common['Authorization'] = ACCESS_TOKEN;
        multi.defaults.headers.common['Authorization'] = ACCESS_TOKEN;
        apis
          .kakaoLogin()
          .then((res) => {
            const nickname = res.data.nickname;
            const username = res.data.username;
            const image = res.data.profileImage;
            const email = res.data.email;
            const id = res.data.id;
            sessionStorage.setItem('profileImage', image);
            sessionStorage.setItem('nickname', nickname);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('id', id);
            Sse();
            navigate(sessionStorage.getItem('Location') ? sessionStorage.getItem('Location') : '/');
          })
          .catch((err) => console.log('err', err));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default KakaoAuth;
