// MercadoPago Webhook//
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const baseURL = process.env.API_URL
  const apiKey = process.env.API_KEY
  const apiId = process.env.API_ID

  // console.log('Key', apiKey)
  // console.log('Id', apiId)

  const url = `${baseURL}/v1/asset`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'GET',
  })

  const result = await response.json()

  return Response.json({ status: 200, success: true, result: result })
}
