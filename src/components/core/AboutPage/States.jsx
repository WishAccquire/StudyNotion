import React from 'react'
import { data } from 'react-router-dom';

const Stats=[
    {count:"5K",label:"Active Students"},
    {count:"10+",label:"Mentors"},
    {count:"200+",label:"Courses"},
    {count:"50+",label:"Awards"},
];
function StatsComponent() {
  return (
    <section className='bg-[#161D29] w-screen flex items-center justify-center py-24 my-12'>
        <div className='w-9/12 '>
            <div className='flex gap-5 justify-around'>
                {Stats.map((data,index)=>{
                    return (
                        <div key={index} className='flex flex-col gap-2 items-center'>
                            <h1 className='font-semibold text-2xl'>{data.count}</h1> 
                            <h2 className='text-[#585D69] font-semibold'>{data.label}</h2> 
                             </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default StatsComponent