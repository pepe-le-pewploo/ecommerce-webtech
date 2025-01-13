import React from 'react'
import FunctionalComponents from './FunctionalComponents'

const Body = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-[#081a28] w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="arimo-class text-7xl font-extrabold tracking-tight text-left">
            Prosperity is a Long Game
          </h1>
          <h1 className="arimo-class text-4xl font-bold tracking-tight text-left">
            Bank on the right partner
          </h1>
          <p className='arimo-class text-xs font-semibold tracking-tight text-left'>
            Prism Banking Ltd. is proud to be the global partner of SnapCart 
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-start bg-background px-4 py-12 bg-[#c1c7cf] sm:px-6 lg:px-8">
        <FunctionalComponents/>
      </div>
    </div>
  )
}

export default Body