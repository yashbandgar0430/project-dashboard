# 🚀 Project & Team Collaboration Dashboard (SaaS Admin Panel)

A fully responsive and modern SaaS-style Admin Dashboard built using **Next.js, Firebase, and Tailwind CSS**.  
This project was developed from scratch as part of an internship assessment and includes real-world features like authentication, task management, workspace projects, activity tracking, and analytics UI.

---

# 👨‍💻 Author
**Yash Bandgar**

---

# 📌 Project Overview

This project is a **complete admin dashboard system** where users can:

- Register/Login securely using Firebase Authentication
- Create and manage tasks
- Track task status (Todo / In Progress / Completed)
- Create workspace projects
- View real-time activity logs
- Use calendar and dashboard analytics UI
- Admin panel with user management (role-based)

---

# ⚙️ Tech Stack

- Next.js (App Router)
- React.js
- TypeScript
- Firebase Authentication
- Firestore Database
- Tailwind CSS
- React Calendar
- Drag and Drop (@hello-pangea/dnd)

---

# ✨ Features Implemented

## 🔐 Authentication System
- Email & Password Signup/Login
- Firebase Authentication integration
- Role-based admin access (Admin Dashboard)

---

## 📊 Task Management System
- Create Tasks
- Update Task Status (Todo → Progress → Done)
- Delete Tasks
- Drag & Drop Task Management
- Real-time Firestore updates

---

## 🧑‍💼 Workspace / Project System
- Create Projects (Workspace feature)
- View all projects in responsive grid
- Store project data in Firestore
- Admin-level project management

---

## 📅 Calendar Integration
- Interactive calendar UI
- Highlight current date
- Fully responsive design for mobile & desktop

---

## 📈 Activity Timeline (Bonus Feature)
- Logs every user action:
  - Task Created
  - Task Updated
  - Task Deleted
- Instagram-style vertical timeline UI
- Real-time activity tracking using Firestore

---

## 🔔 Notification System (UI Layer)
- Bell icon notification UI
- Badge indicator for new activity
- Expandable notification dropdown

---

## 👥 Admin Panel
- View all registered users
- Gender-based user display (Male / Female)
- Role-based access (Admin only features)

---

## 🎨 UI/UX Features
- Fully responsive design (Mobile + Desktop)
- Dark themed SaaS UI
- Modern card-based layout
- Smooth hover animations
- Clean spacing system

---

# 📁 Folder Structure
src/
├── app/
│ ├── dashboard/
│ ├── tasks/
│ ├── workspace/
│
├── components/
│ ├── layout/
│ ├── admin/
│ ├── task/
│
├── lib/
│ ├── firebase.ts
│ ├── taskService.ts
│ ├── projectService.ts
│
├── context/

---

# 🔥 Key Functionalities

- Firebase Firestore CRUD operations
- Real-time updates using onSnapshot
- Authentication state management
- Role-based UI rendering
- Responsive SaaS dashboard layout
- Activity logging system

---

# 🚀 Deployment

- GitHub Repository: (git clone https://github.com/your-username/project-dashboard)
- Live Project: (project-dashboard-txy4.vercel.app)

---

# 📌 Installation Steps

```bash
# Clone repo
git clone https://github.com/your-username/project-dashboard

# Install dependencies
npm install

# Run project
npm run dev
