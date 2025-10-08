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
  const [searchQuery, setSearchQuery] = useState("")
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
    if(!cards.players) return;

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeRegex = new RegExp(escapeRegex(searchQuery), 'i');

    let updated = cards.players.filter(player => (
      (positionFilter === "All" || player.position === positionFilter) &&
      (nationalityFilter === "All" || player.team === nationalityFilter) &&
      (searchQuery === "" || safeRegex.test(player.name))
    ))
    
    let sorted = [...updated]
   

    if(sortBy){
  
      if(sortBy === "cleanSheets"){
       
         sorted = sorted.filter(card => card.position === "Goalkeeper")
      }

      if(sortBy === "goals"){
       
         sorted = sorted.filter(card => card.position !== "Goalkeeper")
      }

     if(sortOrder === "asc") {
       sorted = [...sorted].sort((a,b) => a[sortBy] - b[sortBy])
     } else if (sortOrder === "desc") {
       sorted = [...sorted].sort((a,b) => b[sortBy] - a[sortBy])
     }
    
    }
    setFilteredCards(sorted)

  },[cards,positionFilter,nationalityFilter, sortBy, sortOrder, searchQuery])


  
  const handleSort = (field) => {
     if(field === "cleanSheets"){
      setFilteredCards(filteredCards.filter(card => card.position === "goalkeeper"))
     }
    
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
  <CardsContext.Provider value={{cards,positionFilter, setPositionFilter,nationalityFilter, setNationalityFilter,filteredCards,loading,error, minusQuantity, addQuantity, restoreBasket, setSortBy, sortBy, handleSort, sortOrder, searchQuery, setSearchQuery}}>
    {children}
  </CardsContext.Provider>
 )
}

export function useCards(){
  return useContext(CardsContext)
}