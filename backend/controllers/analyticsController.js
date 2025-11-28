import { Sequelize } from "sequelize";
import { Transaction } from "../models/Transaction.js";

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalIncome = (await Transaction.sum("amount", {
      where: { type: "income", UserId: userId }
    })) || 0;

    const totalExpense = (await Transaction.sum("amount", {
      where: { type: "expense", UserId: userId }
    })) || 0;

    const categoryBreakdown = await Transaction.findAll({
      where: { UserId: userId },
      attributes: [
        "category",
        [Sequelize.fn("sum", Sequelize.col("amount")), "total"]
      ],
      group: ["category"]
    });

    // Simple synthetic monthly trends based on existing data
    const monthlyTrends = [
      { month: "Jan", income: totalIncome * 0.4, expense: totalExpense * 0.3 },
      { month: "Feb", income: totalIncome * 0.35, expense: totalExpense * 0.4 },
      { month: "Mar", income: totalIncome * 0.25, expense: totalExpense * 0.3 }
    ];

    return res.json({
      totalIncome,
      totalExpense,
      categoryBreakdown,
      monthlyTrends
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
