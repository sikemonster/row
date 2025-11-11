import { useGameState } from "../context/GameState"
import Circle from "./Circle"

const textBg = '#f4e8bb'



export default function CardFull() {


  const { state } = useGameState()

  const card = state.showCard


  return (
    <>
      <div id="card_template" className={'card'} style={{
        position: 'fixed',
        zIndex: 3,
        backgroundColor: '#052939',
        visibility: card ? 'visible' : 'hidden',
      }}>

        <div className={"header"} style={{
          backgroundColor: textBg,

        }}>{card?.name ?? 'Unnamed'}</div>

        <div className="artwork" style={{
          height: 256,
          backgroundImage: 'none'
        }} />

        <div className="description" style={{
          backgroundColor: textBg,
        }}>
          <div className="cost_class">
            <Circle>{card?.power_cost ?? 0}</Circle>
            <Circle bg={"gold"}>{card?.coin_cost ?? 0}</Circle>
            <span className="class">{card?.["class"] ?? 'Unknown'}</span>
          </div>
          {card?.description ?? 'No description'}
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


        }}>{card?.power ?? 0}</div>
      </div>
    </>
  )
}
