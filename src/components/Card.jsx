import { FaFutbol, FaTrophy } from "react-icons/fa";
import { FaShirt, FaHands } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useCards } from "../context/CardsContext";





const Card = (card) => {
  const {addToCart} = useCart()
  const {minusQuantity} = useCards()

  
  

  
 

  return ( <>
<div>
<div className="relative w-56 h-80 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500 rounded-2xl shadow-xl border-4 border-yellow-700 flex flex-col items-center p-2 border">
  
      <div className="absolute top-2 left-2 flex flex-col items-center">
  
        <span className="text-sm uppercase">{card.player.position}</span>
      </div>

      <div className="absolute top-2 right-2 flex flex-col items-center">
        <span className="text-3xl font-bold">{card.player.overall}</span>
      </div>

      <div className="mt-10 text-lg font-bold text-center">{card.player.name}</div>

      <div className="my-5 items-center">
        <img src={card.player.flag} alt={card.player.team} className="w-25 h-15 mb-1  rounded" />
      </div>

      <div className="mt-auto w-full flex flex-col items-start justify-center text-sm font-semibold bg-yellow-200 rounded-lg p-2 gap-2">
        <div className="flex items-start gap-1 " >
          <FaShirt className="w-5 h-5 text-blue-600" />
          <p>{card.player.appearances}</p>
        </div>
          {card.player.position === "Goalkeeper"?
          <div className="flex items-start gap-1 ">
          <FaHands className="w-5 h-5 text-gray-600" />
          <p>{card.player.cleanSheets}</p>
        </div> :  
        <div className="flex items-start gap-1 ">
            <FaFutbol className="w-5 h-5 text-green-600" />
          <p>{card.player.goals}</p>
        </div> }
        
        <div className="flex items-start gap-1 ">
            <FaTrophy className="w-5 h-5 text-yellow-600" />
          <p>{card.player.trophies}</p>
        </div>
      </div>
    </div>
<div className="m-5">
  <p className="w-50 font-bold text-center">£{card.player.price}</p>
  <p className="my-2 w-50 text-center">Qty:{card.player.quantity}</p>
  {card.player.quantity > 0 ? 
   <button onClick= {
    () => {
      {addToCart(card.player);
      minusQuantity(card.player.id)}
    }
  } className="w-50 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Buy Now</button> :
   <button 
  className="w-50 bg-red-600 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed" 
  disabled>
  Unavailable
</button>
}
</div>
    </div>
  </> );
}
 
export default Card;