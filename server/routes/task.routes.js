import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";
import authMiddleware from "../middleware/varifyToken.js";

const router = Router();

router.post('/create',authMiddleware,createTask)
router.put('/update/:taskId',authMiddleware,updateTask)
router.delete('/delete/:taskId',authMiddleware,deleteTask)
router.get('/',authMiddleware,getTasks)

export default router