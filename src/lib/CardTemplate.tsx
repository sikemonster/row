import { useMemo, useRef, type CSSProperties, type Ref, type StyleHTMLAttributes } from "react"
import Circle from "./Circle"
import type { CardData } from "./types"

const textBg = '#f4e8bb'

type CardFullProps = {
  x?: number
  y?: number
  card?: CardData
  show?: boolean
  templateref?: Ref<HTMLDivElement>

  style?: StyleHTMLAttributes<HTMLDivElement>
}


export default function CardFull(props: CardFullProps) {

  const ref = useRef<HTMLDivElement>(null)

  const { card, show = false, x, y, style } = props





  return (
    <>
      <div id="card_template" className={'card'} style={{
        backgroundColor: '#052939',
        zIndex: 9,
        ...style
      }}>

        <div className={"header"} style={{
          backgroundColor: textBg,

        }}>{card?.name ?? 'Unnamed'}</div>

        <div className="artwork" style={{
          height: 256
        }} />

        <div className="description" style={{
          backgroundColor: textBg,
        }}>
          <div className="cost_class">
            <Circle>{card?.power_cost ?? 0}</Circle>
            <Circle bg={"gold"}>{card?.coin_cost ?? 0}</Circle>
            <span className="class">{card?.["class"] ?? 'N/A'}</span>
          </div>
          {card?.description}
        </div>


        <div style={{
          width: 32, height: 32,
          borderRadius: '100%',
          border: '1px solid black',
          position: 'absolute',
          bottom: 10, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          background: 'white',
          fontFamily: 'Georgia, serif',


        }}>{10}</div>
      </div>
    </>
  )
}
