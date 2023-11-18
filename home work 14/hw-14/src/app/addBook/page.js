"use client"

import Navbar from "@/components/Navbar"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const AddBook = () => {
  const [selectImg, setSelectImg] = useState(null)
  const { push } = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    try {
      await axios.postForm("/api/books", {
        title: formData.get("title"),
        author: formData.get("author"),
        publisher: formData.get("publisher"),
        year: parseInt(formData.get("year")),
        pages: parseInt(formData.get("pages")),
        image: selectImg,
      })

      push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-5 lg:px-12">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-second w-full flex flex-col my-10 px-5 py-5 rounded-md md:w-[70%] md:mx-auto md:p-10 lg:w-[50%]"
      >
        <input
          onChange={(e) => {
            const file = e.target.files[0]
            setSelectImg(file)
          }}
          type="file"
          className="file-input file-input-bordered"
        />

        <label className="mt-3">Title</label>
        <input
          type="text"
          onChange={(e) => e.target.value}
          className="input input-sm input-bordered"
        />

        <label className="mt-3">Author</label>
        <input type="text" className="input input-sm input-bordered" />

        <label className="mt-3">Publisher</label>
        <input type="text" className="input input-sm input-bordered" />

        <label className="mt-3">Year</label>
        <input type="number" className="input input-sm input-bordered" />

        <label className="mt-3">Page</label>
        <input type="number" className="input input-sm input-bordered" />

        <button
          type="submit"
          className="btn btn-sm bg-blueBtn hover:bg-hoverBlueBtn border-none mt-10 text-white"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default AddBook
