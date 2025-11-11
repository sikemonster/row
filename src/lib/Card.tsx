
import { useCallback, type DragEvent } from 'react'
import { useGameState } from '../context/GameState'
import { CircleNumber } from './CircleNumber'
import { CARD_HEIGHT, CARD_WIDTH, CELL_HEIGHT, CELL_WIDTH } from './constants'
import getCardTemplate from './getCardTemplate'


export const Card = ({ index, card, location, style, ...others }: any) => {
  const { state, dispatch } = useGameState()


  const handleDragStart = useCallback((event: any) => {
    event.stopPropagation()
    event.dataTransfer.effectAllowed = "move";

    dispatch({
      type: 'setDrag',
      data: {
        location,
        card,
      }
    })

    dispatch({
      type: "showCard",
      data: null
    })

  }, [card, location])

  const handleDragEnd = useCallback((e: DragEvent) => {
    e.preventDefault()

    dispatch({ type: "setDrag" })

    dispatch({
      type: "showCard",
      data: card
    })

  }, [card])

  const handleDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
  }

  const handleMouseOver = useCallback((e: MouseEvent) => {
    e.stopPropagation()

    dispatch({
      type: "showCard",
      data: card
    })

  }, [card])

  const handleMouseLeave = (e: MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: "showCard",
      data: null
    })
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {

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
          zIndex: state.showCard === card ? 1 : 'auto',
          cursor: 'grab',
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
