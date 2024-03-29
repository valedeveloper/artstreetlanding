import React from 'react'
import { FaAppStoreIos,FaGooglePlay  } from 'react-icons/fa'



 function AppInfo(){
  return (
    <section className=" bg-primaryYelow text-white p-20 text-center flex flex-col gap-8 items-center">
    <h1 className="title">Muy pronto en:</h1>
    <div className=" flex gap-5">
      <FaGooglePlay size={40} color="black"/>
      <FaAppStoreIos size={40} color='black'/>
    </div>
  </section>
  )
}

export default AppInfo