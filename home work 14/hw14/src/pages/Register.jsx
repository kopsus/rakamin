import { useState } from "react"
import { registerUser } from "../modules/fetch"
import { useRouter } from "next/router"
import Link from "next/link"

const Register = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password)
      router.push("/")
    } catch (e) {
      const error = new Error(e)
      console.log("errror", error)
    }
  }

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-[50%] mx-auto bg-second rounded-md p-10 "
      >
        <p className="text-xl text-center font-bold">Registrasi</p>
        {error && <p>{error}</p>}
        <div>
          <label>Nama</label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-sm input-bordered w-full"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Type here"
            className="input input-sm input-bordered w-full"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-sm input-bordered w-full"
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Type here"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-sm input-bordered w-full"
          />
          {password !== confirmPassword && (
            <p className="text-red-400">The password does not match</p>
          )}
        </div>

        <button className="btn btn-sm bg-blueBtn hover:bg-hoverBlueBtn border-none text-white font-bold mt-7">
          Registrasi
        </button>
        <p>
          Sudah punya akun?{" "}
          <Link href={"/Login"} className="font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
