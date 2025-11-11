import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import { useGameState } from './context/GameState.tsx'
import Board from './lib/Board.tsx'
import CardHelp from './lib/CardTemplate.tsx'
import { CircleNumber } from './lib/CircleNumber.tsx'
import { CARD_HEIGHT, CARD_WIDTH, CELL_HEIGHT, CELL_WIDTH, WIDTH } from './lib/constants.ts'
import { Hand } from './lib/Hand.tsx'

function Game() {

  const [row1Power, setRow1Power] = useState([0, 0])

  const [row2Power, setRow2Power] = useState([0, 0])

  return (
    <>
      {createPortal(<CardHelp />, document.body)}

      <Board />

      <Hand />

      <CircleNumber value={0} x={CELL_WIDTH / 2 - 21} y={CELL_HEIGHT / 2 - 42 - 10} color='red' />
      <CircleNumber value={row1Power[1]} x={CELL_WIDTH / 2 - 21} y={CELL_HEIGHT / 2 + 10} color='blue' />

      <CircleNumber value={0} x={CELL_WIDTH / 2 - 21} y={CELL_HEIGHT / 2 * 3 - 42 - 10} color='red' />
      <CircleNumber value={row2Power[1]} x={CELL_WIDTH / 2 - 21} y={CELL_HEIGHT / 2 * 3 + 10} color='blue' />

      <GraveButton />

      <DeckButton />
    </>
  )
}


export default Game



function DeckButton() {
  const { state, dispatch } = useGameState()
  const { deck, dragging } = state

  const ref = useRef<HTMLButtonElement>(null)

  function handleDrop(e: React.DragEvent<HTMLButtonElement>): void {
    e.preventDefault()

    dispatch({
      type: "addCard",
      data: {
        location: 'deck',
        card: dragging?.card
      }
    })
    dispatch({
      type: "removeCard",
      data: dragging
    })
  }

  function handleDragOver(e: React.DragEvent<HTMLButtonElement>) {

    e.preventDefault()

    // if (!ref.current) return;

  }

  return <button
    ref={ref}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    onClick={() => {
      dispatch({
        type: 'draw',
      })
    }}
    style={{
      position: 'absolute',
      top: CELL_HEIGHT * 3 - CARD_HEIGHT / 2 + 2,
      left: WIDTH - CARD_WIDTH - 10,
      background: '#d3eb0c',
      fontWeight: 900,
      width: CARD_WIDTH,
      height: CARD_HEIGHT / 2
    }}>Deck ({deck.length})</button>
}


function GraveButton() {
  const { state, dispatch } = useGameState()
  const { grave, dragging } = state

  const ref = useRef<HTMLButtonElement>(null)

  function handleDrop(e: React.DragEvent<HTMLButtonElement>): void {
    e.preventDefault()

    dispatch({
      type: "addCard",
      data: {
        location: 'grave',
        card: dragging?.card
      }
    })

    dispatch({
      type: "removeCard",
      data: dragging
    })
  }

  function handleDragOver(e: React.DragEvent<HTMLButtonElement>) {

    e.preventDefault()

    // if (!ref.current) return;

  }
  return <button
    ref={ref}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    style={{
      position: 'absolute',
      top: CELL_HEIGHT * 2 + 2,
      left: WIDTH - CARD_WIDTH - 10,
      background: '#4f6072',
      color: 'white',
      fontWeight: 900,
      width: CARD_WIDTH,
      height: CARD_HEIGHT / 2
    }}>Grave ({grave.length})</button>
}
