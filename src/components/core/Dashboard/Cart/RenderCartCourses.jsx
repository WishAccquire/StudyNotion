import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { GiNinjaStar } from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/CartSlice'

function RenderCartCourses() {
    const {cart}=useSelector((state)=>state.cart)
    const dispatch=useDispatch();
  return (
    <div>
        {
        cart.map((course,index)=>{
            <div>
                <div>
                    <img src={course?.ThumbNail}/>
                    <div>
                        <p>{course?.CourseTittle}</p>
                        <p>{course?.Category}</p>
                        <div>
                            <span>4.8</span>
                            <span><ReactStars 
                               count={4.8}
                               size={20}
                               edit={false}
                               activeColor='#ffd700'
                               emptyIcon={<GiNinjaStar/>}
                               fullIcon={<GiNinjaStar/>}/></span>
                               <span>{course?.Review?.length} Ratings</span>

                        </div>
                    </div>
                </div>
                <div> 
                    <button onClick={()=>dispatch(removeFromCart(course._id))}>
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p>Rs {course?.Price}</p>
                </div>
            </div>
        })
        }
      
    </div>
  )
}

export default RenderCartCourses
