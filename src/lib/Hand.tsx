import { useState, useEffect } from "react"
import { Card } from "./Card"
import { CARD_WIDTH, HAND_WIDTH, CELL_WIDTH, CELL_HEIGHT } from "./constants"

export const Hand = ({ hand, onDrop, onCardDragStart }: any) => {

  const [count, setCount] = useState(hand.length)

  const cardSpace = CARD_WIDTH + 1
  const totalHandWidth = cardSpace * hand.length

  const offsetTotal = Math.max(totalHandWidth - HAND_WIDTH, 0)

  useEffect(() => {
    const div = document.getElementById('hand');
    if (count < hand.length) {
      div?.scrollTo({
        left: div.scrollWidth - div.clientWidth,
        behavior: 'smooth'
      });
    }
  }, [hand.length])


  useEffect(() => {
    setCount(hand.length)
  }, [hand.length])

  return (
    <div
      id='hand'
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        position: 'absolute',
        left: CELL_WIDTH,
        top: (CELL_HEIGHT + 1) * 2,
        width: CELL_WIDTH * 7 + 6,
        height: CELL_HEIGHT,
        background: 'black',
        overflowX: 'auto',
        border: '1px solid black',
        paddingRight: 20
      }}>

      {hand.map((card: any, index: any) => {
        {/* const pos_x =  index *   (cardSpace )   */ }
        {/* const pos_x =  index * cardSpace - (totalHandWidth - HAND_WIDTH)/2  */ }
        {/* const pos_x =  index * (cardSpace - offsetAmmount  ) */ }
        let pos_x = index * (cardSpace) - (totalHandWidth - offsetTotal - HAND_WIDTH) / 2


        return (
          <Card key={'hand-' + index} card={card} onDragStart={onCardDragStart} style={{
            left: pos_x
          }} />
        )
      })}
    </div>
  )
}
