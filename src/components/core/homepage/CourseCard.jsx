import React from 'react'

function CourseCard({cardData,currentcard ,setCurrentCard}) {
  return (
    <div className=' border-yellow-25 border-r-4 border-b-4  mx-auto'>
  <div className="flex flex-col bg-white py-4 px-2">

   <div className='text-[#161D29] font-inter text-[20px] font-semibold'>{cardData.heading}</div>
   <div className='text-[#585D69] mt-1 text-[16px] font-medium'>{cardData.description}</div>

   


   <div className='flex flex-row justify-between mt-14 border-dashed border-t-2 border-pure-greys-200 items-center '>
    <div className='flex flex-row gap-2 mt-1 items-center'>
    <div className='h-[20px] w-[20px]'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="#0F7A9D" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0F7A9D" class="size-6" >
  <path stroke-linecap="round"  stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
    </div>
     <div className=' text-[#0F7A9D] font-inter text-[16px] font-medium'>{cardData.level}</div>
     </div>

     <div className='flex flex-row gap-2 items-center'>
        <div className='h-[20px] w-[20px]'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#0F7A9D" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0F7A9D" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
</svg>

        </div>
        <div className=' text-[#0F7A9D] font-inter text-[16px] font-medium'>{cardData.lessionNumber} Lessons</div>
     </div>
     </div>


</div>
   </div>
   

  )
}

export default CourseCard
