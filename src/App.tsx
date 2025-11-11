import { useCallback, useState } from 'react'
import './App.css'
import CardHelp from './lib/CardTemplate.tsx'
import { Cell } from './lib/Cell.tsx'
import { CircleNumber } from './lib/CircleNumber.tsx'
import { BOARD, CARD_HEIGHT, CARD_WIDTH, CELL_HEIGHT, CELL_WIDTH, HAND, WIDTH } from './lib/constants.ts'
import { Hand } from './lib/Hand.tsx'
import type { CardData } from './lib/types.ts'
import { useGameState } from './context/GameState.tsx'
import Board from './lib/Board.tsx'
import { createPortal } from 'react-dom'


function Game() {

  const { state, dispatch } = useGameState()

  const { deck, grave } = state


  const [row1Power, setRow1Power] = useState([0, 0])

  const [row2Power, setRow2Power] = useState([0, 0])



  return (
    <>
      {createPortal(
        <CardHelp />
        , document.body)}

      <Board />

      <Hand />

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
      }}>Grave ({grave.length})</button>

      <button
        onClick={() => {
          dispatch({
            type: 'draw',
          })
        }}
        style={{
          position: 'absolute'
          , top: CELL_HEIGHT * 3 - CARD_HEIGHT / 2 + 2
          , left: WIDTH - CARD_WIDTH - 10
          , background: '#d3eb0c'
          , fontWeight: 900
          , width: CARD_WIDTH
          , height: CARD_HEIGHT / 2
        }}>Deck ({deck.length})</button>



    </>
  )
}


export default Game
