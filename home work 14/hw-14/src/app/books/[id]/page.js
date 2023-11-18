import Navbar from "@/components/Navbar"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function getData(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
    })
    return book
  } catch (error) {
    console.log(error)
  }
}

const BooksDetail = async ({ params }) => {
  const { id } = params
  const data = await getData(+id)

  return (
    <div className="p-5 lg:px-12">
      <Navbar />
      <div className="bg-navbar flex flex-col rounded-md my-5 overflow-hidden md:flex-row md:items-center md:gap-10 md:justify-center md:w-full md:my-10 md:min-h-[50vh] lg:min-h-[70vh]">
        <div className="">
          <img
            src="https://i.pinimg.com/564x/0f/a1/8c/0fa18c26eeaf40ca61de907d74812ffe.jpg"
            alt=""
            className="h-48 w-full object-cover lg:h-60"
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <p>Title : {data.title}</p>
          <p>Author : {data.author}</p>
          <p>Publisher : {data.publisher}</p>
          <p className="text-sm">Year : {data.year}</p>
          <p className="text-sm">Pages : {data.pages}</p>
          <div className="flex mt-5 gap-3 justify-end md:justify-start">
            <button className="btn btn-sm text-white bg-greenBtn hover:bg-green-700">
              Update
            </button>
            <button className="btn btn-sm text-white bg-redBtn hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BooksDetail
