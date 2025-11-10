export type CardData = {
  id?: string | number
  name?: string
  power?: number
  description?: string
  power_cost?: number
  coin_cost?: number
  cell?: number | null
  class?: string
  control?: boolean
  hat?: 'white' | 'gray' | 'black'
  type?: 'unit' | 'modifier' | 'group'

  artwork?: {
    url: string,
    size: string,
    position: string,
  }
}
