import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton';

function RenderCartAmount() {
    const {total,cart}=useSelector((state)=>state.cart);
    const handleBuyCourse=()=>{
       const courses=cart.map((course)=>course._id);
       console.log("Bought",courses);
    }
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>
      <IconButton
      text="Buy Now"
      onClick={handleBuyCourse}
      customclasses={"w-full justify-center"}/>
    </div>
  )
}

export default RenderCartAmount
