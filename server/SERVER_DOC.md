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
* Create models in schema.prisma file
* Run ``` npx prisma migrate dev --name init ```
* https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction
* https://dev.to/ajor-saha/setting-up-a-backend-with-prisma-express-and-postgresql-482e?form=MG0AV3

### Integrate GraphQL server

```
npm install express graphql-http graphql --save
```