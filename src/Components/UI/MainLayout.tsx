import React from 'react'
import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import TitleLinker from './TitleLinker'

export default function MainLayout () {
  return (
    <div className="max-w-screen-xl space-y-4 mx-auto my-0 flex flex-col justify-center">
      <Header />
      <TitleLinker />
      <div className="bg-white p-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
