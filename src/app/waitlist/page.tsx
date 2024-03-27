import React from 'react'
import MaxWidthWrapper from '../../components/MaxWidthWrapper'
import CallToAction from '../../components/CallToAction'

function WaitScreen(): JSX.Element {
  return (
    <div className=' p-20 text-center flex flex-col gap-5 items-center '  id="wait-list">
        <div className=' flex flex-col justify-center items-center  gap-y-5   '>
          <h1 className='title '>Lista de Espera</h1>
            <p className='text-primaryGray  text-xl max-w-prose  text-muted-foreground'>¡Te avisaremos cuando la aplicación esté lista para usar!</p>
          <form className='flex flex-col items-center justify-center gap-8  w-full px-5 lg:flex-row '>
            {/* <input className="w-full px-2 py-3 rounded-md outline-none border-1 border-transparent focus:border-primaryBlack transition duration-300" placeholder="Ingrese su correo electrónico" type="email" required /> */}
            <input className="w-full px-2 py-3 rounded-md outline-none border-1 border-primaryBlack lg:w-1/2 p-4 " placeholder="Ingrese su correo electrónico" type="email" required />
            <CallToAction title='Unirme' className=' bg-primaryYelow w-full hover:bg-yellow-500  lg:w-max p-4' />
          </form>
        </div>
    </div>
  )
}

export default WaitScreen