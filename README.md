# Vehicle Rental System API (Node + Express + TypeScript + PostgreSQL)

This is a complete backend system for renting vehicles.  
It includes secure authentication, role-based access control, vehicle management, booking management, and PostgreSQL integration.

---

## 🚀 Features

### 🔐 Authentication
- User Signup & Login
- Password hashing (bcrypt)
- JWT-based authentication
- Auth Middleware

### 👥 User Roles
- **Admin**
- **Customer**

### 🚗 Vehicle Module
- Add vehicle (Admin only)
- Get all vehicles
- Get single vehicle
- Update or delete vehicle (Admin only)
- Availability status changes automatically based on bookings

### 📅 Booking Module
- Create booking (Customer/Admin)
- Validates vehicle availability
- Auto calculates total price
- Auto updates vehicle to *booked*
- Cancel booking (Customer)
- Mark as returned (Admin)
- Customer can only view own bookings
- Admin can view all bookings

---

## 📂 Project Structure

```
src/
│── config/
│   └── db.ts
│   └── index.ts
│── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   └── auth.service.ts
│   ├── user/
│   ├── vehicle/
│   └── booking/
│── middleware/
│   ├── auth.middleware.ts
│   └── role.middleware.ts
│── types/
│   └── express.d.ts
│── server.ts
```

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL (Neon DB compatible)**
- **pg (Node PostgreSQL client)**
- **bcrypt**
- **jsonwebtoken**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourname/vehicle-rental-api.git
cd vehicle-rental-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```
CONNECTION_STRING=your_postgres_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Start in development mode

```bash
npm run dev
```

---

## 🧪 API Endpoints

### 🔐 **Auth**
| Method | Endpoint         | Access     | Description |
|--------|------------------|------------|-------------|
| POST   | /api/v1/auth/signup | Public | Create a new user |
| POST   | /api/v1/auth/signin | Public | Login user & return JWT |

---

### 🚗 **Vehicles**
| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | /api/v1/vehicles | Admin | Add vehicle |
| GET | /api/v1/vehicles | Public | Get all vehicles |
| GET | /api/v1/vehicles/:id | Public | Get vehicle by ID |
| PUT | /api/v1/vehicles/:id | Admin | Update vehicle |
| DELETE | /api/v1/vehicles/:id | Admin | Delete vehicle |

---

### 📅 **Bookings**
| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | /api/v1/bookings | Customer/Admin | Create booking |
| GET | /api/v1/bookings | Role-based | Admin → all bookings / Customer → own |
| PUT | /api/v1/bookings/:id | Role-based | Customer → cancel / Admin → mark returned |

---

## 🔒 Role-Based Access Summary

### 🔐 Admin
- Manage all vehicles
- View all bookings
- Mark bookings returned

### 👤 Customer
- Create booking
- View ONLY their bookings
- Cancel before start date

---

## 🧰 How to Test in Postman

### 1️⃣ Signup → Get JWT  
### 2️⃣ Insert token in **Authorization → Bearer Token**  
### 3️⃣ Make requests  
### 4️⃣ For Admin routes: login as admin user

---

## 📌 Important Business Rules

- A vehicle cannot be booked if already booked.
- Cancellation allowed only before start date.
- Admin can return any active booking.
- Returned bookings automatically release vehicle to "available".

---


## 👨‍💻 Author

MD.Naeem Islam
Vehicle Rental System Backend Developer  