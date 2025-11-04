
import { useState, type DragEvent } from 'react'
import { CARD_HEIGHT, CARD_WIDTH, CELL_HEIGHT, CELL_WIDTH } from './constants'
import { CircleNumber } from './CircleNumber'

export const Card = ({ index, card, onDragStart, style, ...others }: any) => {
  const [hovering, setHovering] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleDragStart = (event: any) => {
    event.stopPropagation()
    onDragStart?.(card)
    setDragging(true)
    event.dataTransfer.effectAllowed = "move";
  }

  const handleDragEnd = () => {
    setDragging(false)
  }

  const handleDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
  }

  const handleMouseOver = () => {
    setHovering(true)
  }
  const handleMouseLeave = () => {
    setHovering(false)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={{
        width: CELL_WIDTH - 20,
        height: CELL_HEIGHT - 20,
        position: "absolute",
        top: 10,
        left: 10,
        background: 'white',
        border: '1px solid black',
        borderRadius: 3,
        zIndex: hovering ? 2 : 'auto',
        cursor: hovering ? 'grab' : dragging ? 'grabbing' : 'auto',
        ...style
      }}

      {...others}
    >

      <div style={{
        color: 'black'
      }}>{card.id}</div>

      <CircleNumber value={card.power} size={32} x={CARD_WIDTH / 2 - 32 / 2} y={CARD_HEIGHT - 32 - 5} />

    </div>
  )
}
