import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const IncomeExpenseBar = ({ income, expense }) => {
  const data = [{ name: "Total", income, expense }];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" />
        <Bar dataKey="expense" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseBar;
