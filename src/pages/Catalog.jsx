import React, { useEffect, useState } from 'react'
import Footer from '../components/common/footer'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/api';
import {pageCatalogPageData} from '../services/operations/pageAndComponentData'
import Course_Card from '../components/core/Catalog/Course_Card'
import CourseSlider from "../components/core/Catalog/CourseSlider"
import Error from './Error'

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const {catalogName}=useParams();
  const [active, setActive] = useState(1)
  const [catalogPageData,setCatalogPageData]=useState(null);
  const [categoryId,setCategoryId]=useState(null);
  
  //Fetch all Category
  useEffect(()=>{
    const getCategoryDetails=async()=>{
      const res=await apiConnector("GET",categories.CATEGORIES_API);
      //it will help to find which category page will render
      
      const category_id=res?.data?.data?.filter((ct)=>ct.TagsName.split(" ").join("-").toLowerCase()===catalogName)[0]._id
      
      setCategoryId(category_id)

    }
    getCategoryDetails()

  },[catalogName])

  useEffect(()=>{
    const getCategory=async()=>{
      try{
        if(categoryId!=null){
        const res=await pageCatalogPageData(categoryId)
        console.log(res);
        setCatalogPageData(res);
        }

      }catch(err){
           console.log(err);
      }
    }
    getCategory();

  },[categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  

  return (
    <div className='text-white box-content'>
        <div className='w-full bg-[#161D29]'>
        <div className=" flex mx-auto min-h-[260px]  max-w-maxContent flex-col   justify-center gap-4  ">
          <p className="text-sm text-richblack-300">
          Home / Catalog / <span className="text-yellow-25">{catalogPageData?.selectedCategory?.TagsName}</span>
          </p>
          <p className="text-3xl text-richblack-5">
          {catalogPageData?.selectedCategory?.TagsName}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.selectedCategory?.TagsDescription}
          </p>
        </div>
        </div>

        <div>

             {/* section1 */}
             <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
             <div className="section_heading font-semibold text-3xl">Courses to get you started</div>
               <div className="my-4 flex border-b border-b-richblack-600 text-sm">
               <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
               </div>
               
               <div><CourseSlider Courses={catalogPageData?.selectedCategory?.Course} /></div>
             </div>
                {/* section2 */}
             <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className="section_heading font-semibold text-xl">Top Courses in {catalogPageData?.selectedCategory?.TagsName}</p>
                <div className='w-full h-0 border-[0.5px] border-richblack-600 '></div>
                <div className="py-8">
                <CourseSlider Courses={catalogPageData?.differnentCategory?.Course} />
                </div>
             </div>

             {/* section3 */}
             <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
              <p className="section_heading font-semibold text-xl">Frequently Brought</p>
              <div className='w-full h-0 border-[0.5px] border-richblack-600'></div>
              <div className='py-8'>
                <div className='grid grid-col-1 lg:grid-col-2 gap-6' >
                  {
                    catalogPageData?.mostSellingCourses?.slice(0,4).map((course,index)=>(
                      <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                    ))
                  }

                </div>
              </div>
             </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Catalog
