# Travlr - Full-Stack Booking Application
A full-stack travel booking application built with the MEAN architecture (MongoDB, Express, Angular, Node.js).
The project includes both a public-facing site for browsing trips and an authenticated admin interface
for managing travel data.

Originally developed as part of coursework, I've refactored and extended the application to 
improve usability and setup as a portfolio presentation. Key improvements include fixing the authentication layer
and adding a seed script to easily load demo data.

## Screenshots
**Admin Dashboard**
<p align="center">
<img src="./screenshots/admin-dashboard.png" width="600">
</p>

**Add / Edit Trip**
<p align="center">
<img src="./screenshots/add-trip.png" width = "600">
</p>

**Public Travel Page**
<p align="center">
<img src="./screenshots/public.png" width = "600">
</p>

**Admin Login Page**
<p align="center">
<img src="./screenshots/login.png" width = "600">
</p>

## Features
- Browse available trips (public site)
- Admin dashboard for managing trips
- Create, update, and maintain trip data
- JWT-based authentication for protected routes
- Consistent data integrity with MongoDB
- RESTful API connecting the frontend and backend

## Architecture
- The Angular Admin-side of the application authenticates users to manage trip data
- The Express API handles authentication and database operations
- The MongoDB database stores users and trip data across sessions
- The public-facing site renders trip data using the handlebars format

This setup was chosen to become familiarized with this tech-stack and demonstrate 
real-world admin-controlled content management with a client-side view.

## Setup
**1. Clone repository using git and move to the project folder**
```bash
git clone https://github.com/billycook71/cs465-fullstack.git
cd ../cs465-fullstack
```

**2. Install dependencies**
```bash
npm install
cd app_admin
npm install
cd ..
```

**3. Configure environment variables**
- create a .env file in the root directory (not included due to git.ignore)
- example: JWT_SECRET=supersecretkey123

**4. Ensure MongoDB is installed & running**

**5. Seed the databse (seeds some sample trips and an admin login)**
```bash
npm run seed
```
(reset included if you need to scrub some existing data to run, just removes existing trips & admin logins)
```bash
npm run seed -- --reset 
```

**6. Run the application**
```bash
npm start
cd app_admin
npm start
```

(this starts the backend and frontend, both need to be running)

**7. Accessing the app**
- Public site: http://localhost:3000
- Admin dashboard: http://localhost:4200

*Seeded login credentials:*   
- name: Demo Admin
- email: admin@example.com
- password: Password123!

## Future Improvmeents
- Improve API validation and error handling
- Enhance Admin UI/UX
