
import { useState } from "react";

export default function BingoPrizeCalculator() {
  const [collected, setCollected] = useState(1000);
  const [expenses, setExpenses] = useState(300);
  const [results, setResults] = useState(null);

  const roundDown10 = (num) => Math.floor(num / 10) * 10;

  const calculatePrizes = () => {
    const prizePool = collected - expenses;
    let grandPrizes = 0;
    if (prizePool >= 750) grandPrizes = 3;
    else if (prizePool >= 500) grandPrizes = 2;
    else if (prizePool >= 250) grandPrizes = 1;

    const grandPrizeTotal = grandPrizes * 250;
    const remaining = prizePool - grandPrizeTotal;
    const specialsTotal = remaining * 0.5;
    const regularsTotal = remaining * 0.3;
    const fullHouseTotal = remaining * 0.2;

    const specialsPrize = roundDown10(specialsTotal / 5);
    const regularsPrize = roundDown10(regularsTotal / 5);
    const fullHousePrize = roundDown10(fullHouseTotal);

    const used = grandPrizeTotal + specialsPrize * 5 + regularsPrize * 5 + fullHousePrize;
    const bonusPrize = roundDown10(prizePool - used);

    const gameOrder = [
      { game: 1, type: "Regular", prize: regularsPrize },
      { game: 2, type: "Regular", prize: regularsPrize },
      { game: 3, type: "Special", prize: specialsPrize },
      { game: 4, type: "Regular", prize: regularsPrize },
      { game: 5, type: "Special", prize: specialsPrize },
      { game: "Bonus", type: "Bonus Game", prize: bonusPrize },
      { game: 6, type: "Special", prize: specialsPrize },
      { game: 7, type: "Regular", prize: regularsPrize },
      { game: 8, type: "Special", prize: specialsPrize },
      { game: 9, type: "Regular", prize: regularsPrize },
      { game: 10, type: "Special", prize: specialsPrize },
      { game: 11, type: "Full House (Grand Prize)", prize: fullHousePrize },
    ];

    for (let i = 0; i < grandPrizes; i++) {
      gameOrder.push({ game: `Grand Prize ${i + 1}`, type: "Jackpot", prize: 250 });
    }

    setResults(gameOrder);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Bingo Prize Calculator</h1>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          value={collected}
          onChange={(e) => setCollected(Number(e.target.value))}
          placeholder="Total Collected"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(Number(e.target.value))}
          placeholder="Total Expenses"
          className="p-2 border rounded"
        />
      </div>
      <button onClick={calculatePrizes} className="px-4 py-2 bg-blue-600 text-white rounded">
        Calculate Prizes
      </button>

      {results && (
        <div className="space-y-2">
          {results.map((r, idx) => (
            <div
              key={idx}
              className="flex justify-between bg-white shadow rounded p-3"
            >
              <span>{`Game ${r.game} - ${r.type}`}</span>
              <span className="font-semibold">${r.prize}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
