import type { IncomingMessage, ServerResponse } from 'node:http'
import app from '../src/app'

type RequestWithBody = IncomingMessage & { body?: unknown }

const readRawBody = async (req: IncomingMessage): Promise<Buffer> => {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks)
}

const toWebRequest = async (req: RequestWithBody): Promise<Request> => {
  const method = req.method || 'GET'
  const proto = (req.headers['x-forwarded-proto'] as string) || 'https'
  const host = req.headers.host || 'localhost'
  const url = new URL(req.url || '/', `${proto}://${host}`)

  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item)
      continue
    }
    if (typeof value === 'string') headers.set(key, value)
  }

  if (method === 'GET' || method === 'HEAD') {
    return new Request(url, { method, headers })
  }

  let body: BodyInit | undefined
  if (req.body != null) {
    if (Buffer.isBuffer(req.body) || typeof req.body === 'string') {
      body = req.body as Buffer | string
    } else {
      body = JSON.stringify(req.body)
      if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json')
      }
    }
  } else {
    const raw = await readRawBody(req)
    if (raw.length > 0) body = raw
  }

  return new Request(url, { method, headers, body })
}

const writeWebResponse = async (
  res: ServerResponse,
  response: Response
): Promise<void> => {
  res.statusCode = response.status

  for (const [key, value] of response.headers.entries()) {
    if (key.toLowerCase() === 'set-cookie') continue
    res.setHeader(key, value)
  }

  const setCookie = response.headers.getSetCookie?.()
  if (setCookie && setCookie.length > 0) {
    res.setHeader('set-cookie', setCookie)
  }

  const body = Buffer.from(await response.arrayBuffer())
  res.end(body)
}

export default async function handler(
  req: RequestWithBody,
  res: ServerResponse
) {
  const webReq = await toWebRequest(req)
  const webRes = await app.handle(webReq)
  await writeWebResponse(res, webRes)
}
