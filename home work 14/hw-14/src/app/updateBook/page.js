import Navbar from "@/components/Navbar"

const UpdateBook = () => {
  return (
    <div className="p-5 lg:px-12">
      <Navbar />
      <form className="bg-second w-full flex flex-col my-10 px-5 py-5 rounded-md md:w-[70%] md:mx-auto md:p-10 lg:w-[50%]">
        <label className="mt-3">Title</label>
        <input type="text" className="input input-sm input-bordered" />

        <label className="mt-3">Author</label>
        <input type="text" className="input input-sm input-bordered" />

        <label className="mt-3">Publisher</label>
        <input type="text" className="input input-sm input-bordered" />

        <label className="mt-3">Year</label>
        <input type="number" className="input input-sm input-bordered" />

        <label className="mt-3">Page</label>
        <input type="number" className="input input-sm input-bordered" />

        <button className="btn btn-sm bg-blueBtn hover:bg-hoverBlueBtn border-none mt-10 text-white">
          Create
        </button>
      </form>
    </div>
  )
}

export default UpdateBook
