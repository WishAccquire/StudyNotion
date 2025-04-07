import "./App.css";
import { useSelector } from "react-redux";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Navbar from "./components/common/Navbar.jsx";
import OpenRoute from "./components/core/Auth/OpenRoute.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./components/core/Dashboard/MyProfile.jsx";
import ContactUS from "./pages/ContactUS.jsx";
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import Error from "./pages/Error.jsx"
import Settings from "./components/core/Dashboard/settings/index.jsx";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses.jsx";
import Cart from "./components/core/Dashboard/Cart/index.jsx"
import { ACCOUNT_TYPE } from "./utils/constants.js";
import AddCourse from "./components/core/Dashboard/Add Course/index.jsx";
import CourseBuilderForm from "./components/core/Dashboard/Add Course/CourseBuilderForm/CourseBuilderForm.jsx";
import MyCourses from "./components/core/Dashboard/My Courses/MyCourses.jsx";
import EditCourse from "./components/core/Dashboard/EditCouse/index.jsx";
import Catalog from "./pages/Catalog.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import VideoDetails from "./components/core/ViewCourse/VideoDetails.jsx";
import Instructor from "./components/core/Dashboard/Instructor DashBoard/Instructor.jsx";
function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path='catalog/:catalogName' element={<Catalog/>}/>
        <Route path='courses/:courseId' element={<CourseDetails/>}/>
        
        <Route path="/contact" element={<ContactUS/>}/>
        <Route path="signup" element={<OpenRoute><Signup/></OpenRoute>} />
        <Route path="login" element={<OpenRoute><Login/></OpenRoute>} />
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>} />
        <Route path="update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>} />
        <Route path="verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>} />
        
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
                <Route path="dashboard/my-profile" element={<MyProfile/>} />
                <Route path="dashboard/Settings" element={<Settings />} />
                                <Route path="dashboard/my-profile" element={<MyProfile/>} />

        

               {
                user?.AccountType===ACCOUNT_TYPE.STUDENT&&(
                <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
               <Route path="dashboard/cart" element={<Cart />}/>
                </>
                )
              }

{
                user?.AccountType===ACCOUNT_TYPE.INSTRUCTOR&&(
                <>
                <Route path="dashboard/add-course" element={<AddCourse/>}/>
                <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                <Route path="dashboard/instructor" element={<Instructor/>} />

               
                </>
                )
              }
        </Route>

        <Route>
          <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {
            user?.AccountType===ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"  element={<VideoDetails/>}/>
              </>
            )
          }
          </Route>
        </Route>
        <Route path="step2" elements={<OpenRoute><CourseBuilderForm/></OpenRoute>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
