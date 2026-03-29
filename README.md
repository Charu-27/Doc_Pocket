# Doc Pocket

Doc Pocket is a small web app for keeping documents organized: you can create folders, move through them with breadcrumbs, and upload files that are stored in Firebase. You sign in with email and password.

## Tools and technologies

| Area | What we use |
| ---- | ----------- |
| Interface | [React](https://react.dev/) 18 |
| UI building blocks | [React Bootstrap](https://react-bootstrap.github.io/) and [Bootstrap](https://getbootstrap.com/) 5 |
| Forms | [React Hook Form](https://react-hook-form.com/) is in the bundle; the auth screens use simple controlled fields |
| Routing | [React Router](https://reactrouter.com/) 6 |
| Icons | [Font Awesome](https://fontawesome.com/) (React package) |
| Authentication, database, file storage | [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage) |
| IDs for uploads | [uuid](https://www.npmjs.com/package/uuid) |
| Build and local server | [Create React App](https://create-react-app.dev/) (`react-scripts`) |

## How the project is laid out

```
src/
  App.js                 — routes and auth layout
  index.js               — entry, global CSS
  index.css              — theme variables and shared styles
  config/
    firebase.js          — Firebase setup (reads env variables)
  context/
    AuthContext.js       — sign-in state and auth helpers
  hooks/
    useFolder.js         — current folder, child folders, and files from Firestore
  pages/
    SplashScreen.js      — landing
    Login.js, Signup.js, ForgotPassword.js
    auth.css             — shared auth page styles
  components/
    PrivateRoute.js      — sends guests to sign-in for `/dashboard` and `/folder/:id`
    drive/
      Dashboard.js       — main library screen
      Folder.js, File.js, FolderBreadcrumbs.js
      AddFolderButton.js, AddFileButton.js
      Dashboard.css      — drive layout and cards
```

## Run it locally

1. Install [Node.js](https://nodejs.org/) (LTS is fine).
2. In this folder, install dependencies:

   ```bash
   npm install
   ```

3. Firebase expects variables in a `.env` file at the project root (same folder as `package.json`). Copy the example and fill in values from the Firebase console (**Project settings → Your apps**):

   ```bash
   cp .env.example .env
   ```

4. Start the app:

   ```bash
   npm start
   ```

   It opens at [http://localhost:3000](http://localhost:3000).

## Build for deployment

```bash
npm run build
```

Static output is in the `build` folder. Deploy that folder to any static host; set the same `REACT_APP_*` variables in your hosting provider’s environment if you build in the cloud.

## Firebase notes

Firestore needs rules that restrict `folders` and `files` to the signed-in user (for example matching `userId` to `request.auth.uid`). Storage rules should scope uploads under each user’s path. Configure those in the Firebase console.

The `.env` file is listed in `.gitignore` so keys are not committed. Use `.env.example` as the checklist of required variable names.
