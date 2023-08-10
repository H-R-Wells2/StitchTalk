# StitchTalk

StitchTalk is a text-based social media app inspired by Threads, built using Next.js, TypeScript, and Clerk authentication. The app features sophisticated styling using Tailwind CSS and Shadcn UI, and it leverages MongoDB for efficient data storage.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables
Set up the following environment variables in a .env.local file at the root of the project:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_publishable_key>
CLERK_SECRET_KEY=<your_secret_key>
NEXT_CLERK_WEBHOOK_SECRET=<your_webhook_secret>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=<your_sign_in_url>
NEXT_PUBLIC_CLERK_SIGN_UP_URL=<your_sign_up_url>
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=<your_after_sign_in_url>
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=<your_after_sign_up_url>

MONGODB_URL=<your_mongodb_url>

UPLOADTHING_SECRET=<your_uploadthing_secret>
UPLOADTHING_APP_ID=<your_uploadthing_app_id>

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Happy coding! 🚀
