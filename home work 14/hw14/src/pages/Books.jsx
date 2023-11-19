import React from "react"
import Books from "@/components/Books"
import Wrapper from "@/components/Wrapper"
import { prisma } from "@/utils/prisma"

const Book = (props) => {
  return (
    <Wrapper>
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
        {props?.books?.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
        ))}
      </div>
    </Wrapper>
  )
}

export default Book

export async function getServerSideProps() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
    })
    return {
      props: {
        books,
      },
    }
  } catch (err) {
    console.error(err)
    if (res) {
      return res.status(400).json({ message: "Terjadi kesalahan" })
    }
  }
}
