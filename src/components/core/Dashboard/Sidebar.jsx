import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/opreations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { VscSettingsGear } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {

    const {user,loading:profileLoading} = useSelector((state)=> state.profile);
    const {loading:authLoading} = useSelector((state)=> state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal,setConfirmationModal] = useState(null);

     if( profileLoading || authLoading ){
        return (
            <div className="spinner mt-[150px] ml-[50%]">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>     
        )
    }

  return (
    <div className='text-white'>
        <div className='flex lg:min-w-[220px] max-w-[110px] flex-col border-r border-r-richblack-700 min-h-[calc(100vh-3.5rem)] h-full bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {
                    sidebarLinks?.map((link,id)=>{
                        if(link?.type && user?.accountType !== link?.type){
                            return null
                        };

                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon} />
                        )
                    })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

            <div className='flex flex-col '>

                <SidebarLink link={{ name:"Setting",path:"dashboard/setting" }} iconName="VscSettingsGear" />

                <button
                onClick={()=>
                    setConfirmationModal({
                    text1:"Are You Sure ?",
                    text2:"You will be logged out of your account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler:()=> dispatch(logout(navigate)),
                    btn2Handler:()=> setConfirmationModal(null),
                }
            )}
            className='text-sm font-medium text-richblack-300'
                >
                    <div className='lg:mr-14 mt-5 flex justify-center items-center gap-x-2'>
                        <VscSignOut className='text-2xl text-white'/>
                        <span className='text-xl text-white'>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar;