import React from 'react'
import MaxWidthWrapper from '../../components/MaxWidthWrapper'
import CallToAction from '../../components/CallToAction'

function WaitPage(): JSX.Element {
  return (
    <div className=' mt-5'>
      <MaxWidthWrapper >
        <div className=' flex flex-col justify-center items-center h-screen gap-y-5   '>
          <h1 className='title '>Lista de Espera</h1>
            <p className=' text-primaryGray xl'>¡Te avisaremos cuando la aplicación esté lista para usar!</p>
          <form className='flex flex-col items-center justify-center gap-8  w-full px-5 lg:flex-row '>
            {/* <input className="w-full px-2 py-3 rounded-md outline-none border-1 border-transparent focus:border-primaryBlack transition duration-300" placeholder="Ingrese su correo electrónico" type="email" required /> */}
            <input className="w-full px-2 py-3 rounded-md outline-none border-1 border-primaryBlack lg:w-1/2 " placeholder="Ingrese su correo electrónico" type="email" required />
            <CallToAction title='¡Estoy esperando!' className=' bg-primaryYelow w-full hover:bg-yellow-500  lg:w-max lg:p-4' />
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default WaitPage