const Books = ({ books }) => {
  return (
    <>
      {books.map((books) => (
        <div
          key={books.id}
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3"
        >
          <div className="card w-full bg-second shadow-xl my-5">
            <figure>
              <img
                src="https://i.pinimg.com/564x/0f/a1/8c/0fa18c26eeaf40ca61de907d74812ffe.jpg"
                alt="Book"
                className="h-56 w-full object-cover"
              />
            </figure>
            <div className="card-body p-3">
              <h2 className="card-title">{books.title}</h2>
              <p>{books.author}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Books
