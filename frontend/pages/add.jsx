import Prism from "../components/Prism"
import PillNav from "../components/PillNav"
import { useState } from "react"

export default function Add() {
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")

  async function submit(e) {
    e.preventDefault()

    const expense = { date, category, description, amount }

    try {
      const res = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      })

      if (!res.ok) {
        throw new Error("Failed to add expense")
      }

      setDate("")
      setCategory("")
      setDescription("")
      setAmount("")
      alert("✅ Expense added successfully!")
    } catch (err) {
      console.error("Error:", err)
      alert("❌ Something went wrong")
    }
  }

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
          activeHref="/add"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#ffffff"
          pillColor="#ffffff"
          hoveredPillTextColor="#000000"
          pillTextColor="#000000"
        />
      </div>

      
      <div className="text-center mt-16 z-10">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight">
          Add{" "}
          <span className="text-teal-400 drop-shadow-[0_0_12px_rgba(45,255,196,0.7)]">
            Expense
          </span>
        </h1>
        <p className="mt-4 text-white text-lg">
          Keep track of your spending in just a few clicks ✨
        </p>
      </div>

      
      <div className="mt-16 max-w-3xl w-full mx-auto bg-black/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 z-10">
        <form className="space-y-6" onSubmit={submit}>
          
          <div>
            <label className="block text-white mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          
          <div>
            <label className="block text-white mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
              <option value="others">Others</option>
            </select>
          </div>

          
          <div>
            <label className="block text-white mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Dinner with friends"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          
          <div>
            <label className="block text-white mb-2">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 250"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
