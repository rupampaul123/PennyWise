import Prism from "../components/Prism"
import PillNav from "../components/PillNav"
import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Landing() {

  return (
    <>
      <div className="relative w-full h-[750px] flex flex-col items-center justify-center">
        
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

        <PillNav
          items={[
            { label: "Home", href: "/" },
            { label: "My Expenses", href: "/show" },
            { label: "Add Expense", href: "/add" },
          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#ffffff"
          pillColor="#ffffff"
          hoveredPillTextColor="#000000"
          pillTextColor="#000000"
        />

        <div className="absolute text-center px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-white">Penny</span>
            <span className="ml-2 text-teal-400 drop-shadow-[0_0_20px_rgba(45,255,196,0.8)]">
              Wise
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
            Smart expense tracking for students — stay on top of your finances
            with clarity and style.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/add"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-xl shadow-lg shadow-teal-500/30 transition"
            >
              Add Expense
            </Link>
            <Link
              to="/show"
              className="px-6 py-3 border border-gray-400 text-gray-200 font-semibold rounded-xl hover:bg-gray-800 transition"
            >
              View Expenses
            </Link>
          </div>
           {/* Navigation Instructions - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-teal-400/10 border border-teal-400/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-teal-300 text-sm text-center">
              💡 <span className="font-semibold">This website is fully functional!</span> <br/>
              Use the navigation buttons to explore all features - add expenses, view expenses, and more.
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </>
  )
}
