export type CardData = {
  id: string | number
  power: number
  power_cost: number
  coin_cost: number
  cell?: number | null
  hat?: 'white' | 'gray' | 'black'
  class?: string
  control?: boolean
  type?: 'unit' | 'modifier' | 'group'
}
