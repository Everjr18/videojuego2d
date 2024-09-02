// MercadoPago Webhook//
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const baseURL = process.env.API_URL
  const apiKey = process.env.API_KEY
  const apiId = process.env.API_ID

  // console.log('Key', apiKey)
  // console.log('Id', apiId)

  const url = `${baseURL}/v1/request`

  const imageRequest = {
    data: {
      prompt:
        'A futuristic city skyline at sunset with flying cars and tall skyscrapers.',
    },
    generator: 'stability-text-to-image',
    generator_parameters: {
      resolution: '1024x1024',
      style: 'cyberpunk',
      color_scheme: 'vibrant',
    },
    options: {
      description:
        'Generate an image based on the prompt with a futuristic and vibrant theme.',
    },
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: { ...imageRequest },
    method: 'POST',
  })

  // const response = await fetch(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${apiKey}`,
  //   },
  //   method: 'GET',
  // })

  const result = await response.json()

  return Response.json({ status: 200, success: true, result: result })
}
