import Link from "next/link"

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-second rounded-md w-[80%] p-5 md:w-[60%] lg:w-[40%] lg:px-10">
        <p className="text-center font-bold text-xl">Kopsus Library</p>
        <form className="flex flex-col my-5">
          <label className="mt-3">Email</label>
          <input type="email" className="rounded-md input input-sm mb-3" />

          <label>Password</label>
          <input type="password" className="rounded-md input input-sm" />
          <button className="btn btn-sm bg-blueBtn text-white mt-8 mb-3 text-base border-none hover:bg-hoverBlueBtn">
            Login
          </button>
          <p>
            Belum Punya Akun ?{" "}
            <Link href="/registrasi" className="font-bold">
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
