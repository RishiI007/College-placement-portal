# College Placement Management System

A full-stack web application designed to simplify the college placement process by connecting students with job opportunities and helping the Training and Placement (TNP) team manage job postings and applications.

## Features

### Student
- Register and log in to the portal.
- View available job opportunities.
- Apply for jobs.
- Track application status.
- Manage personal and academic profile details.

### Training and Placement (TNP)
- Log in to the TNP dashboard.
- Create and manage job postings.
- View students who have applied.
- Manage applications and update their statuses.

## Tech Stack

**Frontend**
- Next.js
- React.js
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT authentication

**Database**
- PostgreSQL

**Tools**
- Git and GitHub
- Postman

## Project Structure

```text
Placement_Portal/
├── frontend/    # Next.js frontend
├── backend/     # Express.js backend
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Placement_Portal
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and configure the environment variables required by your application.

Example placeholders:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

Use the actual variable names expected by your backend code. Never commit your real `.env` file.

Start the backend using the script defined in your `backend/package.json`. For example, if it contains a `dev` script:

```bash
npm run dev
```

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Next.js, usually `http://localhost:3000`.

### 4. Database setup

Create a PostgreSQL database and configure the connection details in the backend environment file.

Create the required tables using your project's database schema or SQL setup scripts.

## Security

- Keep database credentials and JWT secrets in environment variables.
- Do not commit `.env` files.
- Use secure password hashing and appropriate authentication checks.

## Future Improvements

- Admin dashboard and management features.
- Deployment for online access.
- Additional placement analytics and reports.

## Author

Developed as a college placement management project.