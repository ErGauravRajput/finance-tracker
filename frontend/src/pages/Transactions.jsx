import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  type: "expense",
  category: "",
  amount: "",
  date: ""
};

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const readOnly = user?.role === "read-only";

  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnly) return;

    try {
      await api.post("/transactions", {
        ...form,
        amount: Number(form.amount)
      });
      setForm(emptyForm);
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (readOnly) return;
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchText =
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        String(t.amount).includes(search);
      const matchType = filterType === "all" || t.type === filterType;
      return matchText && matchType;
    });
  }, [transactions, search, filterType]);

  return (
    <div className="page">
      <h2>Transactions</h2>

      <form className="form-inline" onSubmit={handleSubmit}>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          disabled={readOnly}
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          disabled={readOnly}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          disabled={readOnly}
        />
        <button type="submit" className="btn-primary" disabled={readOnly}>
          {readOnly ? "Read-only" : "Add"}
        </button>
      </form>

      <div className="filters">
        <input
          placeholder="Search by category/amount"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount (₹)</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.amount}</td>
              <td>{t.date}</td>
              <td>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(t.id)}
                  disabled={readOnly}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!filtered.length && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No transactions
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {readOnly && (
        <p className="hint">
          You are <b>read-only</b>, so you can’t add/delete transactions.
        </p>
      )}
    </div>
  );
};

export default Transactions;
