import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './App.tsx'
import { GameState } from './context/GameState.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameState>
      <Game />
    </GameState>
  </StrictMode>,
)
