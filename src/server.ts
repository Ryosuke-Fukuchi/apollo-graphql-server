import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import todoRoutes from "./routes/todoRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// REST APIのルート設定
app.use("/api/rest", todoRoutes);

// Apollo Serverの設定
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 GraphQL Server ready at http://localhost:${PORT}/api/graphql`
    );
    console.log(`🚀 REST API ready at http://localhost:${PORT}/api/rest/todo`);
  });
}

startServer();
