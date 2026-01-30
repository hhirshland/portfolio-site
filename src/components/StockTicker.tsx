"use client";

import { useEffect, useState } from "react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

type ReturnMode = "today" | "total";

// Entry prices - update these with your actual purchase prices
const ENTRY_PRICES: Record<string, number> = {
  BTC: 450,
  ETH: 876,
  NVDA: 3.37,
  TSLA: 185.00,
  GOOGL: 140.00,
  AMZN: 70.49,
  MU: 92.08,
  VOO: 493.26,
  TSM: 195.61,
  COIN: 69.23,
  HOOD: 97.06,
  META: 192.58,
  IREN: 28.34,
  MP: 72.60,
  INTC: 36.18,
  VTI: 118.50,
  AAPL: 56.17,
};

// Fallback data in case API fails
const fallbackStocks: Stock[] = [
  { symbol: "BTC", name: "Bitcoin", price: 97542.18, change: 1842.35, changePercent: 1.92 },
  { symbol: "ETH", name: "Ethereum", price: 3124.67, change: -45.23, changePercent: -1.43 },
  { symbol: "NVDA", name: "NVIDIA", price: 142.85, change: 3.42, changePercent: 2.45 },
  { symbol: "TSLA", name: "Tesla", price: 412.36, change: -8.74, changePercent: -2.08 },
  { symbol: "GOOGL", name: "Google", price: 196.42, change: 1.87, changePercent: 0.96 },
  { symbol: "AMZN", name: "Amazon", price: 225.94, change: 2.15, changePercent: 0.96 },
  { symbol: "MU", name: "Micron", price: 98.45, change: -1.23, changePercent: -1.23 },
  { symbol: "VOO", name: "S&P 500", price: 542.18, change: 3.21, changePercent: 0.60 },
  { symbol: "TSM", name: "TSMC", price: 185.32, change: 4.56, changePercent: 2.52 },
  { symbol: "COIN", name: "Coinbase", price: 267.89, change: 8.45, changePercent: 3.26 },
  { symbol: "HOOD", name: "Robinhood", price: 42.15, change: -0.87, changePercent: -2.02 },
  { symbol: "META", name: "Meta", price: 612.34, change: 5.67, changePercent: 0.93 },
  { symbol: "IREN", name: "Iris Energy", price: 12.45, change: 0.34, changePercent: 2.81 },
  { symbol: "MP", name: "MP Materials", price: 18.92, change: -0.45, changePercent: -2.32 },
  { symbol: "INTC", name: "Intel", price: 24.56, change: 0.12, changePercent: 0.49 },
  { symbol: "VTI", name: "Total Market", price: 285.67, change: 1.89, changePercent: 0.67 },
  { symbol: "AAPL", name: "Apple", price: 242.58, change: 1.34, changePercent: 0.56 },
];

function formatPrice(price: number, symbol: string): string {
  if (symbol === "BTC" || symbol === "ETH") {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function calculateTotalReturn(currentPrice: number, symbol: string): number {
  const entryPrice = ENTRY_PRICES[symbol];
  if (!entryPrice) return 0;
  return ((currentPrice - entryPrice) / entryPrice) * 100;
}

function formatPercent(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function StockItem({ stock, mode }: { stock: Stock; mode: ReturnMode }) {
  const displayPercent = mode === "today" 
    ? stock.changePercent 
    : calculateTotalReturn(stock.price, stock.symbol);
  
  const isPositive = displayPercent >= 0;
  
  return (
    <div className="flex items-center gap-3 px-6 py-2 whitespace-nowrap flex-shrink-0">
      <span className="font-semibold text-slate-800">${stock.symbol}</span>
      <span className="text-slate-600">{formatPrice(stock.price, stock.symbol)}</span>
      <span
        className={`text-sm font-medium ${
          isPositive ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : ""}
        {formatPercent(displayPercent)}%
      </span>
    </div>
  );
}

export default function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>(fallbackStocks);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<ReturnMode>("today");

  // Fetch real stock data
  useEffect(() => {
    async function fetchStocks() {
      try {
        const response = await fetch("/api/stocks");
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        if (data.stocks && data.stocks.length > 0) {
          setStocks(data.stocks);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        // Keep using fallback data
      } finally {
        setIsLoading(false);
      }
    }

    fetchStocks();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center pt-6 pb-2 px-6">
        <h2 className="text-3xl font-bold text-slate-800">Portfolio Tracker</h2>
      </div>
      
      {/* Mode Toggle */}
      <div className="flex justify-center pb-4 px-6">
        <div className="inline-flex rounded-lg bg-white/50 p-1 border border-white/50">
          <button
            onClick={() => setMode("today")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              mode === "today"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Today&apos;s Return
          </button>
          <button
            onClick={() => setMode("total")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              mode === "total"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Total Return
          </button>
        </div>
      </div>

      {/* Ticker Container */}
      <div className="w-full bg-white/60 backdrop-blur-sm border-t border-b border-white/50 overflow-hidden">
        <div 
          className={`flex ${isLoading ? "opacity-50" : "opacity-100"} transition-opacity`}
        >
          <div className="flex animate-ticker">
            {stocks.map((stock, index) => (
              <StockItem key={`a-${stock.symbol}-${index}`} stock={stock} mode={mode} />
            ))}
          </div>
          <div className="flex animate-ticker">
            {stocks.map((stock, index) => (
              <StockItem key={`b-${stock.symbol}-${index}`} stock={stock} mode={mode} />
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-ticker {
          display: flex;
          flex-shrink: 0;
          animation: ticker 45s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
