import React from "react";
import MarketPriceCard from "./MarketPriceCard";
import NextButton from "../elements/NextButton";
// import { buttonStyles } from "../styles/nextbutton";

// Static market data
const marketData = [
  { name: "Apple", price: "$150" },
  { name: "Google", price: "$2800" },
  { name: "Amazon", price: "$3500" },
  { name: "Tesla", price: "$900" },
  
];

const MarketDashboard: React.FC = () => {
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Market Price Dashboard</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {marketData.map((item) => (
          <MarketPriceCard key={item.name} name={item.name} price={item.price} />
        ))}
        <NextButton 
        route= "/not-found"  
        variant ='danger' 
        children= ''  
        />
      </div>
    </div>
  );
};

export default MarketDashboard;