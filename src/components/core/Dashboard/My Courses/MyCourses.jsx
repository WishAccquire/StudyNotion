import React ,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import IconButton from '../../../common/IconButton';
import CoursesTable from './CoursesTable';

function MyCourses() {
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);
    useEffect(() => {
      const fetchCourses=async()=>{
       
        const result=await fetchInstructorCourses(token);
        
        if(result){
            setCourses(result);
        }
      }
      fetchCourses();
    
     
    }, [])
    
  return (
    <div className='text-white'>
        <div className='flex justify-between items-center mb-5'>
            <h1 className='text-3xl font-bold '>My Courses</h1>
            <IconButton text="Add Course" onClick={()=>navigate("/dashboard/add-course")} customclasses={'bg-yellow-50 text-richblack-900 py-3 px-6 m-5 '}/>

        </div>

        {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
        }
      
    </div>
  )
}

export default MyCourses
