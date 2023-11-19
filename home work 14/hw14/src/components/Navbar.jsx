import { useAuth } from "@/modules/context/authContext"
import Cookies from "js-cookie"
import Link from "next/link"

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()

  const handleLogout = () => {
    console.log("Logging out...")
    Cookies.remove("isLoggedIn")
    console.log("Cookie removed")
    setIsLoggedIn(false)
    console.log("State updated")
  }

  return (
    <header className="flex items-center justify-between bg-navbar py-2 px-[5%] ">
      <Link href={"/Books"} className="text-2xl font-bold">
        Kopsus Library
      </Link>
      <div>
        {!isLoggedIn ? (
          <Link
            href={"/Login"}
            className="btn px-7 bg-blueBtn hover:bg-hoverBlueBtn text-white border-none font-bold"
          >
            Login
          </Link>
        ) : (
          <div className="flex gap-5 ">
            <Link
              href={"/newbook"}
              className="btn bg-blueBtn hover:bg-hoverBlueBtn text-white border-none"
            >
              Create New Book
            </Link>
            <Link
              href={"/"}
              className="btn bg-redBtn text-white border-none"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
