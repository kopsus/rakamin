import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteBook, getBookDetailById } from "../modules/fetch"

export default function BookDetails() {
  const [book, setBook] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id)
        setBook(response.book)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchBook()
  }, [id])

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id)
      navigate("/")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Center
      background="linear-gradient(to top, #051937, #2d4b62, #64818b, #a7b9b9, #eff2f1)"
      minH={"86vh"}
      w={"100%"}
      marginTop={"0"}
    >
      <Box>
        {isLoading ? (
          <Skeleton height="300px" my="4" />
        ) : (
          <Flex my="4">
            <Box w="300px">
              <Image
                src={`http://localhost:8000/${book.image}`}
                alt={book.title}
              />
            </Box>
            <Box ml="8">
              <Heading as="h1" size="lg">
                {book.title}
              </Heading>
              <Text fontSize="xl" fontWeight="semibold" color="white">
                {book.author}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="white">
                {book.publisher}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="white" mb="4">
                {book.year} | {book.pages} pages
              </Text>
            </Box>
          </Flex>
        )}
        {localStorage.getItem("token") && (
          <HStack>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="red">Delete</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete this book?
                </PopoverBody>
                <Button onClick={handleDeleteBook} colorScheme="red">
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
            <Link to={`/editbook/${id}`}>
              <Button>Edit</Button>
            </Link>
          </HStack>
        )}
      </Box>
    </Center>
  )
}
