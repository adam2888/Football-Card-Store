import { useCards } from "../context/CardsContext";
import Card from "./Card";

const CardsList = () => {
const {filteredCards, cards,loading,error} = useCards()

return ( 
  <div className="m-4 sm:m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {loading && <p>Loading ...</p>}
    {error && <div className="error">{error}
  </div>}
     {filteredCards.length === 0 ? <p className="font-semibold">No players found</p> : 
      filteredCards?.map((card) => (
      <Card className="w-full" key={card.id} player={card}/>
    ))}
  </div>
 )
    }

 
export default CardsList;

