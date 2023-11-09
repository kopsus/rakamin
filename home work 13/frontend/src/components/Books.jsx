import { Heading, Text, Box, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Box
        maxW={"400px"}
        minW={"200px"}
        maxH={"550px"}
        minH={"300px"}
        w={"full"}
        h={"full"}
        bgColor="red.500"
        backgroundColor="red.200"
        border={"1px"}
        borderColor={"green.200"}
        borderRadius={"10px"}
        _hover={{
          transform: "scale(1)",
          transitionDuration: "0.4s",
          transitionTimingFunction: "ease-in-out",
          boxShadow: "dark-lg",
        }}
      >
        <Box>
          <Heading size="xs" textAlign="center" m="5px" pt="5px" height="50px">
            {title}
            <br />({year})
          </Heading>
        </Box>
        <Box>
          <Image
            width={"350px"}
            height={"200px"}
            src={`http://localhost:8000/${image}`}
          />
        </Box>
        <Box>
          <Text
            fontSize="x-small"
            fontStyle="italic"
            mt="10px"
            p="10px"
            textAlign="start"
          >
            Author : {author}
            <br />
            Publisher : {publisher}
          </Text>
        </Box>
      </Box>
    </Link>
  )
}
