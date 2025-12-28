import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {

    const {loading:authLoading} = useSelector((state)=> state.auth);
    const {loading:profileLoading} = useSelector((state)=> state.profile);

    if(profileLoading || authLoading){
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
    <div className='relative flex min-h-[calc(100vh-3.5rem)] h-full'>
        <Sidebar/>
        <div className='w-full md:w-11/12 max-w-[1000px] mx-auto h-full'>
            <div className='w-full md:w-11/12 max-w-[1000px] py-6 md:py-10 px-4 md:px-0 mx-auto'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard;