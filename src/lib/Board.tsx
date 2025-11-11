import { useGameState } from "../context/GameState"
import { Cell } from "./Cell"


export default function Board() {
  const { state, } = useGameState()

  const { board } = state


  return <>
    {board.map((cell, index) => {
      return (
        <Cell
          key={"cell-" + String(index)}
          index={index}
          cell={cell}
        />
      )
    })}
  </>
}
