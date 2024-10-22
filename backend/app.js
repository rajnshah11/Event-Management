// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require('express-graphql');
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const helmet = require("helmet");
const limiter = require("./middleware/rateLimiter");
const corsMiddleware = require("./middleware/cors");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require('./db');
const dotenv = require('dotenv');

dotenv.config();
// Initialize Express app
const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);
app.use(corsMiddleware);
app.use(isAuth);

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
  });
}).catch(err => {
  console.error("Database connection error:", err);
  process.exit(1); 
});