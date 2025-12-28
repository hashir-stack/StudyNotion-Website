import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { FaEdit } from "react-icons/fa";

const MyProfile = () => {

    const navigate = useNavigate();
    const{user} = useSelector((state) => state.profile);

  return (
    <div className='text-white mx-auto mt-10 flex flex-col gap-10 max-h-full'>

        <p className='text-white text-4xl font-semibold font-sans'>
            My Profile
        </p>

        {/* section -1 */}
        <div className='text-white lg:flex md:flex justify-between items-center bg-richblack-800 px-5 py-4 rounded-2xl'>

            <div className='lg:flex md:flex my-5 mt-5 items-center gap-10 py-1'>
                <img src={user?.image} alt={`Profile -${user?.firstName}`}
                className='aspect-square w-[78px] rounded-full object-cover' />

                <div className='py-5 lg:w-full flex flex-col gap-2'>
                    <p className='text-xl font-bold'>{user?.firstName + "" + user?.lastName}</p>
                    <p className='text-richblack-300 lg:text-lg font-semibold font-sans'>{user?.email}</p>
                </div>
            </div>

            <div className='flex items-center gap-2 cursor-pointer bg-yellow-200 w-fit p-3 text-lg text-black font-semibold font-sans rounded-md'>
                <FaEdit fontSize={24} />
                <IconBtn text={"Edit"} onclick={()=>{
                navigate("/dashboard/setting")
            }}/>
            </div>
        </div>

        {/* setion -2 */}
        <div className='text-white lg:flex md:flex justify-between items-center bg-richblack-800 px-5 py-4 rounded-2xl'>
            <div className='py-5 px-2 flex flex-col gap-5 justify-center items-start'>
                <p className='text-xl font-bold'>About</p>
                <p className='font-semibold text-richblack-100'>{
                    user?.additionalDetails?.about ?? ` Write something about yourself ${user?.firstName} . . .`
                    }
                </p>
            </div>

            <div className='flex items-center gap-2 cursor-pointer bg-yellow-200 w-fit p-3 text-lg text-black font-semibold font-sans rounded-md'>
                <FaEdit fontSize={24} />
                <IconBtn text={"Edit"} onclick={()=>{
                navigate("/dashboard/setting")
                }}/>
            </div>
            </div>

        {/* section -3 */}
        <div className='text-white lg:flex md:flex-col justify-between items-center bg-richblack-800 px-5 py-4 rounded-2xl'>

            <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold p-2'>Personal Details</p>
            </div>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-between gap-14 mt-5 mb-5 py-4 px-3'>

                <div className='px-2'>
                    <p className='text-xl font-semibold'>First Name</p>
                    <p className='text-richblack-100 font-semibold'>{user?.firstName}</p>
                </div>

                <div className='px-2'>
                    <p className='text-xl font-semibold'>Last Name</p>
                    <p className='text-richblack-100 font-semibold'>{user?.lastName}</p>
                </div>

                <div className='px-2'>
                    <p className='text-xl font-semibold'>Email</p>
                    <p className='text-richblack-100 font-semibold'>{user?.email}</p>
                </div>

                <div className='px-2'>
                    <p className='text-xl font-semibold'>Gender</p>
                    <p className='text-richblack-100 font-semibold'>{user?.additionalDetails?.gender ?? "Add Gender..."}</p>
                </div>

                <div className='px-2'>
                    <p className='text-xl font-semibold'>Phone No .</p>
                    <p className='text-richblack-100 font-semibold'>{user?.additionalDetails?.phoneNo ?? "Add Contact Number..."}</p>
                </div>

                <div className='px-2'>
                    <p className='text-xl font-semibold'>Date Of Birth</p>
                    <p className='text-richblack-100 font-semibold'>{user?.additionalDetails?.dateOfBirth ?? "Add D.O.B..."}</p>
                </div>

            </div>

              <div className='flex items-center gap-2 cursor-pointer bg-yellow-200 w-fit p-3 text-lg text-black font-semibold font-sans rounded-md mt-10'>
                    <FaEdit fontSize={24} />
                    <IconBtn text={"Edit"} onclick={()=>{
                    navigate("/dashboard/setting")
                }}/>
            </div>

           
        </div>

    </div>
  )
}

export default MyProfile;