import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// POST: 新しいTODOを作成するエンドポイント
router.post("/todo", async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed: false,
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PATCH: 既存のTODOのcompleted状態を更新するエンドポイント
router.patch("/todo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed field must be a boolean" });
  }

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(404).json({ error: "Todo not found or failed to update" });
  }
});

export default router;
