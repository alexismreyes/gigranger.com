## Employment Platform🧑‍💼

A full-featured job portal application that allows recruiters to post and manage job listings, and job seekers to find, apply, and track job applications. This project showcases real-world features such as authentication, role-based access, file uploads, filtering, email notifications, and application history tracking — built with production-ready technologies.

## 📌 Disclaimer

This app began as a personal initiative to practice and explore full-stack development concepts using modern tools like React, Node.js, MySQL, and AWS. While it may not follow a single strict standard across all components — for instance, some forms use Dialogs while others use Formik, and error handling varies between Axios responses and `console.error` — this was intentional.

The goal has always been to build a progressively enhanced application while experimenting with different patterns, tools, and technologies. As it evolved, I incorporated more real-world features such as file uploads, email notifications, role-based access control, protected routes, and application history.

It is not yet fully optimized nor finalized, and I plan to continue improving it with technologies like RabbitMQ, WebSockets, and more advanced backend patterns. This app is meant to be a learning-driven, functional foundation of a job portal, reflecting growth, curiosity, and hands-on problem solving.

So don’t judge it by perfection 😄

## 🚀 Features

👥 **Authentication & Authorization**

- JWT-based login & registration

- Email verification for new users

- Role-based access (Admin, Recruiter, Job Seeker)

- Route protection with dynamic rendering based on user role

🡳 **Recruiter Functionality**

- Create, update, and delete company profiles

- Post job listings with detailed descriptions

- Track job applications submitted to their jobs

- Update application statuses with comments (hiring pipeline)

- Receive email notifications when a candidate applies

🡩‍🎓 **Job Seeker Functionality**

- View available jobs and filter by category, company, or keyword

- Submit job applications with resume uploads

- Track application status with detailed history

- Receive email notifications on status updates

📄 **File Handling**

- Resume upload with file storage via Multer

- View resumes directly from job applications list

📬 **Notifications**

- Email alerts via Nodemailer (for both recruiters and applicants)

📊 **User Interface**

- Responsive layout using **Material UI**

- Intuitive admin panel with Drawer navigation, modals, tables, and
  pagination

- Inline feedback using Snackbars and confirmation dialogs

⚙️ **Admin Functionality**

- Full CRUD for users, companies, jobs, categories, statuses

- Filter and search functionality for easier record management

## 💠 Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| **Frontend**   | React + Vite, TypeScript, Material UI, Axios    |
| **Backend**    | Node.js, Express, Sequelize ORM, Multer, JWT    |
| **Database**   | MySQL (AWS RDS)                                 |
| **Auth**       | JWT + Bcrypt, Context API                       |
| **Deployment** | S3 (frontend), Elastic Beanstalk (backend), RDS |
| **Dev Tools**  | Postman, Jest, Supertest, ESLint, Prettier      |

## 📁 Project Structure

```plaintext
employment-app/
│	README.md
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middlewares/
│   ├── test/
│   ├── uploads/              # Resume storage
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.*
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── validations/
│   │   ├── interfaces/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── themes/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── .env.*
```

## 🧩 Installation Guide

1. Clone the Repository

2. Install Backend Dependencies

3. Install Frontend Dependencies

4. Import the Database (Make sure the database `employment_db` exists or create it manually)

5. Configure Environment Files

Copy and adjust the `.env.development` files in both `backend` and `frontend` folders as shown below.

> ⚠️ **Important:** Use a real email address in your `.env` file to enable the notification system and for the registered users to receive email notifacations about job applications.

> ⚠️ **Important:** All the users included in the dumped database uses the password 123456789.

## 🔐 Environment Variables

Backend .env.development

    PORT=4000
    DB_HOST=localhost
    DB_NAME=employment_db
    DB_USER=root #your DB user
    DB_PASSWORD=yourpassword #your DB password
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@example.com #The main email account from which app will send the emails
    EMAIL_PASS=your_email_password #The password from that main email account
    FRONTEND_URL=http://localhost:5173

Frontend .env.development

      VITE_API_URL=http://localhost:4000/api/v1

✅ Use .env.production files for deployment, replacing localhost URLs with actual production domains or IPs.

## 🧪 Testing

- Backend tested with Jest and Supertest

- Token validation and protected routes tested with mock JWTs

- Services and context logic covered with custom hooks and mock APIs

## 🗃️ Database Setup

This project includes a MySQL database dump in the root of the project to get you started quickly.

1.  Import the dump

Make sure the employment_db exists or create it first:

## **🌐 Current Deployment**

You can try out the app here:

http://employmentapps3.s3-website.us-east-2.amazonaws.com/

✅ Frontend: AWS S3 Static Hosting

✅ Backend API: AWS Elastic Beanstalk

✅ Database: AWS RDS (MySQL)

## 👨‍💼 **Author & Contact**

**Marlon Alexis Manzano Reyes**
Full Stack Developer | React | Node.js | MySQL | Express.js | Typescript
📍 San Salvador, El Salvador
📧 malexismreyes@gmail.com
🌐 https://www.linkedin.com/in/alexismreyes/

## 📦 Frontend Architecture

The frontend follows a **Component-Driven Development (CDD)** approach, emphasizing separation of concerns:

- **Services** handle all API communication (e.g., `JobService`, `AuthService`).
- **Hooks** (e.g., `useJobCategories`, `useAuth`) encapsulate logic and data fetching.
- **Components** like tables, dialogs, and form inputs focus on UI rendering.
- **Pages** use these building blocks to compose full features.

This modular pattern improves reusability, testing, and clarity across the UI codebase.
