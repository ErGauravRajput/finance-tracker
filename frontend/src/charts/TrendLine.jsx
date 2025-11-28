import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

const TrendLine = ({ trends }) => {
  if (!trends || !trends.length) return <p>No data</p>;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={trends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" />
        <Line type="monotone" dataKey="expense" stroke="#ff7f7f" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendLine;
