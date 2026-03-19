import app from './app'

if (import.meta.main) {
  app.listen(8000)
  console.log(
    `Elysia is running at ${process.env.HOSTNAME || 'localhost'}:${app.server?.port}`
  )
}

export default app
