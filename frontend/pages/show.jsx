import { Link } from "react-router-dom"
import PillNav from "../components/PillNav"
import Prism from "../components/Prism"
import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Show() {
  const [allExpenses, setAllExpenses] = useState([]);   
  const [expenses, setExpenses] = useState([]);         
  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/show")
      .then((res) => res.json())
      .then((res) => {
        setAllExpenses(res);
        setExpenses(res); 
      });
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value === "") {
      setExpenses(allExpenses); 
    } else {
      setExpenses(allExpenses.filter((expense) => expense.category.toLowerCase() === value.toLowerCase()));
    }
  };

  useEffect(() => {
    let total = 0;
    expenses.map((expense) => {
      total += expense.amount;
      return null; 
    });
    setCount(total);
  }, [expenses]);

  
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category;
    const existingCategory = acc.find(item => item.name === category);
    
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: category, value: expense.amount });
    }
    
    return acc;
  }, []);

  
  const dailyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    const existingDate = acc.find(item => item.date === date);
    
    if (existingDate) {
      existingDate.amount += expense.amount;
    } else {
      acc.push({ date, amount: expense.amount });
    }
    
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  
  const COLORS = ['#2dd4bf', '#a855f7', '#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start">
      
      <div className="absolute inset-0 -z-10">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>

      <div className="w-full flex justify-center mt-6 z-10">
        <PillNav
          items={[
            { label: "Home", href: "/" },
            { label: "My Expenses", href: "/show" },
            { label: "Add Expense", href: "/add" },
          ]}
          activeHref="/show"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#ffffff"
          pillColor="#ffffff"
          hoveredPillTextColor="#000000"
          pillTextColor="#000000"
        />
      </div>

      
      <div className="text-center mt-16 z-10">
        <h1 className="text-7xl md:text-8xl font-extrabold text-white tracking-tight">
          My{" "}
          <span className="text-teal-400 drop-shadow-[0_0_12px_rgba(45,255,196,0.7)]">
            Expenses
          </span>
        </h1>
        <p className="mt-4 text-gray-300 text-lg">
          A clear overview of where your money goes ✨
        </p>
      </div>


      
      <div className="mt-16 max-w-4xl w-full mx-auto bg-black backdrop-blur-sm rounded-2xl shadow-lg p-6 z-10">
        <div>
          <label className="block text-white mb-2">Filter by</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={filter}
            onChange={handleFilter}
          >
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
            <option value="others">Others</option>
          </select>
        </div>

        <table className="w-full text-left border-collapse mt-6">
          <thead>
            <tr className="text-gray-300 border-b border-gray-700">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition"
                >
                  <td className="text-white py-3 px-4">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      expense.category.toLowerCase() === "food"
                        ? "text-teal-400"
                        : "text-purple-400"
                    }`}
                  >
                    {expense.category}
                  </td>
                  <td className="text-white py-3 px-4">
                    {expense.description}
                  </td>
                  <td className="py-3 px-4 text-right text-red-400 font-semibold">
                    ₹{expense.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-400 py-6 italic"
                >
                  No expenses found for this category
                </td>
              </tr>
            )}

            
            {expenses.length > 0 && (
              <tr className="border-t border-gray-700 bg-gray-900/40">
                <td colSpan="3" className="py-3 px-4 text-2xl text-right text-teal-400 font-bold">
                  Total 
                </td>
                <td className="py-3 px-4 text-right text-red-600 font-bold text-lg">
                  ₹{count}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      
      {expenses.length > 0 && (
        <div className="mt-12 max-w-6xl w-full mx-auto bg-black/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 z-10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Expense Analytics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-gray-900/40 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Expenses by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-900/40 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Daily Expenses</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fill: '#9ca3af' }}
                    stroke="#6b7280"
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Amount']}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="amount" fill="#2dd4bf" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}