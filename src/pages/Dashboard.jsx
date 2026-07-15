import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import MyProfile from '../components/core/Dashboard/MyProfile';

function Dashboard() {
    const {loading:authLoading}=useSelector((state)=>state.auth || {});
    const {loading:profileLoading}=useSelector((state)=>state.profile|| {});
    

    if (profileLoading || authLoading) {
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }
  return (
    <div className='relative flex mn-h-[calc(100vh-3.5rem)]'> 
        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
          <div className=' w-screen mx-auto max-w-[1280px] py-10 px-16 '>
            <Outlet/>
          </div>
        </div>
        
    </div>
  )
}

export default Dashboard