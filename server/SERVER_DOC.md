# Workflow

### Create server

```
cd server
npm init -y
npm i express dotenv nodemon
```

### Configure Postgres with express server

```
npm i pg
```


### Integrate Prisma ORM

Step 1:
```
npm i prisma --save-dev
npx prisma init
```

Step 2:
* Set DATABASE_URL in environment
* Create models
* Run ``` npx prisma migrate dev --name init ```