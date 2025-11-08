import { useState } from 'react'
import { Card } from './Card'
import { CELL_WIDTH, CELL_HEIGHT } from './constants'

export const Cell = ({ index, cell, onDrop, onCardDragStart, templateRef }: any) => {

  const [dragOver, setDragOver] = useState(false)

  const handleDrop = () => {
    onDrop(index)
    setDragOver(false)
  }




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
      {cell.map((card: any, c: any) => {
        return <Card
          key={`cell-${index}-card-${c}`}
          index={index}
          card={card}
          onDragStart={() => onCardDragStart(card, index)} />
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


