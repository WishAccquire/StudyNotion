import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNoOfLectures:0,
}

const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState,
    reducres:{
        setcourseSectionData:(state,action)=>{
            state.courseSectionData=action.payload;
        },
        setcourseEntireData:(state,action)=>{
            state.courseEntireData=action.payload;
        },
        setcompletedLectures:(state,action)=>{
            state.completedLectures=action.payload;
        },
        settotalNoOfLectures:(state,action)=>{
            state.totalNoOfLectures=action.payload;
        },
        updateCompletedlectures:(state,action)=>{
            state.completedLectures=[...state.completedLectures,action.payload];
        },
    }
})


export const {setcompletedLectures,setcourseEntireData,setcourseSectionData,settotalNoOfLectures,updateCompletedlectures}=viewCourseSlice.actions;
export default viewCourseSlice.reducer