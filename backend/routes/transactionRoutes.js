import express from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// All roles can view their own transactions
router.get("/", protect, allowRoles("admin", "user", "read-only"), getTransactions);

// Only admin and user can create/delete
router.post("/", protect, allowRoles("admin", "user"), createTransaction);
router.delete("/:id", protect, allowRoles("admin", "user"), deleteTransaction);

export default router;
