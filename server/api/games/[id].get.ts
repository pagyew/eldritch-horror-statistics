import { games } from '../../../mocks/games'

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 404,
      message: 'Game not found'
    })
  }

  const game = games.find(g => g.id === id)

  if (!game) {
    throw createError({
      statusCode: 404,
      message: 'Game not found'
    })
  }

  return game
})
