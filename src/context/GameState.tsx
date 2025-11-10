import { createContext, useContext, useReducer, type ActionDispatch, type PropsWithChildren } from "react";
import type { CardData } from "../lib/types";


type GameState = {
  showCard?: CardData | null,
  board: CardData[][]
  hand: CardData[]
}

type Action = {
  type: string,
  data?: any
}

const initialGameState: GameState = {
  showCard: null,
  board: [
    [], [], [], [], [], [], [],
    [], [], [], [], [], [], [],
  ],
  hand: []
}

const GameStateContext = createContext<{
  state: GameState,
  dispatch: ActionDispatch<[Action]>
}>({
  state: initialGameState,
  dispatch: () => { }
})



export function GameState(props: PropsWithChildren) {

  const [state, dispatch] = useReducer(gameStateReducer, initialGameState)

  return (
    <>
      <GameStateContext.Provider value={{ state, dispatch }}>
        {props.children}
      </GameStateContext.Provider>
    </>
  )
}


export function useGameState() {
  return useContext(GameStateContext)
}


function gameStateReducer(state: GameState, action: Action) {

  console.log(action.type, action.data)

  switch (action.type) {
    case 'handRemove':
      state.hand = state.hand.filter(c => c !== action.data.card)

      return { ...state }

    case 'handAdd':
      state.hand = [
        ...state.hand,
        action.data.card
      ]

      return { ...state }



    case 'boardRemove':
    case 'boardAdd':
      const cell = Number(action.data.cell)
      const card = action.data.card

      if (action.type === 'boardRemove') {
        state.board[cell] = state.board[cell].filter(c => c !== card)
      }

      if (action.type === "boardAdd") {
        state.board[cell] = [
          ...(state.board[cell]),
          card
        ]
      }

      state.board = [...state.board]

      return {
        ...state
      }




    case "showCard":
      state.showCard = action.data
      return {
        ...state,
      };



    default: {
      throw new Error(`No action called ${action.type}`)
    }
  }

}
