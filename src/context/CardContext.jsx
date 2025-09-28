import {createContext, useState, useEffect, useContext} from "react";

export const CardContext = createContext();

export function CardProvider({children}){
  
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

 return(
  <CardContext.Provider value={{cards,loading,error}}>
    {children}
  </CardContext.Provider>
 )
}

export function useCards(){
  return useContext(CardContext)
}