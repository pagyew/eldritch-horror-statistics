export default defineEventHandler(async event => {
  if (event.path.includes('api')) {
    console.log('Delayed 1s for API')
    await delay(1000)
  }
})
