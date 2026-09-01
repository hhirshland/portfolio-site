import { NextResponse } from "next/server";
import {
  AVG_COST,
  CRYPTO_COINGECKO_IDS,
  FALLBACK_STOCKS,
  PUBLIC_TICKERS,
  totalReturnPercent,
  type StockQuote,
} from "@/data/publicHoldings";

async function fetchStockQuote(symbol: string, name: string): Promise<StockQuote | null> {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    console.error("FINNHUB_API_KEY not found");
    return null;
  }

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.c) return null;

    const avgCost = AVG_COST[symbol] ?? null;
    return {
      symbol,
      name,
      price: data.c,
      change: data.d ?? 0,
      changePercent: data.dp ?? 0,
      avgCost,
      totalReturnPercent: totalReturnPercent(data.c, avgCost),
      private: false,
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
}

async function fetchCryptoPrices(): Promise<StockQuote[]> {
  const cryptos = PUBLIC_TICKERS.filter((ticker) => ticker.kind === "crypto");
  const ids = cryptos
    .map((ticker) => CRYPTO_COINGECKO_IDS[ticker.symbol])
    .filter(Boolean)
    .join(",");

  if (!ids) return [];

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    return cryptos.flatMap((ticker) => {
      const geckoId = CRYPTO_COINGECKO_IDS[ticker.symbol];
      const quote = geckoId ? data[geckoId] : undefined;
      if (!quote?.usd) return [];

      const avgCost = AVG_COST[ticker.symbol] ?? null;
      return [
        {
          symbol: ticker.symbol,
          name: ticker.name,
          price: quote.usd,
          change: 0,
          changePercent: quote.usd_24h_change ?? 0,
          avgCost,
          totalReturnPercent: totalReturnPercent(quote.usd, avgCost),
          private: false,
        },
      ];
    });
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return [];
  }
}

export async function GET() {
  try {
    const [cryptoData, ...equityResults] = await Promise.all([
      fetchCryptoPrices(),
      ...PUBLIC_TICKERS.filter((ticker) => ticker.kind === "equity").map((ticker) =>
        fetchStockQuote(ticker.symbol, ticker.name),
      ),
    ]);

    const liveBySymbol = new Map<string, StockQuote>();
    for (const quote of [...cryptoData, ...equityResults]) {
      if (quote) liveBySymbol.set(quote.symbol, quote);
    }

    const stocks: StockQuote[] = PUBLIC_TICKERS.map((ticker) => {
      const live = liveBySymbol.get(ticker.symbol);
      const avgCost = AVG_COST[ticker.symbol] ?? null;

      if (live && live.price > 0) {
        return {
          symbol: live.symbol,
          name: ticker.name,
          price: live.price,
          change: live.change,
          changePercent: live.changePercent,
          avgCost,
          totalReturnPercent: totalReturnPercent(live.price, avgCost),
          private: ticker.kind === "private",
        };
      }

      return FALLBACK_STOCKS.find((stock) => stock.symbol === ticker.symbol) ?? null;
    }).filter((stock): stock is StockQuote => stock !== null);

    return NextResponse.json({ stocks });
  } catch (error) {
    console.error("Error in stocks API:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 },
    );
  }
}
