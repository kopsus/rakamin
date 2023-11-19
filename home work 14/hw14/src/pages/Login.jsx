import { useAuth } from "@/modules/context/authContext"
import { useRouter } from "next/router"
import React from "react"
import { loginUser } from "../modules/fetch"
import Cookies from "js-cookie"

const Login = () => {
  const router = useRouter()
  const { isLoggedIn, setIsLoggedIn } = useAuth()

  const handleToRegister = () => {
    router.push("/Register")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await loginUser(
        e.target.email.value,
        e.target.password.value
      )
      Cookies.set("isLoggedIn", true)
      setIsLoggedIn(true)
      console.log(data)
      router.push("/Books")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-[50%] mx-auto bg-second rounded-md p-10 "
      >
        <p className="text-xl text-center font-bold">Login</p>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <button className="btn bg-blueBtn hover:bg-hoverBlueBtn text-white font-bold mt-5 border-none">
          Login
        </button>
        <p>
          Belum Punya Akun?{" "}
          <label
            htmlFor="login"
            onClick={handleToRegister}
            className="font-bold cursor-pointer"
          >
            Daftar
          </label>
        </p>
      </form>
    </div>
  )
}

export default Login
