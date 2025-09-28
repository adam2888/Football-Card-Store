import { useCards } from "../context/CardContext";

const CardList = () => {
const {cards,loading,error} = useCards()

return ( 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {loading && <p>Loading ...</p>}
    {error && <div className="error">{error}</div>}
    {cards?.players?.map((card) => (
      <p key={card.id}>{card.name}</p>
    ))}
  </div>
 )
    }

 
export default CardList;

