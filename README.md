# FastBuy

FastBuy is a web application where users can sign up and log in with their email addresses and passwords. The platform allows users to add products for sale or rent at user-specified rates. Rental rates can be hourly, monthly, or daily. Additionally, users can view all their own products on the user top page after being authenticated. Users can delete their own products also.

## Upcoming Features
- Users can buy a product
- Users can rent a product
- Users can see the history of their sold, bought, borrowed, and lent products

## Tech Stack

### Frontend
- Next.js (Version 15 - App Router framework of React)
- Apollo Client with In-Memory Cache for GraphQL data fetching and mutation

### Backend
- Node.js
- Express.js server with middleware
- Apollo Server for GraphQL
- PostgreSQL database
- Prisma ORM

## Dependencies
- Node.js

## Setup Instructions

### Start the Server Locally
1. Navigate to the root folder and open a terminal.
2. Run `cd server` to move into the server directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.
5. The Apollo server will be available at `http://localhost:4000/graphql`.

### Start the Client Locally
1. Navigate to the root folder and open a terminal.
2. Run `npm run dev` to start the client.
3. The client will be available at `http://localhost:3000`.

## 🚀 Running the Project with Docker

### **Prerequisites**
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Ensure Docker is running

### **Steps to Run the Project Using Docker**

1. **Create a ```.env``` file inside the ```server ```  directory and set two varibales**
   ```bash
   DATABASE_URL=postgresql://postgres:postgres@postgres_db:5432/demodb?schema=public
   JWT_SECRET=6cc98c44c5298080d11a0cae3
   ```
   you can also generate a jwt secret from: https://jwtsecret.com/generate

2. **Open terminal and navigate to the Project Directory**  
   ```bash
   cd fastbuy
   ```

3. **Build and Start the Containers**  
   ```bash
   docker-compose up --build
   ```
   - This command will:
     - Build the Docker images for both the **client** and **server**.
     - Start the containers.

4. **Access the Application**
   - **Backend (API Server):** `http://localhost:4000`
   - **Frontend (Client App):** `http://localhost:3000`

5. **Stopping the Containers**
   To stop the running containers, press `CTRL + C`, or run:
   ```bash
   docker-compose down
   ```

## Troubleshooting
If you face this prisma related issue (e.g. The table `public.User` does not exist in the current database) during sign up or login, open terminal and go to `server` directory. Then run the command below:
   ```bash
   docker-compose exec server npx prisma migrate dev
   ```
make sure your docker container is running before you run this command.

## Contribution
Contributions are welcome! If you find any issues or want to improve the project, feel free to create a pull request. 🚀

---
