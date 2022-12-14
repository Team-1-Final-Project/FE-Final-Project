import { useInput } from 'hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Preview from '../create/Preview';
import { apis } from 'api/api';
import { useEffect } from 'react';
import swal from 'sweetalert';
import styled from 'styled-components';
import Footer from 'components/footer/Footer';

export const orange = (str) => {
  const a = str.split('-');
  const b = Number(a.join(''));
  return b;
};

const CardUpdateForm = (props) => {
  const navigate = useNavigate();

  const [title, setTitle, titleChange] = useInput('');
  const [tag, setTag, tagChange] = useInput([]);
  const [location, setLocation, locationChange] = useInput('');
  const [limitPeople, setLimitPeople, limitPeopleChange] = useInput('');
  const [joinStartDate, setJoinStartDate, joinStartDateChange] = useInput('');
  const [joinEndDate, setJoinEndDate, joinEndDateChange] = useInput('');
  const [meetingStartDate, setMeetingStartDate, meetingStartDateChange] = useInput('');
  const [meetingEndDate, setMeetingEndDate, meetingEndDateChange] = useInput('');
  const [content, setContent, contentChange] = useInput('');
  const [image, setImage] = useState('');

  useEffect(() => {
    props.detailData && setTitle(props.detailData.title);
    props.detailData && setLocation(props.detailData.location);
    props.detailData && setLimitPeople(props.detailData.limitPeople);
    props.detailData && setJoinStartDate(props.detailData.joinStartDate);
    props.detailData && setJoinEndDate(props.detailData.joinEndDate);
    props.detailData && setMeetingStartDate(props.detailData.meetingStartDate);
    props.detailData && setMeetingEndDate(props.detailData.meetingEndDate);
    props.detailData && setContent(props.detailData.content);
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
    tagMeetingIds: tag,
  };
  const list = [2, 3, 4, 5, 6, 7, 8];

  //???????????? ?????? ?????????
  const onChangeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const onClickSubmitHandler = async (e) => {
    e.preventDefault();
    const JSD = orange(joinStartDate);
    const JED = orange(joinEndDate);
    const MSD = orange(meetingStartDate);
    const MED = orange(meetingEndDate);

    let formData = new FormData();
    if (JSD < JED && JED < MSD && MSD <= MED) {
      image ? formData.append('image', image) : formData.append('image', null);
      formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      await apis
        .updateMeeting(props.params, formData)
        .then((res) => {
          swal(res.data.data);
          navigate('/meeting');
        })
        .catch((err) => {
          swal(
            `?????????????????? jpg???????????? ?????????????????? ????????????.\n\n?????? ?????? ????????? ?????????????????? ?????????????????? ????????????.`
          );
        });
    } else if (!(JSD < JED)) {
      swal('?????????????????? ????????????????????? ??????????????? ?????????.');
    } else if (!(JED < MSD)) {
      swal('?????????????????? ????????????????????? ??????????????? ?????????.');
    } else if (!(MSD <= MED)) {
      swal('?????????????????? ????????????????????? ????????? ??? ????????????.');
    }
  };

  //??????????????? ?????????
  const onClickGoOut = (e) => {
    e.preventDefault();
    swal('????????? ????????? ????????? ??? ????????????. ????????? ??????????????????????', {
      buttons: {
        cancel: '?????????. ?????? ???????????????',
        '???,????????????': true,
      },
    }).then((value) => {
      switch (value) {
        case '???,????????????':
          navigate('/meeting');
          break;

        default:
          break;
      }
    });
  };

  //????????? ????????? ???????????????.

  const [tagList, setTagList] = useState([
    { id: 1, name: '#?????????', state: false },
    { id: 2, name: '#?????????', state: false },
    { id: 3, name: '#??????', state: false },
    { id: 4, name: '#?????????', state: false },
    { id: 5, name: '#????????????(??????)', state: false },
    { id: 6, name: '#????????????', state: false },
    { id: 7, name: '#??????', state: false },
  ]);

  return (
    <>
      <div className="mt-10 text-2xl font-bold text-gray-600 flex justify-center">?????? ??????</div>
      <div className="flex justify-center">
        <div className="w-3/5 ">
          <div className="">
            <div className="px-4">
              <div className="h-full">
                <label className="mt-5 block text-sm font-medium text-gray-700"></label>
                <div className="mt-1 h-full flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center flex flex-col items-center justify-center">
                    {image ? (
                      <Preview img={image} />
                    ) : props.detailData && props.detailData.meetingImage ? (
                      <img
                        className="h-full w-full"
                        src={props.detailData ? props.detailData.meetingImage : null}
                        alt="meetingImage"
                      />
                    ) : null}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>???????????? ?????? ????????????</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            onChangeImageHandler(e);
                          }}
                        />
                      </label>
                    </div>
                    <p className="pl-1 text-sm">(jpg????????? ???????????????.)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5">
                  <div className="grid grid-cols-3 gap-6"></div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      ??????
                    </label>
                    <div className="mt-1">
                      <input
                        id="about"
                        name="about"
                        rows={1}
                        className="h-9 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="????????? ????????? ?????????"
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
                        ????????????
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
                            ?????? ??????
                          </option>
                          {list.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}???
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        ??????
                      </label>
                      <div className="mt-1">
                        <input
                          id="about"
                          name="about"
                          rows={1}
                          className=" h-9 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="?????? ????????? ????????? ????????? ?????????"
                          defaultValue={location}
                          onChange={locationChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        ?????? ??????
                      </label>
                      <div className="flex mt-1">
                        <input
                          className="h-6 mt-1 mr-2 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          type="date"
                          defaultValue={joinStartDate}
                          onChange={joinStartDateChange}
                        />
                        ~
                        <input
                          className="h-6 ml-2 mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          type="date"
                          defaultValue={joinEndDate}
                          onChange={joinEndDateChange}
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        ?????? ??????
                      </label>
                      <div className="flex mt-1">
                        <input
                          className="h-6 mt-1 mr-2 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          type="date"
                          defaultValue={meetingStartDate}
                          onChange={meetingStartDateChange}
                        />
                        ~
                        <input
                          className="h-6 ml-2 mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          type="date"
                          defaultValue={meetingEndDate}
                          onChange={meetingEndDateChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      ??????
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="????????? ????????? ?????????"
                        defaultValue={content}
                        onChange={contentChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      ??????
                    </label>
                    {tagList?.map((item) => {
                      return (
                        <TagStyle
                          backColor={item.state ? '#3cc2df' : '#f3f4f5'}
                          fontColor={item.state ? '#f3f4f5' : '#3cc2df'}
                          key={item.id}
                          onClick={() => {
                            if (tag.length >= 3 && !item.state) {
                              alert('????????? 3????????? ?????? ???????????????.');
                            } else {
                              if (item.state) {
                                setTag(
                                  tag.filter((id) => {
                                    return id !== item.id;
                                  })
                                );
                              } else {
                                setTag([...tag, item.id]);
                              }
                              item.state = !item.state;
                              setTagList([...tagList]);
                            }
                          }}
                        >
                          {item.name}
                        </TagStyle>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={(e) => onClickSubmitHandler(e)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-cyan-400 py-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    ????????????
                  </button>
                  {/* <button
                    type="submit"
                    onClick={onClickGoOut}
                    className="inline-flex justify-center rounded-md border border-transparent bg-cyan-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    ?????????
                  </button> */}
                  <button onClick={onClickGoOut} className="py-2 text-sm  text-gray-400">
                    ????????????
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CardUpdateForm;
const TagStyle = styled.span`
  padding: 0px 5px;
  font-size: 12px;

  border: 1px solid #f3f4f5;
  border-radius: 20px;
  margin-right: 5px;
  cursor: pointer;
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.backColor};
`;
