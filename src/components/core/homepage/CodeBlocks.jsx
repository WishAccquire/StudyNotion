import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10 items-center`}>

            <div className='w-[50%] flex flex-col gap-8 h-[100%] '>
                {heading}
                <div className='text-richblack-300 font-bold '>
                    {subheading}
                </div>
                <div className='flex flex-row gap-7'>
                <div class="flex  gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight />

                        </div>
                    </CTAButton>
                </div>
                

                <div class="flex gap-7 mt-7 w-[50%]">
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>

                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
                </div>
            </div>
            <div className='relative w-[50%] '>
            <div className='absolute w-full h-[50%] top-0 left-0  rounded-full opacity-30 z-10 flex items-center justify-center blur-[68px]  bg-gradient-to-r from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]'></div>
            <div className='object-cover w-full  flex  h-[100%] flex-row  text-[10px] py-3 bg-gradient-to-r from-[#0E1A2D3D] to-[#111E3261] border-[1px] border-[#FFFFFF38]'>
                {/*gradient */}
                <div className='text-center h-[100%] flex flex-col w-[10%] text-richblack-400 font-inter font-bold '>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    
                </div>
                <div className={`w-[90%] h-[100%] flex flex-col font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation 
                    sequence={[codeblock,5000,""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                    omitDeletionAnimation={true}
                    />
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default CodeBlocks
