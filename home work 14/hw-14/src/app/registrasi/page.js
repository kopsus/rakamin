"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const Register = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { push } = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert("Passwords do not match")
    }

    const payload = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: password,
    }

    try {
      await axios.post("/api/register", payload)
      push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-second rounded-md w-[80%] p-5 md:w-[60%] lg:w-[40%] lg:px-10">
        <p className="text-center font-bold text-xl">Kopsus Library</p>
        <form onSubmit={handleSubmit} className="flex flex-col my-5">
          <label>Nama</label>
          <input type="text" className="rounded-md input input-sm" />

          <label className="mt-3">Email</label>
          <input type="email" className="rounded-md input input-sm mb-3" />

          <label>Password</label>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded-md input input-sm mb-3"
          />

          <label>Confirm Password</label>
          <input
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="rounded-md input input-sm"
          />
          <button className="btn btn-sm bg-blueBtn text-white mt-8 mb-3 text-base border-none hover:bg-hoverBlueBtn">
            Register
          </button>
          <p>
            Sudah Punya Akun ?{" "}
            <Link href="/login" className="font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
