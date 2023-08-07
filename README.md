# eCommerce-Application 🛍️🌐

Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment 🏪. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

Users can browse through a vast range of products 📚👗👟, view detailed descriptions, add their favorite items to the basket 🛒, and proceed to checkout 💳. It includes features such as user registration and login 📝🔐, product search 🔍, product categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

## Technology Stack

- [React](https://react.dev/)
- [Redux Toolkit and RTK Query](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

Backend is provided by [CommerceTools](https://commercetools.com/) - a leading provider of commerce solutions for B2C and B2B enterprises. CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences.

## Installation

To install and run the application on your local machine, follow these steps:

- Download application files from [repository](https://github.com/olgamarkevich/ecommerce-application).

- Use `npm install` to install dependencies (you should have installed [node.js](https://nodejs.org/)).

- Add file `.env` with environment variables (`REACT_APP_PROJECT_KEY`, `REACT_APP_CLIENT_SECRET`,`REACT_APP_CLIENT_ID`, `REACT_APP_AUTH_URL`, `REACT_APP_API_URL` and `REACT_APP_SCOPES` with api keys). *This project uses backend from [CommerceTools](https://commercetools.com/) and CommerceTools ClientAPI should be created to get api keys.*

- Run `npm start` to start project on [http://localhost:3000](http://localhost:3000) with your browser or `npm run build` to build for production.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run format`

This command uses Prettier to automatically format the source code in the project. Prettier is a code formatting tool that helps maintain consistent code style and improves code readability.

When you run this command, Prettier will format all TypeScript files in the src directory and its subdirectories according to the rules specified in the .prettierrc configuration file.

To customize the code formatting rules, you can modify the .prettierrc file in the root directory of the project.

Keep in mind that running this command will automatically update your code to comply with the defined formatting rules. It's recommended to run this command before committing changes to ensure a consistent code style throughout the project.

### `npm run lint`

This command is essential for maintaining code quality within project.

By utilizing ESLint, a powerful code analysis tool for JavaScript and TypeScript, this command scans codebase for patterns, adherence to coding standards, and deviations from style guide. Running this command helps to identify potential issues and maintain a consistent and easily maintainable codebase.

Any detected problems will be reported through descriptive messages, aiding developers in effectively addressing them. As an integral part of our development workflow, this command ensures that code meets the highest quality standards while adhering to the defined coding conventions.

### `npm run lint:fix`

This command is essential for maintaining code quality within project and automatically initiate fixes for a wide array of detected problems.

Fueled by the capabilities of ESLint, a potent JavaScript and TypeScript code analysis tool, this command takes center stage in scrutinizing codebase. It diligently inspects patterns, evaluates adherence to coding standards, and identifies deviations from our style guide. What sets this command apart is its dynamic ability to not only pinpoint issues but also automatically initiate fixes for a wide array of detected problems.

By embracing this command, we ensure that code not only meets stringent quality benchmarks but also aligns harmoniously with our meticulously defined coding conventions. Embracing this command as an integral component of development workflow empowers us to bolster code integrity, fostering a landscape of uniformity, maintainability, and proactive issue resolution.

### `npm run prepare`

This command automatize git workflow to ensure that each code commit conforms to an agreed standard.

By integrating this into your git workflow with the pre-commit hooks, you can catch errors and inconsistencies very early on.

Husky is a robust tool that enhances our development workflow by automating tasks in response to Git events. When you execute this command, it automatically triggers pre-commit hooks, ensuring that our codebase is always in top shape before any commits are made.

By integrating Husky, we ensure that code linting, formatting, and other preparatory tasks are seamlessly handled before they become part of our version control history. This command, coupled with Husky's capabilities, guarantees consistent code quality, adherence to coding standards, and a hassle-free development experience. 
