/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Input } from "./input"

const PasswordInput = ({ field }: any) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} className="pr-10" {...field} />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute top-1/2 right-3 -translate-y-1/2"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}

export { PasswordInput }
