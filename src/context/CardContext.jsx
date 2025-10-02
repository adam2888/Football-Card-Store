import {createContext, useState, useContext} from "react";


export const CardContext = createContext();

export function CardProvider({children}){

  const [quantity,setQuantity] = useState(0)
  


 return(
  <CardContext.Provider value={{quantity}}>
    {children}
  </CardContext.Provider>
 )
}

export function useCard(){
  return useContext(CardContext)
}