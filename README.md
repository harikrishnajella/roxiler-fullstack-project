# 📌 FullStack Intern Coding Challenge

## 🚀 Tech Stack
- 🖥 **Backend:** Express.js / Loopback / NestJS
- 🗄 **Database:** PostgreSQL / MySQL
- 🎨 **Frontend:** React.js

---

## 📌 Project Overview
This web application allows users to submit ratings for registered stores. Users have different roles, each with specific functionalities.

## 👤 User Roles
1. **System Administrator** 🛠️
2. **Normal User** 👤
3. **Store Owner** 🏪

## 🔑 Functionalities

### 🔹 System Administrator
✔️ Can add new stores, normal users, and admin users.  
✔️ Has access to a dashboard displaying:
   - 📊 Total number of users
   - 🏪 Total number of stores
   - ⭐ Total number of submitted ratings  
✔️ Can add new users with:
   - 📛 Name
   - 📧 Email
   - 🔒 Password
   - 🏠 Address
✔️ Can view a list of stores with:
   - 🏪 Name, 📧 Email, 🏠 Address, ⭐ Rating
✔️ Can view a list of users with:
   - 📛 Name, 📧 Email, 🏠 Address, 🔖 Role
✔️ Can apply filters for searching.
✔️ Can view detailed user info.
✔️ Can log out. 🔓

### 🔹 Normal User
✔️ Can **sign up** and **log in** 📝
✔️ Signup form fields:
   - 📛 Name
   - 📧 Email
   - 🏠 Address
   - 🔒 Password
✔️ Can **update password** after logging in. 🛠
✔️ Can view all **registered stores** 🏪
✔️ Can search stores by **Name** and **Address** 🔎
✔️ Store listings include:
   - 🏪 Name
   - 🏠 Address
   - ⭐ Overall Rating
   - ⭐ User’s Submitted Rating
   - ✅ Option to submit/modify rating
✔️ Can submit **ratings (1-5)** ⭐
✔️ Can log out. 🔓

### 🔹 Store Owner
✔️ Can **log in** 📥
✔️ Can **update password** after logging in. 🛠
✔️ Dashboard functionalities:
   - 👥 View users who submitted ratings
   - ⭐ View the average rating of their store
✔️ Can log out. 🔓

---

## ✅ Form Validations
- **Name:** Min **20** characters, Max **60** characters.
- **Address:** Max **400** characters.
- **Password:** 8-16 characters, must include **one uppercase** letter and **one special character**.
- **Email:** Must follow **standard email validation rules**.

---

## 📌 Additional Features
- 📋 All tables support **sorting** (ascending/descending) 🔼🔽
- 🏆 **Best practices** for frontend and backend development 🎯
- 🗄 **Database schema** follows best design principles

---

## 📂 Folder Structure
```plaintext
📦 ProjectRoot
├── 📁 backend
│   ├── 📁 controllers
│   ├── 📁 models
│   ├── 📁 routes
│   ├── 📁 middlewares
│   ├── 📄 server.js
│   └── 📄 config.js
├── 📁 frontend
│   ├── 📁 components
│   ├── 📁 pages
│   ├── 📁 services
│   ├── 📄 App.js
│   └── 📄 index.js
├── 📄 README.md
├── 📄 package.json
└── 📄 .gitignore
```

---

## 🛠 Installation & Setup
### 1️⃣ Backend Setup
```bash
cd backend
npm install
npm start
```

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| 🟢 **POST** | `/api/auth/register` | Register a new user |
| 🟢 **POST** | `/api/auth/login` | User login |
| 🔵 **GET** | `/api/stores` | Get all stores |
| 🟢 **POST** | `/api/stores` | Add a new store (Admin) |
| 🟠 **PUT** | `/api/stores/:id/rating` | Submit/Update rating |
| 🔵 **GET** | `/api/users` | Get all users (Admin) |

---

## 📜 License
This project is licensed under the MIT License.

---

## 🤝 Contributing
Pull requests are welcome! Feel free to submit any improvements or bug fixes.

🚀 **Happy Coding!** 🎉

