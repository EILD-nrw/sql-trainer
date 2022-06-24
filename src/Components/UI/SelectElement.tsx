import { ChangeEvent } from 'react'

interface Props {
  title: string
  options: string[]
  selected: string
  setSelected: (x: string) => void
  disabled: boolean
}

export default function SelectElement({
  title,
  options,
  selected,
  setSelected,
  disabled
}: Props) {
  function handleChange(e: ChangeEvent) {
    const value = (e.target as HTMLInputElement).value
    setSelected(value)
  }

  return (
    <>
      <label className="font-semibold" htmlFor="difficulty">
        {title}
      </label>
      <select
        className="border rounded-sm max-w-xs"
        id="difficulty"
        value={selected}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="" disabled hidden>
          Bitte wählen
        </option>
        {options.map((option) => {
          return (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          )
        })}
      </select>
    </>
  )
}
