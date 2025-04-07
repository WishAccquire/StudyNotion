import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/StudentFeaturesApi'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
import ConfirmationModal from "../components/common/Confiramtionmodal"
import RatingStars from "../components/common/RatingStars"
import Error from "./Error"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import Footer from '../components/common/footer'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import { formatDate } from '../services/formatDate'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import  ReactMarkdown  from "react-markdown"


function CourseDetails() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  {courseId}=useParams();
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [toatalNoOfLec, setToatalNoOfLec] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [response, setResponse] = useState(null)
  const [isActive,setIsActive]=useState(Array(0));
  const handleActive=(id)=>{
    console.log("section id:",id,isActive)
    setIsActive((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }
  
  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.courseDetails?.Review)

    setAvgReviewCount(count)
  }, [courseData])

  useEffect(() => {
    let lec = 0;
    response?.data?.courseDetails?.CourseContent?.forEach((sec) => {
      lec += sec.Subsection.length || 0
    })
    setToatalNoOfLec(lec);
  }, [courseData])


  useEffect(() => {
    const getcoursedetails = async () => {
      try {
       
        const res = await fetchCourseDetails(courseId);
        console.log("fhjmklokijuhygtf",res);
        setCourseData(res);

      } catch (err) {
        console.log("could not fetch cousre details")

      }

    }
    if (courseId) {
      getcoursedetails();
    }
  }, [courseId]);


  const handleBuyCourse = async () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }
  if (!courseData) {
    return (
      <div className="grid text-white min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  
  // if (loading || !response) {
  //   return (
  //     <div className="grid text-white min-h-[calc(100vh-3.5rem)] place-items-center">
  //       <div className="spinner"></div>
  //     </div>
  //   )
  // }
  // if (!response.success) {
  //   return <Error />
  // }
  const {
    
    CourseTittle,
    CourseDescription,
    ThumbNail,
    Price,
    WhatLearn,
    CourseContent,
    Review,
    Instructor,
    EnrollStudent,
    createdAt
  } = courseData?.data?.courseDetails
  return (
    <div className={`relative w-full bg-richblack-900`} >

<div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={ThumbNail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {CourseTittle}
                </p>
              </div>
              <p className={`text-richblack-200`}>{CourseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars ReviewCount={avgReviewCount} Star_Size={24} />
                <span>{`(${Review.length} reviews)`}</span>
                <span>{`${EnrollStudent.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${Instructor.FirstName} ${Instructor.LastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-700 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {Price} 
              </p>
              <button className="bg-yellow-50 px-10 py-4" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={courseData}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{WhatLearn}</ReactMarkdown>
            </div>
          </div>
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2 items-center">
                  <span >
                    {CourseContent.length} {`section(s)`}
                  </span>
                  <span className='text-2xl content-start'>.</span>
                  <span>{courseData?.data.timeDuration}</span>
                  
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>
            <div className="py-4">
              {CourseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    Instructor.Image
                      ? Instructor.Image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${Instructor.FirstName} ${Instructor.LastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${Instructor.FirstName} ${Instructor.LastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {Instructor?.AdditionalDetails?.About}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
          

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails
