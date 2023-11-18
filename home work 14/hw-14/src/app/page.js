"use client"

import Navbar from "@/components/Navbar"
import Books from "@/components/books"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await axios.get("./api/books")

      setBooks(books.data)
    }

    fetchBooks()
  }, [])

  return (
    <div className="p-5 lg:px-12">
      <Navbar />
      <Books books={books} />
    </div>
  )
}
