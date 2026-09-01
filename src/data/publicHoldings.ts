export type HoldingKind = "equity" | "crypto" | "private";

export interface PublicTicker {
  symbol: string;
  name: string;
  kind: HoldingKind;
}

/** CoinGecko simple/price ids for public crypto tickers. */
export const CRYPTO_COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  ZEC: "zcash",
  HYPE: "hyperliquid",
  LIT: "lighter",
};

export const PUBLIC_TICKERS: PublicTicker[] = [
  { symbol: "BTC", name: "Bitcoin", kind: "crypto" },
  { symbol: "ETH", name: "Ethereum", kind: "crypto" },
  { symbol: "ZEC", name: "Zcash", kind: "crypto" },
  { symbol: "HYPE", name: "Hyperliquid", kind: "crypto" },
  { symbol: "LIT", name: "Lighter", kind: "crypto" },
  { symbol: "NVDA", name: "NVIDIA", kind: "equity" },
  { symbol: "TSLA", name: "Tesla", kind: "equity" },
  { symbol: "GOOGL", name: "Google", kind: "equity" },
  { symbol: "AMZN", name: "Amazon", kind: "equity" },
  { symbol: "MU", name: "Micron", kind: "equity" },
  { symbol: "VOO", name: "S&P 500", kind: "equity" },
  { symbol: "TSM", name: "TSMC", kind: "equity" },
  { symbol: "COIN", name: "Coinbase", kind: "equity" },
  { symbol: "HOOD", name: "Robinhood", kind: "equity" },
  { symbol: "META", name: "Meta", kind: "equity" },
  { symbol: "IREN", name: "Iris Energy", kind: "equity" },
  { symbol: "MP", name: "MP Materials", kind: "equity" },
  { symbol: "INTC", name: "Intel", kind: "equity" },
  { symbol: "VTI", name: "Total Market", kind: "equity" },
  { symbol: "AAPL", name: "Apple", kind: "equity" },
  { symbol: "ASML", name: "ASML", kind: "equity" },
  { symbol: "CRM", name: "Salesforce", kind: "equity" },
  { symbol: "FIG", name: "Figma", kind: "equity" },
  { symbol: "LLY", name: "Eli Lilly", kind: "equity" },
  { symbol: "MRNA", name: "Moderna", kind: "equity" },
  { symbol: "SPCX", name: "SpaceX", kind: "private" },
];

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  avgCost: number | null;
  totalReturnPercent: number | null;
  private: boolean;
}

/** Hardcoded average cost (per share / coin). Never derived from lots or position size. */
export const AVG_COST: Record<string, number> = {
  BTC: 9098.86,
  ETH: 2333.02,
  ZEC: 61.19,
  HYPE: 40,
  LIT: 3.3,
  NVDA: 3.61,
  TSLA: 326.98,
  GOOGL: 294.48,
  AMZN: 5.75,
  MU: 92.08,
  VOO: 555.24,
  TSM: 171.52,
  COIN: 146.79,
  HOOD: 97.06,
  META: 291.13,
  IREN: 28.34,
  MP: 72.6,
  INTC: 98.56,
  VTI: 351.11,
  AAPL: 76.54,
  ASML: 1550.13,
  CRM: 153.19,
  FIG: 16.9,
  LLY: 1062.65,
  MRNA: 35.83,
  SPCX: 147.11,
};

export const FALLBACK_STOCKS: StockQuote[] = [
  { symbol: "BTC", name: "Bitcoin", price: 77343, change: -1688.08, changePercent: -2.14, avgCost: AVG_COST.BTC, totalReturnPercent: 750.03, private: false },
  { symbol: "ETH", name: "Ethereum", price: 2422.8, change: -55.29, changePercent: -2.23, avgCost: AVG_COST.ETH, totalReturnPercent: 3.85, private: false },
  { symbol: "ZEC", name: "Zcash", price: 822.29, change: -32.23, changePercent: -3.92, avgCost: AVG_COST.ZEC, totalReturnPercent: 1243.83, private: false },
  { symbol: "HYPE", name: "Hyperliquid", price: 82.43, change: -1.9, changePercent: -2.31, avgCost: AVG_COST.HYPE, totalReturnPercent: 106.08, private: false },
  { symbol: "LIT", name: "Lighter", price: 3.67, change: 0.12, changePercent: 3.33, avgCost: AVG_COST.LIT, totalReturnPercent: 11.21, private: false },
  { symbol: "NVDA", name: "NVIDIA", price: 217.97, change: -2.81, changePercent: -1.27, avgCost: AVG_COST.NVDA, totalReturnPercent: 5944.8, private: false },
  { symbol: "TSLA", name: "Tesla", price: 356.38, change: -11.57, changePercent: -3.14, avgCost: AVG_COST.TSLA, totalReturnPercent: 8.99, private: false },
  { symbol: "GOOGL", name: "Google", price: 334.75, change: -4.6, changePercent: -1.36, avgCost: AVG_COST.GOOGL, totalReturnPercent: 13.67, private: false },
  { symbol: "AMZN", name: "Amazon", price: 254.76, change: -5.01, changePercent: -1.93, avgCost: AVG_COST.AMZN, totalReturnPercent: 4328.47, private: false },
  { symbol: "MU", name: "Micron", price: 935.72, change: -23.01, changePercent: -2.4, avgCost: AVG_COST.MU, totalReturnPercent: 916.2, private: false },
  { symbol: "VOO", name: "S&P 500", price: 700.1, change: -4.79, changePercent: -0.68, avgCost: AVG_COST.VOO, totalReturnPercent: 26.09, private: false },
  { symbol: "TSM", name: "TSMC", price: 412.95, change: -2.37, changePercent: -0.57, avgCost: AVG_COST.TSM, totalReturnPercent: 140.76, private: false },
  { symbol: "COIN", name: "Coinbase", price: 176.84, change: -11.28, changePercent: -6.0, avgCost: AVG_COST.COIN, totalReturnPercent: 20.47, private: false },
  { symbol: "HOOD", name: "Robinhood", price: 104.45, change: 0.19, changePercent: 0.18, avgCost: AVG_COST.HOOD, totalReturnPercent: 7.61, private: false },
  { symbol: "META", name: "Meta", price: 583, change: 10.66, changePercent: 1.86, avgCost: AVG_COST.META, totalReturnPercent: 100.25, private: false },
  { symbol: "IREN", name: "Iris Energy", price: 39.63, change: -2.58, changePercent: -6.11, avgCost: AVG_COST.IREN, totalReturnPercent: 39.84, private: false },
  { symbol: "MP", name: "MP Materials", price: 58.67, change: -1.5, changePercent: -2.49, avgCost: AVG_COST.MP, totalReturnPercent: -19.19, private: false },
  { symbol: "INTC", name: "Intel", price: 87.45, change: -0.03, changePercent: -0.03, avgCost: AVG_COST.INTC, totalReturnPercent: -11.27, private: false },
  { symbol: "VTI", name: "Total Market", price: 375.22, change: -2.93, changePercent: -0.77, avgCost: AVG_COST.VTI, totalReturnPercent: 6.87, private: false },
  { symbol: "AAPL", name: "Apple", price: 324.86, change: 8.01, changePercent: 2.53, avgCost: AVG_COST.AAPL, totalReturnPercent: 324.41, private: false },
  { symbol: "ASML", name: "ASML", price: 1747.34, change: 3.18, changePercent: 0.18, avgCost: AVG_COST.ASML, totalReturnPercent: 12.72, private: false },
  { symbol: "CRM", name: "Salesforce", price: 205.02, change: -0.67, changePercent: -0.33, avgCost: AVG_COST.CRM, totalReturnPercent: 33.83, private: false },
  { symbol: "FIG", name: "Figma", price: 27.34, change: -0.15, changePercent: -0.55, avgCost: AVG_COST.FIG, totalReturnPercent: 61.78, private: false },
  { symbol: "LLY", name: "Eli Lilly", price: 1162.06, change: 5.33, changePercent: 0.46, avgCost: AVG_COST.LLY, totalReturnPercent: 9.35, private: false },
  { symbol: "MRNA", name: "Moderna", price: 149, change: 8.66, changePercent: 6.17, avgCost: AVG_COST.MRNA, totalReturnPercent: 315.85, private: false },
  { symbol: "SPCX", name: "SpaceX", price: 143.31, change: -0.38, changePercent: -0.26, avgCost: AVG_COST.SPCX, totalReturnPercent: -2.58, private: true },
];

export function totalReturnPercent(price: number, avgCost: number | null): number | null {
  if (!avgCost || avgCost <= 0) return null;
  return ((price - avgCost) / avgCost) * 100;
}
