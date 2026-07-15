import React, {useEffect,useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { MdCancel } from "react-icons/md";
import IconButton from '../../../../common/IconButton';
import Upload from '../CourseInformation/Upload';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

function SubSectionModal({ modalData, setModalData, add = false, view = false, edit = false,setConfirmationModal }) {

  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTittle", modalData.Tittle)
      setValue("lectureDesc", modalData.Description)
      setValue("lectureVideo", modalData.VideoUrl)
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.lectureTittle !== modalData.Tittle ||
      currentValues.lectureDesc !== modalData.Description ||
      currentValues.lectureVideo !== modalData.VideoUrl
    ) {
      return true;
    }
    else {
      return false;
    }


  }

  const handleEditSubSection = async () => {

    const currentValues = getValues();
    const formData = new FormData();

    //you have passed data of subsection and id
    formData.append("sectionID", modalData.sectionId);
    formData.append("courseId",course._id);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTittle !== modalData.Tittle) {
      formData.append("Tittle", currentValues.lectureTittle);
    }
    if (currentValues.lectureDesc !== modalData.Description) {
      formData.append("Description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.VideoUrl) {
      formData.append("VideoUrl", currentValues.lectureVideo);
    }

    setLoading(true);


    const result = await updateSubSection(formData, token);

    if (result) {
     
      const updatedCourseContent=course.CourseContent.map((section)=>
        section._id===modalData.sectionId?result:modalData.sectionId
    )
    const updatedCourse={...course,CourseContent:updatedCourseContent}
        dispatch(setCourse(updatedCourse));

    }
    setLoading(false);
    setModalData(null);
    setConfirmationModal(null);


  }

  const onSubmit = async (data) => {
    if (view) {
      return;
    } if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        handleEditSubSection();
      }
    }
   

    const formData = new FormData();
    formData.append("sectionID", modalData)
    formData.append("Description", data.lectureDesc);
    formData.append("Tittle", data.lectureTittle);
    const videoFile = data.lectureVideo instanceof File ? data.lectureVideo : null;
    

  if (videoFile) {
    formData.append("VideoURL", videoFile);
  } else {
    toast.error("Please upload a video file.");
    return;
  }
    setLoading(true);

    //apicall

    const result = await createSubSection(formData, token);
    if (result) {
      const updatedCourseContent=course.CourseContent.map((section)=>
                       section._id===modalData?result:modalData
                   )
                   const updatedCourse={...course,CourseContent:updatedCourseContent}
                       dispatch(setCourse(updatedCourse));
 
     }
    setModalData(null);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <MdCancel className="text-2xl text-richblack-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.VideoURL : null}
            editData={edit ? modalData.VideoURL : null} />

          <div>
            <label htmlFor='lectureTittle' className="text-sm text-richblack-5" >Lecture Title  {!view && <sup className="text-pink-200">*</sup>}</label>
            <input id="lectureTittle"
              placeholder='Enter Lecture Tittle'
              {...register("lectureTittle", { required: true })}
              className='w-full bg-[#2C333F] p-3 mt-1 rounded-lg' />

            {errors.lectureTittle && (<span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Tittle is required</span>)}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor='lectureDesc' className="text-sm text-richblack-5" >Lecture Description{" "}
            {!view && <sup className="text-pink-200">*</sup>}</label>

            <textarea id="lectureDesc"
              placeholder='Enter Lecture Tittle'
              {...register("lectureDesc", { required: true })} 
              className='w-full bg-[#2C333F] p-3 mt-1 rounded-lg'/>

            {errors.lectureDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Description is required</span>)}
          </div>
          {
            !view && (
              <div className="flex justify-end">
                <IconButton text={loading ? "Loading": edit ? "Save Changes":"Save"} customclasses={'bg-yellow-50 text-white font-semibold py-[8px] rounded-md px-[12px]'} />
              </div>
            )
          }
        </form>

      </div>


    </div>
  )
}

export default SubSectionModal

