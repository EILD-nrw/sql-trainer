import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import SponsorBar from './SponsorBar'

export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="max-w-screen-xl space-y-4 mx-auto my-0 flex flex-col justify-center">
      <Header />
      <div className="bg-white p-6">
        <Outlet />
      </div>
      {/* Sponsor Bar should only be displayed on home screen */}
      {location.pathname === '/' && <SponsorBar />}
      <Footer />
    </div>
  )
}
