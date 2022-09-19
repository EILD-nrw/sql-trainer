import sponsorLogo from '../../img/sponsor_logo.jpg'

export default function SponsorBar() {
  return (
    <div className="bg-white p-4">
      <div className="flex-auto">
        <a
          href="https://www.dh.nrw/"
          rel="noreferrer"
          target="_blank"
        >
          <img
            className="md:px-20 max-w-full float-right"
            src={sponsorLogo}
            alt="Sponsor Image"
          />
        </a>
      </div>
    </div>
  )
}
