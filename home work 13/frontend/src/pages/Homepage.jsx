import { SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Books from "../components/Books"
import { getAllBooks } from "../modules/fetch"

export default function Homepage() {
  const [books, setBooks] = useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks()
      setBooks(books)
    }
    fetchBooks()
  }, [])

  return (
    <SimpleGrid
      spacingY={5}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      display="flex"
      flexWrap="wrap"
      justifyContent="space-around"
      alignItems="center"
      width={"90%"}
      margin={"20px auto"}
    >
      {books?.books?.map((book) => (
        <Books key={`${book.id} ${book.title}`} {...book} />
      ))}
    </SimpleGrid>
  )
}
