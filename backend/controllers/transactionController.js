import { Transaction } from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const { type, category, amount, date } = req.body;

    if (!type || !category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await Transaction.create({
      type,
      category,
      amount,
      date,
      UserId: req.user.id
    });

    return res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { UserId: req.user.id },
      order: [["date", "DESC"], ["id", "DESC"]]
    });

    return res.json(transactions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Transaction.destroy({
      where: { id, UserId: req.user.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
