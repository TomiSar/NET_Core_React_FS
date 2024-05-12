# Complete guide to building an app with .Net Core and React

## Client Create new application

- npx create vite@latest

## install dependencies client-project

- npm i axios
- npm i semantic-ui-react@3.0.0-beta.2 semantic-ui-css
- npm i uuid
- npm i --save-dev @types/uuid
- npm i --save mobx
- npm i react-router-dom
- npm i react-calendar
- npm i @types/react-calendar
- npm i react-toastify
- npm i formik
- npm i @types/yup --save-dev
- npm i react-datepicker
- npm i @types/react-datepicker --save-dev
- npm i date-fns@3.6.0

## Run client-project

- npm start

## Documents

- https://react.semantic-ui.com/usage
- https://transform.tools/json-to-typescript
- https://mobx.js.org/README.html
- https://reactrouter.com/en/main
- https://docs.fluentvalidation.net/en/latest/aspnet.html
- https://formik.org/docs/overview

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
