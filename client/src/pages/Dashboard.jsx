import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import DashSidebar from '../components/DashSidebar';
import Chart from '../components/Chart';

const Dashboard = () => {
    const [tab, setTab] = useState('');
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
    <div className='md:w-56'>
      {/* Sidebar */}
      <DashSidebar />
    </div>
    {/* profile... */}
    {tab === 'profile' && <Profile />}
    {/* posts... */}
    {tab === 'charts' && <Chart/>}
  </div>
  )
}

export default Dashboard