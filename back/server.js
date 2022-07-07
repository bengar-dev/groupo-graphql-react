import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import { readFile } from "fs/promises";
import { resolvers } from "./graphql/resolvers.js";

const PORT = 9000;
const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();
app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
);

const typeDefs = await readFile("./schema.graphql", "utf-8");
const apolloServer = new ApolloServer({ typeDefs, resolvers });

await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL enpoint http://localhost:${PORT}/graphql`);
});
