import Link from "next/link"

export default function Books({ id, title, author, image, publisher }) {
  return (
    <Link href={`/detail/${id}`}>
      <div className="card w-full bg-second shadow-xl my-5">
        <figure>
          <img
            className="w-full h-56 object-cover"
            src={`${image}`}
            alt={`${id}-${title}`}
          />
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title">{title}</h2>
          <p>{author}</p>
          <p>{publisher}</p>
        </div>
      </div>
    </Link>
  )
}
