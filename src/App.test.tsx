import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import App from './App'
import { server } from './mocks/server'

test('fetched image for every contact', async () => {
  render(<App />)

  const loadingMessage = screen.getByRole('alert', {name: /loading message/i})
  expect(loadingMessage).toBeInTheDocument()
  
  const contactsAvatars: HTMLImageElement[] =
    await screen.findAllByRole('img', {name: /avatar/i})
  expect(contactsAvatars).toHaveLength(3)

  const altText = contactsAvatars.map(el => el.alt)
  expect(altText).toEqual([
    'Jon Snow avatar',
    'Valentino Rossi avatar',
    'Snoop Dogg avatar'
  ])
})

test('displays no results message if contacts array is empty', async () => {
  server.resetHandlers(
    rest.get('https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/', (req, res, ctx) => {
      return res(ctx.json([]))
    })
  )

  render(<App />)

  const noResultsMessage = await screen.findByRole('alert', { name: /no results message/i })
  expect(noResultsMessage).toBeInTheDocument()
})

test('displays error alert on server error', async () => {
  server.resetHandlers(
    rest.get('https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<App />)

  const errorMessage = await screen.findByRole('alert', { name: /error message/i })
  expect(errorMessage).toBeInTheDocument()
})
