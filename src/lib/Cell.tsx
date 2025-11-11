import { useCallback, useState } from 'react'
import { Card } from './Card'
import { CELL_WIDTH, CELL_HEIGHT } from './constants'
import type { CardData } from './types'
import { useGameState } from '../context/GameState'

export const Cell = ({ index }: any) => {

  const { state, dispatch } = useGameState()

  const [dragOver, setDragOver] = useState(false)

  const cell = state.board[index]

  const { dragging } = state


  const handleDrop = useCallback(() => {
    setDragOver(false)






    dispatch({
      type: 'removeCard',
      data: dragging
    })
    dispatch({
      type: 'addCard',
      data: {
        card: dragging?.card,
        location: index
      }
    })

    dispatch({
      type: 'setDrag'
    })

  }, [dragging, index, cell])



  console.log(state.board[index])


  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      style={{
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        top: Math.floor(index / 7) * (CELL_HEIGHT + 1),
        left: (CELL_WIDTH + 1) * (index % 7) + CELL_WIDTH,
        position: "absolute",
        background: dragOver ? "#472612" : "#65372b",
      }}>
      {cell.map((card: CardData) => {
        return <Card
          key={`card-${card.id}`}
          card={card}
          location={index}
        />
      })}

      {cell.length > 1 && <div style={{
        position: 'absolute',
        top: -1, left: 0,
        background: 'white',
        border: '1px solid black',
        width: 31, height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
      }}>{cell.length}</div>}
    </div>
  )
}


