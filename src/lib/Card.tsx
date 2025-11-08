
import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { CircleNumber } from './CircleNumber'
import { CARD_HEIGHT, CARD_WIDTH, CELL_HEIGHT, CELL_WIDTH } from './constants'
import CardFull from './CardTemplate'
import { createPortal } from 'react-dom'
import getCardTemplate from './getCardTemplate'


export const Card = ({ index, card, onDragStart, style, ...others }: any) => {
  const [hovering, setHovering] = useState(false)
  const [dragging, setDragging] = useState(false)


  const handleDragStart = (event: any) => {
    event.stopPropagation()
    onDragStart?.(card)
    setDragging(true)
    event.dataTransfer.effectAllowed = "move";

    const $el = getCardTemplate()
    $el.style.visibility = 'hidden'
  }

  const handleDragEnd = () => {
    setDragging(false)
  }

  const handleDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
  }

  const handleMouseOver = (e: MouseEvent) => {

    const $el = getCardTemplate()
    if (!$el) return;

    $el.style.visibility = 'visible'

  }

  const handleMouseLeave = (e: MouseEvent) => {
    const $el = getCardTemplate()
    $el.style.visibility = 'hidden'
  }

  const handleMouseMove = (e: MouseEvent) => {
    const $el = getCardTemplate()

    if (!$el) return;

    const w = window.innerWidth
    const h = window.innerHeight

    const ew = $el?.clientWidth
    const eh = $el?.clientHeight


    let y = e.clientY + 10;
    let x = e.clientX + 10;




    if ((y + eh) > h) {
      y = e.clientY - eh - 10;
    }
    if ((x + ew) > w) {
      x = e.clientX - ew - 10;
    }

    $el.style.left = x + 'px';
    $el.style.top = y + 'px';
  }

  const handleClick = useCallback(function (e: MouseEvent) {


  }, [])

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className='card_preview'
        style={{
          width: CELL_WIDTH - 20,
          height: CELL_HEIGHT - 20,
          position: "absolute",
          top: 10,
          left: 10,
          background: 'white',
          border: '1px solid black',
          borderRadius: 3,
          zIndex: hovering ? 1 : 'auto',
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

    </>
  )
}
