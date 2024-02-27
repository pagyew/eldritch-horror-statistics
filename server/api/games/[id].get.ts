export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  const game = MOCK_GAMES.find(g => g.id === id)

  if (!game) {
    throw createError({
      statusCode: 404,
      message: `Game with id '${id}' not found`
    })
  }

  return game
})
