import { ChangeEvent } from 'react'

interface Props {
  title: string
  options: string[]
  selected: string
  setSelected: (x: string) => void
}

export default function SelectElement ({ title, options, selected, setSelected }: Props) {
  function handleChange (e: ChangeEvent) {
    const value = (e.target as HTMLInputElement).value
    setSelected(value)
  }

  return (
    <>
      <label className='font-semibold' htmlFor="difficulty">{title}</label>
      <select className='border rounded-sm' id="difficulty" value={selected} onChange={handleChange}>
        {options.map(option => {
          return <option key={option} value={option.toLowerCase()}>{option}</option>
        })}
      </select>
    </>
  )
}
