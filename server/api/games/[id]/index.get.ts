import { games } from '../../../../mocks/games'

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id') as string

  const game = games.find(g => g.id === id)

  if (!game) {
    throw createError({
      statusCode: 404,
      message: `Game with id '${id}' not found`
    })
  }

  return game
})
