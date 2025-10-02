import {useState,useContext,useEffect,createContext} from "react"


export const CartContext = createContext()

export function CartProvider ({children}) {
  const [cart,setCart] = useState([])




useEffect( ()=> {
},[cart])

const addToCart = (product) => {
setCart((prev) => {
  const exists = prev.find(((item) => item.product.id === product.id))
  if(exists){
    return prev.map((item) => item.product.id === product.id ? {...item,qty: item.qty + 1} : item)
  }
    return [...prev, {product, qty:1}]
})
}

const removeFromCart = (id) => {
   setCart((prev) => {
     return prev.filter((item => item.product.id !== id))
   })
}

const emptyCart = () => {
  setCart((prev)=> {
  return []
  })


  }
  


  return (
    <CartContext.Provider value={{cart,addToCart,removeFromCart,emptyCart}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  return useContext(CartContext)
}