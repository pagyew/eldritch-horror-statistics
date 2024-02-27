export default defineEventHandler(async event => {
  const body = await readBody(event)
  const game = body as IGame

  console.log(game)

  return game
})
