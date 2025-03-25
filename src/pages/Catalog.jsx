import React, { useEffect, useState } from 'react'
import Footer from '../components/common/footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/api';
import {pageCatalogPageData} from '../services/operations/pageAndComponentData'

function Catalog() {

  const {catalogName}=useParams();
  const [catalogPageData,setCatalogPageData]=useState(null);
  const [categoryId,setCategoryId]=useState("");
   console.log("category page datat",catalogPageData)
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
        
        const res=await pageCatalogPageData(categoryId)
        console.log(res);
        setCatalogPageData(res);

      }catch(err){
           console.log(err);
      }
    }
    getCategory();

  },[categoryId]);

  return (
    <div className='text-white'>
        <div>
          <p>
          Home / Catalog / {catalogPageData?.selectedCategory?.TagsName}
          </p>
          <p>
          {catalogPageData?.selectedCategory?.TagsName}
          </p>
          <p>

          </p>

        </div>

        <div>

             {/* section1 */}
             <div>
               <div className='flex'>
                <p>Most Popular</p>
                <p>New</p>
               </div>
               {/* <CourseSlider/> */}
             </div>
                {/* section2 */}
             <div>
                <p>Top Courses</p>
                <p>
                  {/* <CourseSlider/> */}
                </p>
             </div>

             {/* section3 */}
             <div>
              <p>Frequently Brought Together</p>
             </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Catalog
