// import React from 'react'
import SideBar from '../components/SideBar'
import Map from '../components/Map'
import styles from './AppLayout.module.css'
import User from '../components/User'
export default function AppLayout() {


  return (
    <div className = {styles.app}>
       <SideBar/>
       <Map/>
       <User/>
    </div>
  )
}
