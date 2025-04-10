import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import IconButton from '../../common/IconButton'

function VideoDetailsSideBar({setReviewModal}) {
    const [activestatus,setActiveStatus]=useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch=useDispatch();
    const { sectionId, subSectionId } = useParams();

    const {
      courseSectionData,
      courseEntireData,
      totalNoOfLectures,
      completedLectures
    }=useSelector((state)=>state.viewCourse)
    console.log("completedLectures",completedLectures)
     
    useEffect(()=>{
        const checkthe=()=>{
            if(courseSectionData.length==0) return;
            const currentSectionData=courseSectionData.findIndex(
                (data)=>data._id===sectionId
            )
            const currentSubSectionIndex=courseSectionData?.[currentSectionData]?.Subsection.findIndex(
                (data)=>data._id===subSectionId
            )
            const activeSubsectionid=courseSectionData[currentSectionData]?.Subsection?.[currentSubSectionIndex]._id;

            //konsa highlight hoga
            setActiveStatus(courseSectionData?.[currentSectionData]?._id)
            setVideoBarActive(activeSubsectionid);
            
        }
        checkthe()
    },[courseSectionData,location.pathname,courseEntireData,completedLectures])


  return (
    <div>
        <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
            {/* for button and heading */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconButton
              text="Add Review"
              customClasses="ml-auto"
              onClick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.CourseTittle}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures.length} / {totalNoOfLectures }
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.SectionName}
                </div>
                <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                  <span
                    className={`${
                      activestatus === course?.SectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activestatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.Subsection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic._id)}
                        onChange={() =>{}}
                      />
                      {topic.Tittle}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default VideoDetailsSideBar
