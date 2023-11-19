import Wrapper from "@/components/Wrapper"
import { useRouter } from "next/router"
import Link from "next/link"
import { deleteBook } from "@/modules/fetch"
import { prisma } from "@/utils/prisma"
// import Image from "next/image";

export default function BookDetails({ book }) {
  const router = useRouter()

  const handleDeleteBook = async () => {
    try {
      await deleteBook(router.query.id)
      router.push("/Books")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Wrapper>
      <div className="bg-navbar flex flex-col rounded-md my-5 overflow-hidden md:flex-row md:items-center md:gap-10 md:justify-center md:w-[70%] md:mx-auto md:my-10 md:min-h-[50vh] lg:min-h-[70vh]">
        <div className="">
          <img
            src={book.image}
            alt=""
            className="h-48 w-full object-cover lg:h-60"
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <p>Title : {book.title}</p>
          <p>Author : {book.author}</p>
          <p>Publisher : {book.publisher}</p>
          <p className="text-sm">Year : {book.year}</p>
          <p className="text-sm">Pages : {book.pages}</p>
          <div className="flex mt-5 gap-3 justify-end md:justify-start">
            <Link
              href={`/edit/${router.query.id}`}
              className="btn btn-sm text-white bg-greenBtn hover:bg-green-700"
            >
              Update
            </Link>
            <button
              onClick={handleDeleteBook}
              className="btn btn-sm text-white bg-redBtn hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export async function getStaticPaths() {
  // get all books id
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  })
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }))
  return {
    paths: paths,
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(context.params.id) },
    })
    return {
      props: {
        book,
      },
      revalidate: 10,
    }
  } catch (e) {
    console.log(e)
    return {
      props: {},
    }
  }
}
