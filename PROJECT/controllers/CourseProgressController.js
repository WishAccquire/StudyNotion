
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")


exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  try {
    
    const subsection = await SubSection.findById(subsectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    
    let courseProgress = await CourseProgress.findOne({
        CourseId: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    } else {
      if (courseProgress.CompleteVideo.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      
      courseProgress.CompleteVideo.push(subsectionId)
    }

    
    await courseProgress.save()

    return res.status(200).json({ message: "Course progress updated" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}