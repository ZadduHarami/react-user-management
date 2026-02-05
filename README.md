# React User Management (CRUD Application)

This project is a simple React-based CRUD application built using **Vite**, **React**, and **TypeScript**.  
It allows users to create, view, update, and delete user records and is designed with extensibility and clean coding practices in mind.

---

## Tech Stack
- React (Vite)
- TypeScript
- Material UI (MUI)
- Axios
- json-server (mock API)

---

## Features
- Create, Read, Update, and Delete users
- Input validation with clear error messages
- Loading indicators for API actions
- Success and error messages for user actions
- Configuration-driven form for easy extensibility
- Clean and responsive UI using Material UI

---

## Setup Instructions

Follow the steps below to run the project locally.

### Step 1: Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <PROJECT_FOLDER_NAME>
```


### Step 2: Install dependencies

This project uses Vite as the build tool.

npm install


### Step 3: Start the mock API (json-server)

Since no backend API was provided, a mock API is used for development and testing.

npm run mock:api

This starts the mock server at:

http://localhost:4000

⚠️ Keep this terminal running.


### Step 4: Start the frontend application

Open a new terminal window, then run:

npm run dev


The application will be available at:

http://localhost:5173

---

### Mock API Setup (json-server)

- The mock API is powered by json-server
- Data is stored in the db.json file at the project root
- Supports GET, POST, PUT, and DELETE operations
- Used because no real backend API was provided
- Can be replaced easily with a real backend by updating the API base URL

---

## Adding New Fields to the Form

The user form is configuration-driven.

To add a new field, update the field configuration file:

src/utils/userFields.ts

Example:
```ts
{
  name: "address",
  label: "Address",
  required: false
}
```

Once added:

- The field appears automatically in Add and Edit forms
- The field also appears in the Users list table
- No UI or API logic changes are required

---

## Validation Rules

- All required fields are enforced
- Email input is validated for correct format
- Phone number must be exactly 10 digits 
- Inline error messages are shown for invalid inputs

---

## Git Usage

- Meaningful and incremental commit messages are used
- Commit history reflects the development flow
- Code is organized into clear folders:
```
- components
- pages
- api
- utils
- types
```
- Follows standard Git and React project structure

---

## Deployment

- The application is deployed using Vercel.
- The deployed app demonstrates the UI, layout, and user flow
- Since the backend API is a local mock (json-server), CRUD operations are best verified in the local setup
- For full functionality, please run the application locally using the steps above

Deployed URL:
(https://react-user-management-vert.vercel.app/)

---

## Assumptions & Design Decisions

- Assumptions & Design Decisions
- Used json-server since no backend API was provided
- Chose a configuration-driven architecture to support easy extensibility
- Kept validation logic simple and readable without heavy form libraries
- Used Material UI to avoid custom CSS and maintain consistency

---

## Notes

- The deployed application does not persist or modify data due to the absence of a production backend API
- Full CRUD functionality can be verified by running the project locally
- The mock API can be replaced easily with a real backend by updating the API base URL