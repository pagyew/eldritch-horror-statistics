import { games } from '../../../mocks/games'

export default defineEventHandler(async event => {
  return games
})
