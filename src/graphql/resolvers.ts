import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getTodos: async (_: unknown, args: { completed?: boolean }) => {
      return await prisma.todo.findMany({
        where: { completed: args.completed },
      });
    },
  },
  Mutation: {
    addTodo: async (_: unknown, { title }: { title: string }) => {
      return await prisma.todo.create({
        data: {
          title,
          completed: false,
        },
      });
    },
    updateTodo: async (
      _: unknown,
      { id, completed }: { id: string; completed: boolean }
    ) => {
      return await prisma.todo.update({
        where: { id },
        data: { completed },
      });
    },
    deleteTodo: async (_: unknown, { id }: { id: string }) => {
      return await prisma.todo.delete({
        where: { id },
      });
    },
  },
};
