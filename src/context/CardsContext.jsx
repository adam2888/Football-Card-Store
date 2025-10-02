import {createContext, useState, useEffect, useContext} from "react";

export const CardsContext = createContext();

export function CardsProvider({children}){
  
  const [cards,setCards] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)


  useEffect(() => {
    const fetchCards = async () => {
      try{
        const res = await fetch('/players.json')
        if(!res.ok){
          throw new Error("failed to fetch products")
        }
        const data = await res.json()
        setCards(data)
      } catch(err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCards()
  },[])

 const minusQuantity = (id) => {
    setCards((prev)=> {
      return {...prev, players : prev.players.map(item => {
        return item.id === id ? {...item, quantity: item.quantity - 1} : item;
      })}  
    })
 }

 const addQuantity =  (id,amount) => {
  setCards((prev) => {
    return {...prev, players: prev.players.map(item => {
      return item.id === id ? {...item, quantity: item.quantity + amount} : item
    })}
  })
 }

 const restoreBasket = (cart) => {
  setCards((prev) => {
    return {...prev, players: prev.players.map(item => {
      const exisitingItem = cart.find(product => product.product.id === item.id)
      if(exisitingItem){
      return item.id === exisitingItem.product.id ? {...item,quantity:item.quantity + exisitingItem.qty} : item
      } else 
      return item
    })}
   })
 }




 return(
  <CardsContext.Provider value={{cards,loading,error, minusQuantity, addQuantity, restoreBasket}}>
    {children}
  </CardsContext.Provider>
 )
}

export function useCards(){
  return useContext(CardsContext)
}