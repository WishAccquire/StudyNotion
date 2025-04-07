import React ,{useEffect,useState} from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";


function RatingStars({ReviewCount,Star_Size}) {
    const [starCount,setStarCount]=useState({
        full:0,half:0,empty:0,
    })

    useEffect(()=>{
        const wholeStars=Math.floor(ReviewCount)||0
        setStarCount({
            full:wholeStars,
            half:Number.isInteger(ReviewCount)?0:1,
            empty:Number.isInteger(ReviewCount)?5-wholeStars:4-wholeStars,
        })
    },[ReviewCount])
  return (
    <div className="flex gap-1 text-yellow-100">
    {[...new Array(starCount.full)].map((_, i) => {
      return <TiStarFullOutline key={i} size={Star_Size || 20} />
    })}
    {[...new Array(starCount.half)].map((_, i) => {
      return <TiStarHalfOutline key={i} size={Star_Size || 20} />
    })}
    {[...new Array(starCount.empty)].map((_, i) => {
      return <TiStarOutline key={i} size={Star_Size || 20} />
    })}
  </div>
  )
}

export default RatingStars
