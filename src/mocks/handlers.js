import { rest } from 'msw';

export const handlers = [
  rest.get('https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/', (req, res, ctx) => {
    return res(
      ctx.json([
        { avatar: 'https://images.com/image1.jpg', name: 'Jon Snow', id: '123' },
        { avatar: 'https://images.com/image2.jpg', name: 'Valentino Rossi', id: '456' },
        { avatar: 'https://images.com/image3.jpg', name: 'Snoop Dogg', id: '789' },
      ])
    )
  })
]
