import React from 'react'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import CallToAction from '../components/CallToAction'

function WaitPage(): JSX.Element {
  return (
    <div className=' mt-5  '>
      <MaxWidthWrapper >
        <div className=' flex flex-col justify-center items-center h-screen gap-y-5 '>
          <h1 className='title '>Lista de Espera</h1>
          <form className='flex flex-col items-center gap-y-8 '>
            <p className=' text-primaryGray xl'>¡Te avisaremos cuando la aplicación esté lista para usar!</p>
            <input className="w-full px-2 py-3 rounded-md outline-none border-1 border-transparent focus:border-primaryBlack transition duration-300" placeholder="Ingrese su correo electrónico" type="email" required />
            <CallToAction title='¡Estoy esperando!' className=' bg-primaryYelow w-full hover:bg-yellow-400' />
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default WaitPage