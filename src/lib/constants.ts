import type { CardData } from "./types";

export const HEIGHT = window.innerHeight;
export const WIDTH = window.innerWidth;


export const COLS = 9;
export const SLOTS = 14
export const ratio = 0.7247256155111507;


export const CELL_WIDTH = (WIDTH / COLS) - 1;
export const CELL_HEIGHT = CELL_WIDTH / ratio

export const CARD_WIDTH = CELL_WIDTH - 20
export const CARD_HEIGHT = CELL_HEIGHT - 20

export const HAND_WIDTH = CELL_WIDTH * 7 + 7

export const HAND = [] as any[]
export const BOARD = [] as Array<Array<CardData>>


for (let index = 0; index < SLOTS; index++) {
  HAND[index] = {
    id: index,
    power: index + 2,
    cell: null,
  } as any
}

for (let index = 0; index < SLOTS; index++) {
  BOARD[index] = []
}
