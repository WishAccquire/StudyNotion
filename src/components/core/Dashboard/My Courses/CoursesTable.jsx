import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants';
import Confiramtionmodal from '../../../common/Confiramtionmodal';
import { deleteCourse } from '../../../../services/operations/courseDetailsAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import {  useNavigate } from 'react-router-dom'
import {formatDate} from "../../../../services/formatDate.js"

function CoursesTable({courses,setCourses}) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);
     const [loading, setLoading]=useState(false);
     const [confirmationModal,setConfirmationModal]=useState(null);
     

     const handleCourseDelete=async(courseId)=>{
          setLoading(true);
          
          await deleteCourse({courseId:courseId},token);
          
          console.log("hello in adva",courses)

          const result=await fetchInstructorCourses(token);
          console.log("fetched courses",result);
          
          if(result){
            setCourses(result);
          }
     }
  return (
    <div className='text-white'>
        <Table className="rounded-xl border border-richblack-800 ">
            <Thead>
                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                        Courses
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Duration
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Price
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Action
                    </Th>
                </Tr>
            </Thead>
            <Tbody className='text-white'>
                {
                    courses.length===0? (<Tr><Td className="py-10 text-center text-2xl font-medium text-richblack-100">No Courses Found</Td></Tr>):
                    (courses.map((course)=>(
                        <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                            <Td className='flex flex-1 gap-x-4'>
                                <img src={course?.Thumbnail} alt={course?.CourseTittle} className="h-[148px] w-[220px] rounded-lg object-cover"/>
                                <div className="flex flex-col justify-between ">
                                     <p className="text-lg font-semibold text-richblack-5">{course.CourseTittle}</p>
                                     <p className="text-xs text-richblack-300">{course.CourseDescription}</p>
                                     <p className="text-[12px] text-white">Created: {formatDate(course.createdAt)}</p>
                                     {
                                     course.Status===COURSE_STATUS.DRAFT?
                                     (<p className="w-fit rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">DRAFTED</p>):(<p className=" h-3 w-3  justify-center rounded-full text-yellow-50">PUBLISHED</p>)
                                     }
                                </div>
                            </Td>
                            <Td className="text-sm font-medium text-richblack-100">2h 30min</Td>
                            <Td className="text-sm font-medium text-richblack-100">${course.Price}</Td>
                            <Td className="text-sm font-medium text-richblack-100 ">
                                <button disabled={loading}  onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}} className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">Edit</button>
                                <button disabled={loading} onClick={()=>{setConfirmationModal({
                                    text1:"Do you want to delete this course",
                                    text2:"At the data related to this course will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler:!loading?()=>handleCourseDelete(course._id):()=>{},
                                    btn2Handler:!loading?()=>setConfirmationModal(null):()=>{}
                                    })}} className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">Delete</button>
                            </Td>

                        </Tr>
                    )))
                }
            </Tbody>
        </Table>

        {confirmationModal && <Confiramtionmodal modalData={confirmationModal}/>}
      
    </div>
  )
}

export default CoursesTable
