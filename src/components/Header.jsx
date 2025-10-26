import { FaShoppingCart,FaCross } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCards } from "../context/CardsContext";



const  Header = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const {cart, removeFromCart, emptyCart} = useCart()
  const {addQuantity, restoreBasket} = useCards()

  const itemCount = cart.reduce((acc,item) => acc + item.qty, 0)
  const total = cart.reduce((acc,item) => acc + item.qty * item.product.price,0 ).toFixed(2)


  return (
<header className="bg-green-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">

       <h1 className="text-2xl font-bold text-white">Football Card Store</h1>
       <div className="relative">
        <button onClick={() => setShowDropDown(!showDropDown)} className="cursor-pointer">
          <FaShoppingCart className="text-2xl text-white"></FaShoppingCart>
          
             {itemCount > 0 && (
              <span className = "absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{itemCount}</span>
             )
               }
          
        </button>
        {showDropDown && (
          <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
            <div className="p-4">
               <h2 className="font-semibold text-lg mb-2">Cart Items</h2>
               {cart.length === 0 ? (<p className="text-grey-500 text-sm">Your cart is empty</p>) : 
               <>
               <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                 {cart.map((item) => (
                      <li key={item.product.id} className="flex justify-between items-center py-2">
                        <div>
                           <p className="font-semi-bold"><span className="font-semibold"> {item.product.name} Card</span></p>
                           <p className="text-sm text-gray-500">{item.qty} x £{item.product.price}</p>
                        </div>
                        <button className=" mt-3 text-sm text-red-500 hover:underline" onClick={() => {
                          removeFromCart(item.product.id,item.qty)
                          addQuantity(item.product.id,item.qty)}
                        }>Remove</button>
                      </li>
                    ))}

               </ul>
               <div className="mt-4 flex justify-between">
                <span>Total: </span>
                <span className="font-semibold"> £{total}</span>
               </div>
               <button onClick={() => {
                emptyCart()
                restoreBasket(cart)}}
                className="mt-3 w-full text-red-500  py-1 rounded transition hover:underline">Clear Cart</button>
               </>
               }
            </div>
          </div>
        )}
       </div>

    </header>
    );
}
 
export default Header ;
 