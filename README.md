# Authentication App with React, TypeScript, and Tailwind CSS

This project is a frontend authentication system built with React, TypeScript, and Tailwind CSS, featuring user registration, login, and a dashboard view.

## Features

- User registration with form validation
- Secure login functionality
- Protected dashboard route
- Responsive design with Tailwind CSS
- Form validation using Joi
- Type-safe implementation with TypeScript

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher) or yarn
- Git (optional)

## Installation

1. **Clone the repository** (if you haven't already):

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

3. **Set up environment variables** (if needed):

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://your-api-url.com
```

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview` or `yarn preview`

Locally preview the production build.\
This will start a server that serves your built project from the `dist` folder.

### `npm test` or `yarn test`

Launches the test runner in interactive watch mode.

### `npm run lint` or `yarn lint`

Runs ESLint to check for code quality issues.

## Project Structure

```
src/
├── components/       # React components
├── hooks/            # Custom hooks
├── services/         # API services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
├── routes.tsx        # Application routes
└── index.css         # Tailwind CSS styles
```

## Dependencies

### Main Dependencies

- React 18
- TypeScript 5
- Tailwind CSS 3
- React Hook Form
- Joi (for validation)
- React Router DOM
- Axios (for HTTP requests)

### Development Dependencies

- Vite
- Vitest
- Testing Library
- ESLint
- Prettier

## Deployment

To deploy this application:

1. Run the build command:

```bash
npm run build
```

2. The production-ready files will be in the `dist` folder which you can deploy to any static hosting service like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Firebase Hosting

## Testing

The project includes unit tests for:

- Form validation
- Components
- Custom hooks

Run tests with:

```bash
npm test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
