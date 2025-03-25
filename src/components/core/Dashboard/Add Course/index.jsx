
import RenderSteps from "./RenderSteps"
export default function AddCourse(){
    return(
        <div>
            <div className="text-white flex gap-5">
                <div className="w-[65%]">
                    <h1>Add Course</h1>
                    <div>
                        <RenderSteps/>
                    </div>
                </div>
                <div className="bg-[#161D29] border-[1px] border-[#2C333F] p-6 max-h-max rounded-lg w-[35%]">
                    <p className="text-2xl font-semibold">Code Upload Tips</p>
                    <ul className="list-disc list-inside text-white font-light">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}