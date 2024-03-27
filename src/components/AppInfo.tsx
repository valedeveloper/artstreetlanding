import React from 'react'
import { FaAppStoreIos } from 'react-icons/fa'
import { IoLogoAndroid } from 'react-icons/io'



 function AppInfo(){
  return (
    <section className=" bg-primaryYelow text-white p-20 text-center flex flex-col gap-5 items-center">
    <h1 className=" text-3xl text-black font-semibold">Muy pronto en:</h1>
    <div className=" flex gap-5">
      <IoLogoAndroid size={40} color="black"/>
      <FaAppStoreIos size={40} color='black'/>
    </div>
  </section>
  )
}

export default AppInfo