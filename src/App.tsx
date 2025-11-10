import { useCallback, useState } from 'react'
import './App.css'
import CardHelp from './lib/CardTemplate.tsx'
import { Cell } from './lib/Cell.tsx'
import { CircleNumber } from './lib/CircleNumber.tsx'
import { BOARD, CARD_HEIGHT, CARD_WIDTH, CELL_HEIGHT, CELL_WIDTH, HAND, WIDTH } from './lib/constants.ts'
import { Hand } from './lib/Hand.tsx'
import type { CardData } from './lib/types.ts'
import { useGameState } from './context/GameState.tsx'


function Game() {

  const { state, } = useGameState()

  const [board, setBoard] = useState(BOARD)

  const [hand, setHand] = useState(HAND)

  const [row1Power, setRow1Power] = useState([0, 0])

  const [row2Power, setRow2Power] = useState([0, 0])

  const [dragging, setDragging] = useState<CardData | null>(null)

  const removeFromHand = (card: CardData | null) => {
    const index = hand.indexOf(card)
    if (index > -1) {
      setHand(h => {
        h.splice(index, 1)
        return [...h]
      })
    }
  }


  const cellRemove = useCallback((cell: number, card: CardData) => {
    setBoard(b => {
      const index = b[cell].indexOf(card)
      if (b[cell].includes(card)) {

        b[cell].splice(index, 1)

        const power = card?.power ?? 0

        if (cell <= 6) {
          setRow1Power(p => [p[0] - power, p[1] - power])
        }
        if (cell > 6) {
          setRow2Power(p => [p[0] - power, p[1] - power])
        }
      }
      return [...b]
    })
  }, [setBoard]);



  const cellAdd = useCallback((cell: number, card: CardData) => {
    setBoard(b => {
      if (!b[cell].includes((card))) {
        b[cell].push(card)

        const power = card?.power ?? 0

        if (cell <= 6) {
          setRow1Power(p => [p[0] + power, p[1] + power])
        }
        if (cell > 6) {
          setRow2Power(p => [p[0] + power, p[1] + power])
        }
        return [...b]
      }
      return b
    })
  }, [setBoard])



  const handleCellDrop = useCallback((newCell: any) => {
    const oldCell = dragging?.cell


    if (hand.includes(dragging)) {
      removeFromHand(dragging)
    } else {
      oldCell && cellRemove(oldCell, dragging)
    }

    if (dragging) {

      cellAdd(newCell, dragging)
      dragging.cell = newCell
    }


    setBoard(b => {
      return [...b]
    })

    setDragging(null)
  }, [dragging, cellRemove, board, hand])



  const handleHandDrop = useCallback((event: DragEvent) => {
    event.stopPropagation()
    event.preventDefault()

    setHand(h => {

      // remove from board
      const cell = dragging?.cell

      cell && cellRemove(cell, dragging)

      setDragging(null)

      // add to hand if not there
      if (!!dragging && !hand.includes(dragging)) {
        h.push(dragging)
        dragging.cell = null
        return [...h]
      }
      return h

    })
  }, [dragging, board])


  const handleCardDragStart = (card: CardData) => {
    setDragging(card)
  }


  return (
    <>

      <CardHelp show={!!state.showCard} card={state.showCard as CardData} />

      {board.map((cell, index) => {
        return (
          <Cell
            key={"cell-" + String(index)}
            index={index}
            cell={cell}
            onCardDragStart={handleCardDragStart}
            onDrop={handleCellDrop}
          />

        )
      })}


      <Hand hand={hand} onDrop={handleHandDrop} onCardDragStart={handleCardDragStart} />

      <CircleNumber value={0} x={CELL_WIDTH / 2 - 21} y={CELL_HEIGHT / 2 - 42 - 10} color='red' />
      <CircleNumber value={row1Power[1]} x={CELL_WIDTH / 2 - 21} y={CELL_HEIGHT / 2 + 10} color='blue' />

      <CircleNumber value={0} x={CELL_WIDTH / 2 - 21} y={CELL_HEIGHT / 2 * 3 - 42 - 10} color='red' />
      <CircleNumber value={row2Power[1]} x={CELL_WIDTH / 2 - 21} y={CELL_HEIGHT / 2 * 3 + 10} color='blue' />

      <button style={{
        position: 'absolute'
        , top: CELL_HEIGHT * 2 + 2
        , left: WIDTH - CARD_WIDTH - 10
        , background: '#4f6072'
        , color: 'white'
        , fontWeight: 900
        , width: CARD_WIDTH
        , height: CARD_HEIGHT / 2
      }}>Grave (10)</button>

      <button style={{
        position: 'absolute'
        , top: CELL_HEIGHT * 3 - CARD_HEIGHT / 2 + 2
        , left: WIDTH - CARD_WIDTH - 10
        , background: '#d3eb0c'
        , fontWeight: 900
        , width: CARD_WIDTH
        , height: CARD_HEIGHT / 2
      }}>Deck (32)</button>



    </>
  )
}


export default Game
