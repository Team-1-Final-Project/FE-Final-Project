import { useInput } from 'hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Preview from '../create/Preview';
import { apis } from 'api/api';
import { useEffect } from 'react';
export const orange = (str) => {
  const a = str.split('-');
  const b = Number(a.join(''));
  return b;
};

const CardUpdateForm = (props) => {
  const navigate = useNavigate();

  const [title, setTitle, titleChange] = useInput('');
  const [tag, setTag, tagChange] = useInput('');
  const [location, setLocation, locationChange] = useInput('');
  const [limitPeople, setLimitPeople, limitPeopleChange] = useInput('');
  const [joinStartDate, setJoinStartDate, joinStartDateChange] = useInput('');
  const [joinEndDate, setJoinEndDate, joinEndDateChange] = useInput('');
  const [meetingStartDate, setMeetingStartDate, meetingStartDateChange] = useInput('');
  const [meetingEndDate, setMeetingEndDate, meetingEndDateChange] = useInput('');
  const [content, setContent, contentChange] = useInput('');

  useEffect(() => {
    console.log('here', props);
    props.detailData && setTitle(props.detailData.title);
    props.detailData && setLocation(props.detailData.location);
    props.detailData && setLimitPeople(props.detailData.limitPeople);
    props.detailData && setJoinStartDate(props.detailData.joinStartDate);
    props.detailData && setJoinEndDate(props.detailData.joinEndDate);
    props.detailData && setMeetingStartDate(props.detailData.meetingStartDate);
    props.detailData && setMeetingEndDate(props.detailData.meetingEndDate);
    props.detailData && setContent(props.detailData.content);
    console.log('data', data);
  }, [props.detailData]);

  const data = {
    title: title,
    content: content,
    joinStartDate: joinStartDate,
    joinEndDate: joinEndDate,
    meetingStartDate: meetingStartDate,
    meetingEndDate: meetingEndDate,
    location: location,
    limitPeople: limitPeople,
    tagMeetingIds: [6, 7],
  };
  const list = [2, 3, 4, 5, 6, 7, 8];

  //수정완료 버튼 클릭시
  const onClickSubmitHandler = async (e) => {
    e.preventDefault();
    const JSD = orange(joinStartDate);
    const JED = orange(joinEndDate);
    const MSD = orange(meetingStartDate);
    const MED = orange(meetingEndDate);

    if (JSD <= JED && MSD <= MED && JED <= MSD) {
      await apis
        .updateMeeting(props.params, data)
        .then((res) => {
          console.log(res, data);
          navigate('/meeting');
        })
        .catch((err) => console.log(err));
      await apis
        .updateMeetingImage(props.params, formData)
        .then((res) => console.log('이미지변경완료', res))
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('날짜형식에 어긋납니다');
    }
  };

  //나가기버튼 클릭시
  const onClickGoOut = (e) => {
    if (window.confirm('작성한 내용이 사라집니다. 그래도 나가시겠습니까?')) {
      navigate('/meeting');
    } else {
      return true;
    }
  };

  //여기서 부터 이미지 수정 파트입니다.
  const [image, setImage] = useState('');
  let formData = new FormData();
  const onChangeImageHandler = (e) => {
    setImage(e.target.files[0]);
    formData.append('image', image);
  };

  return (
    <>
      <div className="mt-20 flex justify-center">
        <div className="w-5/6 md:grid md:grid-cols-3 md:gap-6 ">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">모임생성</h3>
              <div className="h-full">
                <label className="mt-10 block text-sm font-medium text-gray-700">사진 등록</label>
                <div className="mt-1 h-full flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center flex flex-col items-center justify-center">
                    {image ? (
                      <Preview img={image} />
                    ) : (
                      <img
                        className="h-full w-full"
                        src={props.detailData ? props.detailData.meetingImage : null}
                      />
                    )}

                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            onChangeImageHandler(e);
                          }}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0 ">
            <form>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6"></div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      제목
                    </label>
                    <div className="mt-1">
                      <input
                        id="about"
                        name="about"
                        rows={1}
                        className="h-9 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="제목을 입력해 주세요"
                        defaultValue={title}
                        onChange={titleChange}
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        모집인원
                      </label>
                      <div className="mt-1">
                        <select
                          id="about"
                          name="about"
                          rows={1}
                          className="h-9 mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          defaultValue={props.detailData && props.detailData.limitPeople}
                          onChange={limitPeopleChange}
                        >
                          <option value="" disabled="">
                            인원 선택
                          </option>
                          {list.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}명
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        장소
                      </label>
                      <div className="mt-1">
                        <input
                          id="about"
                          name="about"
                          rows={1}
                          className=" h-9 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="모임 장소를 입력해 주세요"
                          defaultValue={location}
                          onChange={locationChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        모집 기간
                      </label>
                      <div className="flex mt-1">
                        <input
                          id="about"
                          name="about"
                          rows={1}
                          className="h-6 mt-1 mr-2 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          type="date"
                          defaultValue={joinStartDate}
                          onChange={joinStartDateChange}
                        />
                        ~
                        <input
                          id="about"
                          name="about"
                          rows={1}
                          className="h-6 ml-2 mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          type="date"
                          defaultValue={joinEndDate}
                          onChange={joinEndDateChange}
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        활동 기간
                      </label>
                      <div className="flex mt-1">
                        <input
                          id="about"
                          name="about"
                          rows={1}
                          className="h-6 mt-1 mr-2 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          type="date"
                          defaultValue={meetingStartDate}
                          onChange={meetingStartDateChange}
                        />
                        ~
                        <input
                          id="about"
                          name="about"
                          rows={1}
                          className="h-6 ml-2 mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          type="date"
                          defaultValue={meetingEndDate}
                          onChange={meetingEndDateChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      내용
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="내용을 입력해 주세요"
                        defaultValue={content}
                        onChange={contentChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      태그
                    </label>
                    <div className="mt-1">
                      <input
                        id="about"
                        name="about"
                        rows={1}
                        className="h-9 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="태그를 입력해 주세요"
                        value={tag}
                        onChange={tagChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-between">
                  <button
                    type="submit"
                    onClick={() => onClickGoOut()}
                    className="inline-flex justify-center rounded-md border border-transparent bg-cyan-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    나가기
                  </button>
                  <button
                    onClick={(e) => onClickSubmitHandler(e)}
                    className="inline-flex justify-center rounded-md border border-transparent bg-cyan-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    수정완료
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardUpdateForm;
