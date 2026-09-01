"use client";

import { useEffect, useState } from "react";
import { FALLBACK_STOCKS, type StockQuote } from "@/data/publicHoldings";

type ReturnMode = "today" | "total";

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

function formatPercent(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function displayLabel(stock: StockQuote): string {
  return stock.private ? stock.name : `$${stock.symbol}`;
}

function StockItem({ stock, mode }: { stock: StockQuote; mode: ReturnMode }) {
  const displayPercent =
    mode === "today" ? stock.changePercent : (stock.totalReturnPercent ?? 0);
  const isPositive = displayPercent >= 0;

  return (
    <div className="flex items-center gap-3 px-6 py-2 whitespace-nowrap flex-shrink-0">
      <span className="font-semibold text-slate-800">{displayLabel(stock)}</span>
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
  const [stocks, setStocks] = useState<StockQuote[]>(FALLBACK_STOCKS);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<ReturnMode>("today");

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
      } finally {
        setIsLoading(false);
      }
    }

    fetchStocks();

    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="text-center pt-6 pb-2 px-6">
        <h2 className="text-3xl font-bold text-slate-800">Stock Tracker</h2>
      </div>

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
