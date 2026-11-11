# The Daily Cup – Coffee Shop Management System

## 1. Project Overview

The Daily Cup is a Coffee Shop Management System developed to make coffee shop operations easier and more efficient.

The system allows customers to browse available menu items, add products to their shopping cart, place orders and receive order confirmations. Staff members can manage menu items, view customer orders and update order statuses.

The system uses React for the frontend, Express.js for the backend, Fetch API for communication and Upstash Redis as a persistent key-value NoSQL database.

## 2. Project Objectives

The main objectives of this project are:

- To allow customers to browse available coffee shop products.
- To allow customers to add products to their shopping cart.
- To allow customers to place orders online.
- To provide order confirmation after checkout.
- To allow staff to add, edit and delete menu items.
- To allow staff to view customer orders.
- To allow staff to update order statuses.
- To store menu items and orders in a persistent database.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Develops the frontend user interface |
| Express.js | Creates the backend server and API |
| Node.js | Runs the backend application |
| Fetch API | Communicates between frontend and backend |
| Upstash Redis | Stores menu items and orders |
| GitHub | Version control and source code management |
| Vercel | Hosts the frontend application |
| Render | Hosts the backend application |
| CSS | Styles the application |

## 4. Main System Features

### 4.1 Customer Features

- View the coffee shop homepage.
- Browse available menu items.
- Filter products by category.
- View product names, descriptions and prices.
- Add products to the shopping cart.
- Increase or decrease product quantities.
- Remove products from the cart.
- View the total order amount.
- Enter customer details during checkout.
- Place an order.
- Receive an order confirmation.

### 4.2 Staff Features

- View the staff dashboard.
- View available menu items.
- Add new menu items.
- Edit existing menu items.
- Delete menu items.
- Update product availability.
- View customer orders.
- View order information.
- Update order statuses.
- View order statistics.

### 4.3 Order Statuses

The system supports the following order statuses:

- Pending
- Preparing
- Ready
- Collected

## 5. Project Structure

The project is organised into two main folders: `client` and `server`.

```text
The-Daily-Cup/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── StaffDashboard.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── data/
│   │   │   └── menuData.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── redis.js
│   │
│   ├── routes/
│   │   ├── menuRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 6. API Endpoints

The backend provides API endpoints for managing menu items and customer orders.

### 6.1 Menu API

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/menu | Retrieve all menu items |
| POST | /api/menu | Add a new menu item |
| PUT | /api/menu/:id | Update a menu item |
| DELETE | /api/menu/:id | Delete a menu item |

### 6.2 Orders API

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/orders | Retrieve all customer orders |
| POST | /api/orders | Create a new customer order |
| PUT | /api/orders/:orderNumber | Update an order status |

### 6.3 Health Check API

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/health | Check whether the backend server is running |

## 7. Database

The system uses Upstash Redis as its persistent key-value NoSQL database.

Redis stores the system information using the following keys:

- `menuItems` – Stores coffee shop menu items, including their names, descriptions, prices and availability.
- `orders` – Stores customer orders and their details, including order numbers, customer information, ordered products and order statuses.

The database allows the application to retrieve and update information through the backend API.

## 8. Installation and Setup

To run the project locally, follow these steps.

### 8.1 Requirements

Install the following tools:

- Node.js
- npm
- Visual Studio Code
- Git

### 8.2 Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/monkengmalefane22dotcom/The-Daily-Cup.git
```

Move into the project folder:

```bash
cd The-Daily-Cup
```

### 8.3 Install and Run the Frontend

Open a terminal and run:

```bash
cd client
npm install
npm run dev
```

The frontend will run at:

http://localhost:5173

### 8.4 Install and Run the Backend

Open another terminal and run:

```bash
cd server
npm install
node server.js
```

The backend will run at:

http://localhost:5000

### 8.5 Environment Variables

The backend requires the following environment variables:

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

The frontend requires:

```env
VITE_API_URL=https://the-daily-cup-tahe.onrender.com
```

Actual database credentials must be kept private and must not be uploaded to GitHub.

## 9. Deployment Links

The application is deployed online using Vercel and Render.

**GitHub Repository:**

https://github.com/monkengmalefane22dotcom/The-Daily-Cup

**Live Frontend Application:**

https://the-daily-cup-phi.vercel.app

**Backend API:**

https://the-daily-cup-tahe.onrender.com

**Backend Health Check:**

https://the-daily-cup-tahe.onrender.com/api/health

**Menu API:**

https://the-daily-cup-tahe.onrender.com/api/menu

## 10. Conclusion

The Daily Cup Coffee Shop Management System provides a simple and efficient way to manage coffee shop activities.

Customers can browse products, place orders and receive confirmations, while staff members can manage menu items and process customer orders.

The project demonstrates the use of React, Express.js, Fetch API and a persistent NoSQL database to develop a full-stack web application. It also demonstrates the use of GitHub for version control and cloud platforms for deployment.