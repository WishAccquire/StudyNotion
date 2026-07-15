import React, { useEffect, useState } from 'react'
import Confiramtionmodal from '../../../../common/Confiramtionmodal'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';


function NestedView({ handleChnagEditSectionName }) {
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setviewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    console.log("Section are ",course?.CourseContent?.SubSection);

    const [confirmationModal, setConfirmationModal] = useState(null);
    console.log("add subsection:",addSubSection)

    

    const handleDeleteSection = async (sectionID) => {
            const result=await deleteSection({sectionID,courseId:course._id,token})
            if(result){
                dispatch(setCourse(result));
            }
            setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subsectionID, sectionId) => {
        
        const result=await deleteSubSection({sectionId,subsectionID,token,courseId:course._id})
        if(result){
            
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }
    console.log("cfvgbhgvcfvg",course)
    return (
        <div className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer">
            <div className='text-white'>
                {
                    course?.CourseContent?.map((Section) => (
                        <details key={Section._id} open>
                            <summary className='flex cursor-pointer item-centre justify-between gap-x-3 border-b-2 border-b-richblack-600'>
                                <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu className="text-2xl text-richblack-50" size={20} />
                                    <p className="font-semibold text-richblack-50">{Section.SectionName}</p>
                                </div>

                                <div className='flex items-center gap-x-3'>
                                    <button onClick={() => { handleChnagEditSectionName(Section._id, Section.SectionName) }}><MdModeEdit className="text-xl text-richblack-300"/></button>
                                    <button onClick={() => {
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lecture in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(Section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }}><AiFillDelete className="text-xl text-richblack-300"/></button>
                                    <span className="font-medium text-richblack-300">|</span>
                                    <IoIosArrowDropdown className='text-3xl text-richblack-25' size={20} />

                                </div>


                            </summary>

                            <div>
                                {
                                     Section?.Subsection?.map((data) => (
                                        <div key={data._id} onClick={() => setviewSubSection(data)} className='flex items-center justify-between gap-x-3 cursor-pointer border-b-3'>

                                            <div className="flex items-center gap-x-3 py-2 ">
                                                <RxDropdownMenu className="text-2xl text-richblack-50" size={20} />
                                                <p className="font-semibold text-richblack-50">{data.Tittle}</p>

                                            </div>
                                            
                                            <div className='flex items-center gap-x-3' onClick={(e)=>e.stopPropagation()}>
                                                <button onClick={() => { setEditSubSection({ ...data, sectionId: Section._id }) }}><MdModeEdit className="text-xl text-richblack-300"/></button>
                                                <button onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Delete this Lecture",
                                                        text2: "This Lecture will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => handleDeleteSubSection(data._id, Section._id),
                                                        btn2Handler: () => setConfirmationModal(null),
                                                    })
                                                }}><AiFillDelete className="text-xl text-richblack-300"/>
                                                </button>

                                            </div>
                                        </div>
                                    ))
                                }
                                <button onClick={() => { setAddSubSection(Section._id) }} className="mt-3 flex items-center gap-x-1 text-yellow-50">
                                    <IoAdd />
                                    <p>Add Lecture</p>
                                </button>
                            </div>


                        </details>
                    ))
                }
            </div>


            {addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} setConfirmationModal={setConfirmationModal} add={true} />)
                : viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setviewSubSection} view={true} />)
                    : editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />) : (<div></div>)
            }

            {
                confirmationModal ? (
                    <Confiramtionmodal modalData={confirmationModal} />
                ):(<div></div>)
            }



        </div>
    )
}

export default NestedView
