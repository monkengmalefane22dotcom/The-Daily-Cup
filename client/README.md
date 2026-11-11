# The Daily Cup – Coffee Shop Management System

## 1. Project Overview

The Daily Cup is a Coffee Shop Management System developed to make coffee shop operations easier and more efficient.

The system allows customers to browse menu items, add products to their cart, place orders and receive order confirmations. Staff members can manage menu items, view customer orders and update order statuses.

## 2. Project Objectives

- Allow customers to browse available products.
- Allow customers to place orders online.
- Allow staff to add, edit and delete menu items.
- Allow staff to manage customer orders.
- Track order statuses.
- Store application data in a persistent database.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Express.js | Backend API |
| Node.js | Backend runtime |
| Fetch API | Communication between frontend and backend |
| Upstash Redis | Persistent key-value NoSQL database |
| CSS | Website styling |
| GitHub | Source code management |
| Vercel | Frontend hosting |
| Render | Backend hosting |

## 4. Main System Features

### Customer Features
- View the home page.
- Browse coffee, tea, pastries and other drinks.
- Add products to the shopping cart.
- Increase or decrease product quantities.
- Remove products from the cart.
- Enter customer details and place orders.
- Receive order confirmation.

### Staff Features
- View dashboard statistics.
- Add new menu items.
- Edit existing menu items.
- Delete menu items.
- Manage product availability.
- View customer orders.
- Update order statuses.

## 5. Project Structure

```text
Coffee Shop/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md


## 6. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/menu | Retrieve menu items |
| POST | /api/menu | Add a menu item |
| PUT | /api/menu/:id | Update a menu item |
| DELETE | /api/menu/:id | Delete a menu item |
| GET | /api/orders | Retrieve customer orders |
| POST | /api/orders | Place a customer order |
| PUT | /api/orders/:orderNumber | Update an order |

## 7. Database

The system uses Upstash Redis, a persistent key-value NoSQL database.

The database stores:
- Menu items.
- Customer orders.
- Product information.
- Order information and statuses.

## 8. Installation and Setup

### Requirements
- Node.js
- npm
- Git

### Frontend Setup

Open a terminal and run:

```bash
cd client
npm install
npm run dev
```

### Backend Setup

Open another terminal and run:

```bash
cd server
npm install
node server.js
```

### Environment Variables

The backend requires the following environment variables:

```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

The frontend requires:

```env
VITE_API_URL=your_backend_url
```

Actual credentials should be stored privately in environment files and should never be uploaded to GitHub.

## 9. Deployment Links

**Live Website:**  
https://the-daily-cup-phi.vercel.app

**Backend API:**  
https://the-daily-cup-tahe.onrender.com

**GitHub Repository:**  
https://github.com/monkengmalefane22dotcom/The-Daily-Cup

## 10. Conclusion

The Daily Cup provides a simple online platform for customers and staff to manage coffee shop activities. It improves the ordering process, simplifies menu management and stores information using a persistent database.