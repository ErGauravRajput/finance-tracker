import { useEffect, useState } from "react";
import { api } from "../api/axios";
import CategoryPie from "../charts/CategoryPie";
import TrendLine from "../charts/TrendLine";
import IncomeExpenseBar from "../charts/IncomeExpenseBar";

const Analytics = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    categoryBreakdown: [],
    monthlyTrends: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get("/analytics");
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="page">
      <h2>Analytics</h2>

      <div className="chart-grid">
        <div className="chart-wrapper">
          <h3>Category-wise Expenses</h3>
          <CategoryPie categories={data.categoryBreakdown} />
        </div>

        <div className="chart-wrapper">
          <h3>Monthly Income vs Expense (Trend)</h3>
          <TrendLine trends={data.monthlyTrends} />
        </div>

        <div className="chart-wrapper">
          <h3>Overall Income vs Expense</h3>
          <IncomeExpenseBar
            income={data.totalIncome || 0}
            expense={data.totalExpense || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
