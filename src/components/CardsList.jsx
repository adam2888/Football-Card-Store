import { useCards } from "../context/CardsContext";
import Card from "./Card";

const CardsList = () => {
const {cards,loading,error} = useCards()

return ( 
  <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {loading && <p>Loading ...</p>}
    {error && <div className="error">{error}</div>}
    {cards?.players?.map((card) => (
      <Card key={card.id}player={card}/>
    ))}
  </div>
 )
    }

 
export default CardsList;

