import * as React from "react"
import { useState } from "react"

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [nextValue, setNextValue] = useState("X")
  const [winner, setWinner] = useState(null)

  function selectSquare(square) {
    if (squares[square] || winner) {
      return
    }

    const newSquares = [...squares]
    newSquares[square] = nextValue
    setSquares(newSquares)

    const newWinner = calculateWinner(newSquares)
    setWinner(newWinner)

    setNextValue(calculateNextValue(newSquares))
  }
  function restart() {
    setSquares(Array(9).fill(null))
    setNextValue("X")
    setWinner(null)
  }

  function renderSquare(i) {
    return (
      <button
        className="btn btn-primary w-20 h-20"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    )
  }

  const status = calculateStatus(winner, squares, nextValue)

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/2 h-[80vh]  bg-secondary m-auto rounded-xl">
        <div className="font-bold text-xl">{status}</div>
        <div className="flex justify-around w-[80%] h-1/2 items-center">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex justify-around w-[80%] h-1/2 items-center">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex justify-around w-[80%] h-1/2 items-center">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button
          onClick={restart}
          type="button"
          className="btn bg-accent hover:bg-accent-focus text-white border-none"
        >
          Mulai Ulang
        </button>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O"
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
