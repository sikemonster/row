import { act, createContext, useContext, useReducer, type ActionDispatch, type PropsWithChildren } from "react";
import type { CardData } from "../lib/types";


type GameState = {
  board: CardData[][]
  hand: CardData[]
  deck: CardData[]
  grave: CardData[]
  showCard?: CardData | null,
  dragging?: null | {
    location: string | number,
    card: CardData
  }
}


const initialGameState: GameState = {
  board: [
    [], [], [], [], [], [], [],
    [], [], [], [], [], [], [],
  ],
  hand: [],
  deck: [],
  grave: []
}


for (let i = 0; i < 14; i++) {
  initialGameState.deck[i] = {
    id: i,
    power: 0
  }
}

type Action = {
  type: string,
  data?: any
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

    case "draw":

      const deckTop = state.deck.pop()

      if (!deckTop) return state


      state.hand = arrayAdd(state.hand, deckTop)


      return { ...state }


    case "setDrag":
      state.dragging = action.data

      return { ...state }


    case 'addCard':
    case 'removeCard':
      const location = action.data.location as number | "hand" | "deck" | "grave"

      const card = action.data.card

      if (action.type === 'addCard') {
        if (typeof location === 'number') {
          const cell = state.board[location]
          state.board[location] = arrayAdd(cell, card)
        }
        else {
          state[location] = arrayAdd(state[location], card)
        }
      }

      if (action.type === "removeCard") {
        if (typeof location === 'number') {
          const cell = state.board[location]
          state.board[location] = arrayRemove(cell, card)
        } else {
          state[location] = arrayRemove(state[location], card)
        }
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


function arrayAdd<T = any>(arr: Array<T>, value: T) {
  return arr.includes(value) ? arr : [...arr, value]
}

function arrayRemove<T = any>(arr: Array<T>, value: T) {
  return arr.includes(value) ? arr.filter(v => v !== value) : arr
}
