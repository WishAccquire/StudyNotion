import React, { useEffect ,useState} from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';


function RequirementField({name,label,register,errors,setValue,getValues}) {
    const [requirement,setRequirement]=useState("");
    const [requirementlist,setRequirementList]=useState([]);
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.Instructtion)
          }
        console.log("hello");
       register(name,{
        required:true,
        validate:(value)=>value.length>0
       })
    
     
    }, [])

    useEffect(()=>{
        console.log("hello");
        setValue(name,requirementlist);
    },[requirementlist])
    

    const handleAddRequirement=()=>{
        if(requirement){
            setRequirementList([...requirementlist,requirement])
            setRequirement("");
        }

    }
    const handleRemoveRequirement=(index)=>{
        const updatedRequirementList=[...requirementlist];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }
  return (
    <div className="flex flex-col space-y-2">
        <label htmlFor={name}  className="text-sm text-richblack-5" >{label}<sup className="text-pink-200">*</sup></label>
        <div className="flex flex-col items-start space-y-2">
            <input
             type='text'
             id={name}
             value={requirement}
             onChange={(e)=>setRequirement(e.target.value)}
             className='form-style bg-[#2C333F] p-3 rounded-md  w-full'
              />
              <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-50'>
                   Add
              </button>
        </div>

        {
            requirementlist.length>0 && (
                <ul  className="mt-2 list-inside list-disc">
                    {
                        requirementlist.map((requirement,index)=>(
                            <li key={index} className="flex   text-richblack-5 items-center justify-start">
                                <span>{requirement}</span>
                                <button type='button' onClick={()=>handleRemoveRequirement(index)} className='ml-2 text-xs text-richblack-400'>
                                    clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>
            )
        }
      
    </div>
  )
}

export default RequirementField
