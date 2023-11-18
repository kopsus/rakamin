const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center p-2 bg-navbar mx-auto rounded-md md:px-10">
      <p className="text-base font-bold">Library Kopsus</p>
      <div>
        <button className="btn px-5 text-white bg-blueBtn border-none hover:bg-hoverBlueBtn">
          Login
        </button>
      </div>
    </div>
  )
}

export default Navbar
