import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NavBar from './components/common/NavBar';
import OpenRoute from './components/auth/OpenRoute';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Error from './Pages/Error';
import ForgotPassword from './Pages/ForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyEmail from './Pages/VerifyEmail';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './Pages/Dashboard';
import Setting from './components/core/Dashboard/Setting';
import Settings from './components/core/Dashboard/settings/Settings';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import { ACCOUNT_TYPE } from './utils/constants';
import Cart from './components/core/Dashboard/cart/Cart';
import { useSelector } from 'react-redux';
import AddCourse from './components/core/Dashboard/addCourse/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourseByInstructor/EditCourse';
import Catalog from './Pages/Catalog';
import CourseDetails from './Pages/CourseDetails';
import ViewCourse from './Pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import InstructorDashboard from './components/core/InstructorDashboard/Instructor_Dashboard.jsx';


const App = () => {

  const {user} = useSelector((state)=>state.profile);

  return (
      <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-display'>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/catalog/:catalogName" element={<Catalog/>}/>
            <Route path="/courses/:courseId" element={<CourseDetails/>}/>
            
            <Route path="/login" element={
              <OpenRoute>
                <Login/>
              </OpenRoute>
          }
        />
         <Route path="/signUp" element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
          }
        />

         <Route path="/forgot-password" element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
          }
        />

        <Route path="/update-password/:id" element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
          }
        />

        <Route path="/verify-email" element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
          }
        />

        <Route path="/about" element={<About />}/>

        <Route path="/contact" element={<ContactUs />}/>

        <Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path="/dashboard/my-profile" element={<MyProfile />}/>
          <Route path="/dashboard/setting" element={<Settings />}/>
          
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              
                <Route path="/dashboard/instructor" element={<InstructorDashboard/>}/>
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
              </>
            )
          }
        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
            </>
          )}
        </Route>

        <Route path="*" element={<Error />}/>

        </Routes>
      </div>
  )
}

export default App;