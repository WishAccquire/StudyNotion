export default function GetAvgRating(ratingArr){
       if(ratingArr?.length===0) return 0;
       console.log("ratingArr::::",ratingArr)
       const totalReviewCount=ratingArr?.reduce((acc,curr)=>{
        acc+=curr.Rating
        return acc
       },0)
       console.log("xdcfvgbhnjbgvcfdxcfvgbh",totalReviewCount)
       const multiplier=Math.pow(10,1)
       const avgReviewCount=
       Math.round((totalReviewCount/ratingArr?.length)*multiplier)/multiplier

       return avgReviewCount
}