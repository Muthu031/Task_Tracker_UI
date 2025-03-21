import React from "react";
import { Card, CardContent } from "./view/card";


const MarketPriceCard: React.FC<{ name: string; price: string }> = ({ name, price }) => (
  <Card className="p-4 w-full md:w-1/4">
    <CardContent className="text-center">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-xl text-green-600">{price}</p>
    </CardContent>
  </Card>
);

export default MarketPriceCard;