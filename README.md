# 📱 Mobile Service Management System

### سیستم مدیریت خدمات موبایل

A Full-Stack web application for managing mobile repair services, customers, and service records.

یک نرم‌افزار تحت وب برای مدیریت مشتریان، تعمیرات موبایل و سوابق خدمات، با معماری Full-Stack.

---

## 🚀 Features | امکانات

- Customer Management (CRUD)
- Service Management (CRUD)
- Customer and service relationship management
- Search and filter customers
- Service status management
- Service cost management
- Form validation using Zod
- Centralized error handling
- PostgreSQL database integration

### امکانات فارسی

- ثبت، مشاهده، ویرایش و حذف مشتریان
- ثبت و مدیریت خدمات تعمیراتی
- ارتباط خدمات با مشتریان
- جست‌وجوی مشتریان
- مدیریت وضعیت تعمیرات
- ثبت و مدیریت هزینه خدمات
- اعتبارسنجی اطلاعات فرم‌ها
- مدیریت متمرکز خطاها

---

## 🛠️ Technologies | تکنولوژی‌ها

### Frontend

- React
- JavaScript
- Vite
- CSS

### Backend

- Node.js
- Express.js
- Prisma ORM
- Zod

### Database

- PostgreSQL

### Tools

- Git
- GitHub
- VS Code

---

## 📂 Project Structure | ساختار پروژه

```text
mobile-service-app/
├── server/
│   ├── config/
│   ├── middlewares/
│   ├── routes/
│   ├── schemas/
│   ├── prisma/
│   ├── prisma.js
│   └── server.js
├── public/
├── src/
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup | نصب و راه‌اندازی

### 1. Clone the repository

```bash
git clone https://github.com/sajjadv2/mobile-service-app.git
cd mobile-service-app
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
DATABASE_URL="your_postgresql_connection_string"
```

### 4. Start the backend

```bash
npm run dev
```

### 5. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

---

## 👨‍💻 Developer | توسعه‌دهنده

**Full-Stack Developer**

GitHub: [@sajjadv2](https://github.com/sajjadv2)

---

_This project is being developed as a practical Full-Stack learning and portfolio project._

_این پروژه با هدف یادگیری عملی توسعه Full-Stack و ایجاد نمونه‌کار حرفه‌ای در حال توسعه است._
