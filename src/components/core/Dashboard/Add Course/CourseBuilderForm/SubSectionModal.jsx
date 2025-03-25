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
    <div>

      <div className='text-white bg-[#161D29] p-6 rounded-lg'>
        <div>
          <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <MdCancel />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <label htmlFor='lectureTittle'>Lecture Title</label>
            <input id="lectureTittle"
              placeholder='Enter Lecture Tittle'
              {...register("lectureTittle", { required: true })}
              className='w-full bg-[#2C333F] p-3 mt-1 rounded-lg' />

            {errors.lectureTittle && (<span>Lecture Tittle is required</span>)}
          </div>

          <div>
            <label htmlFor='lectureDesc'>Lecture Description</label>
            <textarea id="lectureDesc"
              placeholder='Enter Lecture Tittle'
              {...register("lectureDesc", { required: true })} 
              className='w-full bg-[#2C333F] p-3 mt-1 rounded-lg'/>

            {errors.lectureDesc && (<span>Lecture Description is required</span>)}
          </div>
          {
            !view && (
              <div>
                <IconButton text={loading ? "Loading": edit ? "Save Changes":"Save"}  />
              </div>
            )
          }
        </form>

      </div>


    </div>
  )
}

export default SubSectionModal

