import Navbar from "./Navbar"

function Wrapper(props) {
  return (
    <div className="min-h-[100vh]">
      <Navbar />
      {props.children}
    </div>
  )
}

export default Wrapper
