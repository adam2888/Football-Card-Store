import {createContext, useState, useEffect, useContext} from "react";

export const CardsContext = createContext();

export function CardsProvider({children}){
  
  const [cards,setCards] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const [filteredCards, setFilteredCards] = useState([]);
  const [positionFilter, setPositionFilter] = useState("All");
  const [nationalityFilter, setNationalityFilter] = useState("All");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder,setSortOrder] = useState("asc")



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

  useEffect(() => {
    console.log("updated")
    if(!cards.players) return;
    let updated = cards.players.filter(player => (
      (positionFilter === "All" || player.position === positionFilter) &&
      (nationalityFilter === "All" || player.team === nationalityFilter)
    ))

    if(sortBy){
     if(sortOrder === "asc") {
       updated = [...updated].sort((a,b) => a[sortBy] - b[sortBy])
     } else if (sortOrder === "desc") {
       updated = [...updated].sort((a,b) => b[sortBy] - a[sortBy])
     }
    
    }
    setFilteredCards(updated)

  },[cards,positionFilter,nationalityFilter, sortBy, sortOrder])
  
  const handleSort = (field) => {
      console.log(sortBy)
     if(field === sortBy){
  
       setSortOrder(sortOrder === "asc" ? "desc" : "asc")
     } else {
      setSortBy(field)
      setSortOrder("desc")
     }
     
  }



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
  <CardsContext.Provider value={{cards,positionFilter, setPositionFilter,nationalityFilter, setNationalityFilter,filteredCards,loading,error, minusQuantity, addQuantity, restoreBasket, setSortBy, sortBy, handleSort, sortOrder}}>
    {children}
  </CardsContext.Provider>
 )
}

export function useCards(){
  return useContext(CardsContext)
}