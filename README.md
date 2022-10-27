# NextJS Smart Contract Lottery Front End

## How To: Build, Deploy, Run

1. To create your own NextJS project, just run `yarn create next-app .`
2. `yarn run dev` to start your own local server
3. `yarn add --dev prettier`

## How This Works

- "pages" are essentially your routes to different pages. For example, if you create helloworld.js under `pages/`, and go to `localhost:3000/helloworld`, that will render whatever code you have written in `pages/`
- the `import` keyword works with our front end, but `require` does not. this is where the differences between back end nodejs vs front end nextjs start to arise.
- `_app.js` is your entry point for everything in your NextJS app. All the other routes mentioned above are referred to as `components`. All pages get wrapped into the component section of `_app.js`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
