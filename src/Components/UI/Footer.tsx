import githubMark from '../../img/github_mark.png'
import wikiLogo from '../../img/wiki_logo.png'

export const Footer = () => {
  return (
    <footer className="bg-gray-700 p-5 flex justify-between">
      <h3 className="text-white text-2xl font-sans">
        EDB - eLearning Datenbank
      </h3>

      <div className="font-bold flex gap-4 text-white">
        <a
          className="flex items-center no-underline text-white"
          href="https://wikis.gm.fh-koeln.de/"
        >
          <img className="inline w-6 h-6" src={wikiLogo} alt="Wiki Logo" />
          <span className="ml-1">Datenbank-Wiki</span>
        </a>
        <a
          className="flex items-center no-underline text-white"
          href="https://github.com/EILD-nrw/sql-trainer"
        >
          <img className="inline w-5 h-5" src={githubMark} alt="GitHub Logo" />
          <span className="ml-1">GitHub</span>
        </a>
      </div>
    </footer>
  )
}
