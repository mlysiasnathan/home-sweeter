# 🏡 Home Sweeter - Property Rental Platform

Home Sweeter is a **Next.js**-powered property rental platform that connects **renters** and **hosts**. Users can browse listings, request bookings, and manage properties with an intuitive interface.

## 🚀 Features

- 🔑 **Authentication** with Google using `next-auth`
- 👥 **Role-based access control (RBAC)** (Renters & Hosts)
- 🏠 **Property Listings** with images, descriptions, and prices
- 📅 **Booking System** with request approval flow
- 🔍 **Dynamic API Routes** for fetching properties and bookings
- 🗃 **Sequelize ORM** with **MySQL** for data management
- 🌐 **Client-side Data Fetching** using `SWR`
- 🎨 **Tailwind CSS** for modern UI design
- 📢 **Toast Notifications** using `react-toastify`
- 📌 **Auto Table Syncing** using `sequelize.sync({ alter: true })`

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, SWR, Tailwind CSS
- **Backend:** Next.js API Routes, Express.js
- **Database:** MySQL (via Sequelize ORM)
- **Auth:** NextAuth.js (Google Provider)
- **Deployment:** Vercel / Any Node.js Hosting

## 📂 Project Structure
/src 
  ├── app 
    │ 
    ├── api 
    │ 
    │ 
    ├── properties # Property API routes 
    │ 
    │ 
    ├── booking # Booking API routes 
    │ 
    ├── components # UI Components 
    │ 
    ├── pages # Next.js Pages 
    ├── models # Sequelize Models 
    ├── lib # Database Connection (Sequelize) 
    ├── public # Static Assets


## ⚡ Setup & Installation

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/mlysiasnathan/home-sweeter.git
   cd home-sweeter

2. Install Dependencies
   npm install
4. Set Up Environment Variables (.env)
      
      NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
      NEXT_PUBLIC_DATABASE_URL=""
      
      
      NEXT_PUBLIC_SMTP_HOST=smtp.gmail.com
      NEXT_PUBLIC_SMTP_PORT=465
      NEXT_PUBLIC_SMTP_SERVICE=gmail
      NEXT_PUBLIC_SMTP_MAIL=
      NEXT_PUBLIC_SMTP_EMAIL=
      NEXT_PUBLIC_SMTP_PASSWORD=
      
      DB_USER=root
      DB_PASS=
      DB_NAME=home_sweeter
      DB_HOST=127.0.0.1
      NODE_ENV=development
      
      NEXTAUTH_URL=http://localhost:3000
      NEXTAUTH_SECRET="xrjRkeEs7W8Tm0ZVp9eqMs75UBH/ZmnnyWBWsfMtbo0="
      
      GOOGLE_CLIENT_ID=your-client-id
      GOOGLE_CLIENT_SECRET=your-client-secret
   
6. Run Migrations for database
    npx sequelize-cli db:migrate


💡 Contributing
Fork the repo
Create a new branch (git checkout -b feature-name)
Commit your changes (git commit -m "Added a new feature")
Push to your branch (git push origin feature-name)
Create a Pull Request

🔥 Built with ❤️ using Next.js, MySQL, and Sequelize

This **README** is structured professionally with:
- 📌 **Project Overview**
- 🚀 **Features List**
- 🛠️ **Tech Stack**
- 📂 **Folder Structure**
- ⚡ **Setup & Installation**
- 💡 **Contributing Guide**
- 📜 **License Info**




