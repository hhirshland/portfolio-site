import { NextResponse } from "next/server";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Fetch stock quote from Finnhub
async function fetchStockQuote(symbol: string, name: string): Promise<StockData | null> {
  const apiKey = process.env.FINNHUB_API_KEY;
  
  if (!apiKey) {
    console.error("FINNHUB_API_KEY not found");
    return null;
  }

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );
    
    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Finnhub returns: c (current), d (change), dp (percent change), h (high), l (low), o (open), pc (previous close)
    return {
      symbol,
      name,
      price: data.c,
      change: data.d,
      changePercent: data.dp,
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
}

// Fetch crypto prices from CoinGecko (free, no API key needed)
async function fetchCryptoPrices(): Promise<StockData[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return [
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: data.bitcoin.usd,
        change: 0, // CoinGecko doesn't provide absolute change in simple endpoint
        changePercent: data.bitcoin.usd_24h_change,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: data.ethereum.usd,
        change: 0,
        changePercent: data.ethereum.usd_24h_change,
      },
    ];
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return [];
  }
}

// Stock symbols with their display names
const STOCKS = [
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "GOOGL", name: "Google" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "MU", name: "Micron" },
  { symbol: "VOO", name: "S&P 500" },
  { symbol: "TSM", name: "TSMC" },
  { symbol: "COIN", name: "Coinbase" },
  { symbol: "HOOD", name: "Robinhood" },
  { symbol: "META", name: "Meta" },
  { symbol: "IREN", name: "Iris Energy" },
  { symbol: "MP", name: "MP Materials" },
  { symbol: "INTC", name: "Intel" },
  { symbol: "VTI", name: "Total Market" },
  { symbol: "AAPL", name: "Apple" },
];

export async function GET() {
  try {
    // Fetch all data in parallel
    const [cryptoData, ...stockResults] = await Promise.all([
      fetchCryptoPrices(),
      ...STOCKS.map(({ symbol, name }) => fetchStockQuote(symbol, name)),
    ]);

    // Combine results, filtering out any null values
    const stocks: StockData[] = [
      ...cryptoData,
      ...stockResults,
    ].filter((stock): stock is StockData => stock !== null);

    return NextResponse.json({ stocks });
  } catch (error) {
    console.error("Error in stocks API:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
