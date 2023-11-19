import { createBook, editBook } from "@/modules/fetch"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function BookForm({ bookData }) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    if (!selectedImage) {
    }
    const formData = new FormData(event.target)
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        )
        router.back()
      } catch (error) {
        console.log(error)
      }
      return
    }
    try {
      await createBook(formData)
      event.target.reset()
      router.push("/Books")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(bookData?.image)
    }
  }, [bookData])

  return (
    <div className="p-5 lg:px-12">
      <form
        onSubmit={handleSubmit}
        className="bg-second w-full flex flex-col my-10 px-5 py-5 rounded-md md:w-[70%] md:mx-auto md:p-10 lg:w-[50%]"
      >
        {selectedImage && (
          <img
            className="w-32 h-32 object-cover"
            src={selectedImage}
            alt="Selected Image"
          />
        )}
        {!bookData?.image && (
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0]
              setSelectedImage(URL.createObjectURL(file))
            }}
            className="file-input file-input-bordered"
          />
        )}
        <label className="mt-3">Title</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={bookData?.title}
          className="input input-sm input-bordered"
        />
        <label className="mt-3">Author</label>
        <input
          name="author"
          type="text"
          required
          defaultValue={bookData?.author}
          className="input input-sm input-bordered"
        />
        <label className="mt-3">Publisher</label>
        <input
          name="publisher"
          type="text"
          required
          defaultValue={bookData?.publisher}
          className="input input-sm input-bordered"
        />
        <label className="mt-3">Year</label>
        <input
          name="year"
          type="number"
          required
          defaultValue={bookData?.year}
          className="input input-sm input-bordered"
        />
        <label className="mt-3">Pages</label>
        <input
          name="pages"
          type="number"
          required
          defaultValue={bookData?.pages}
          className="input input-sm input-bordered"
        />
        <button
          type="submit"
          className="btn btn-sm bg-blueBtn hover:bg-hoverBlueBtn border-none mt-10 text-white"
        >
          {bookData ? "Edit Book" : "Create Book"}
        </button>
      </form>
    </div>
  )
}
