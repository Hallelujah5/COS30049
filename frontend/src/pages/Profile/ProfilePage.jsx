//This page is only accessible through logging in and clickin on the user icon.
import React from 'react'
import Profile from './ProfileComponent/profile'
import Tabs from "./ProfileComponent/Tabs";
import TransactionTable from "./ProfileComponent/TransactionTable";
import Footer from '../../components/Footer/footer'
const ProfilePage = () => {
  return (

    <>
    <Profile />

    <TransactionTable />
    <Footer />
    </>
  )
}


export default ProfilePage;
