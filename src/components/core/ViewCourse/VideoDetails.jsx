import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import 'video-react/dist/video-react.css';
import IconButton from '../../common/IconButton';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedlectures } from '../../../slices/viewCourseSlice';

function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData = [], courseEntireData = {}, completedLectures = [] } = useSelector((state) => state.viewCourse) || {};

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerError, setPlayerError] = useState(null);

  // Fetch and set video data
  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (!courseSectionData.length) return;
      
      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const section = courseSectionData.filter((course) => course._id === sectionId);
        const video = section?.[0].Subsection?.filter((data) => data._id === subSectionId);
        
        
          setVideoData(video[0]);
          setVideoEnded(false);
          
        
      }
    };

    setVideoSpecificDetails();
  }, [courseSectionData, location.pathname, courseEntireData]);

  // Initialize player when video data changes

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].Subsection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].Subsection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].Subsection.findIndex((data) => data._id === subSectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].Subsection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].Subsection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].Subsection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].Subsection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].Subsection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].Subsection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].Subsection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].Subsection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureComplete = async() => {
    setLoading(true);
    // Add your completion logic here
    
    const res=await markLectureAsComplete({courseId:courseId,subsectionId:subSectionId},token)

    if(res){
      dispatch(updateCompletedlectures(subSectionId))
    }
    setLoading(false);
  };

  const getM3u8Url=(url)=>{
    const newurl= url.replace('.ts','.mp4')
    
    return newurl
  }
  


  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <div className='text-white mx-auto'>No video available</div>
      ) : playerError ? (
        <div className="video-error text-center p-4">
          <p className="text-red-400 mb-2">{playerError}</p>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400">Debug info:</p>
            <p className="text-xs break-all">{videoData.VideoUrl}</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <ReactPlayer 
          ref={playerRef}
           url={getM3u8Url(videoData.VideoUrl)}
           controls
           playing={!videoEnded}
           onEnded={()=>setVideoEnded(true)}
           width="100%"
           height="100%"
          />

          {videoEnded && (
            <div
              style={{
                backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconButton
                  disabled={loading}
                  onClick={handleLectureComplete}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconButton
                disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef.current.seekTo(0,'seconds');
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="mt-4 text-white text-3xl font-semibold">{videoData?.Tittle}</h1>
      <p className="pt-2 text-white pb-6">{videoData?.Description}</p>
    </div>
  );
}

export default VideoDetails;