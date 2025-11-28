import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import IncomeExpenseBar from "../charts/IncomeExpenseBar";

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    categoryBreakdown: []
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

  const net = (data.totalIncome || 0) - (data.totalExpense || 0);

  return (
    <div className="page">
      <h2>Welcome{user?.name ? `, ${user.name}` : ""}</h2>
      <div className="cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹ {data.totalIncome || 0}</p>
        </div>
        <div className="card">
          <h3>Total Expense</h3>
          <p>₹ {data.totalExpense || 0}</p>
        </div>
        <div className="card">
          <h3>Net Balance</h3>
          <p className={net >= 0 ? "positive" : "negative"}>₹ {net}</p>
        </div>
      </div>

      <div className="chart-wrapper" style={{ marginTop: "1.5rem" }}>
        <h3>Income vs Expense</h3>
        <IncomeExpenseBar
          income={data.totalIncome || 0}
          expense={data.totalExpense || 0}
        />
      </div>
    </div>
  );
};

export default Dashboard;
