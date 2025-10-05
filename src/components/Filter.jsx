import { useCards } from "../context/CardsContext";
import { FaFutbol, FaTrophy, FaStar, FaPoundSign } from "react-icons/fa";
import { FaShirt, FaHands } from "react-icons/fa6";

const Filter = () => {
    const {positionFilter,setPositionFilter, nationalityFilter, setNationalityFilter, cards, setSortBy, sortBy, sortOrder, handleSort} = useCards()
    
    
    const uniqueNationalities = Array.from(
      new Set (cards?.players?.map(players => players.team))
    )
    const sortedUniqueNationalities = [...uniqueNationalities].sort((a,b) => (a.localeCompare(b)))

  return ( 
  <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-gray-100 rounded-lg shadow-md">
  <div className="">
    <select
      value={positionFilter}
      onChange={e => setPositionFilter(e.target.value)}
      className="px-6 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="All">All Positions</option>
      <option value="Goalkeeper">Goalkeepers</option>
      <option value="Defender">Defenders</option>
      <option value="Midfielder">Midfielders</option>
      <option value="Forward">Forwards</option>
    </select>

    <select
      value={nationalityFilter}
      onChange={e => setNationalityFilter(e.target.value)}
      className="px-6 py-4 mx-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="All">All Nationalities</option>
      {sortedUniqueNationalities.map(country => (
      <option key={country}>{country}</option>
    ))}
    </select>
  </div>
  <div className="">
   <p className="mb-2 text-gray-700 font-semibold">
  Sort Players By:
</p>
<button
  onClick={() => handleSort("overall")}
  className="px-4 py-2 bg-green-800 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors mx-2"
><FaStar className="w-8 h-5 text-yellow-300 inline" />
  {sortBy === "overall"  && (sortOrder === "desc" ? " ↑ " : " ↓ "  )}
</button>
<button
  onClick={() => handleSort("appearances")}
  className="px-4 py-2 bg-green-800 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors mx-2"
> <FaShirt className="w-10 h-5 text-red-500 inline" />
  {sortBy === "appearances"  && (sortOrder === "desc" ? " ↑ " : " ↓ "  )}
</button>
<button
  onClick={() => handleSort("goals")}
  className="px-4 py-2 bg-green-800  text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors mx-2"
><FaFutbol className="w-8 h-5 text-white-600 inline" />
  {sortBy === "goals"  && (sortOrder === "asc" ? " ↓ " : " ↑ ")}
</button>
<button
  onClick={() => handleSort("trophies")}
  className="px-4 py-2 bg-green-800 text-white  font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors mx-2"
><FaTrophy className="w-8 h-5 text-yellow-600 inline" />
  {sortBy === "trophies"  && (sortOrder === "desc" ? " ↑ " : " ↓ "  )}
</button>
<button
  onClick={() => handleSort("price")}
  className="px-4 py-2 bg-green-800 text-white  font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors mx-2"
><FaPoundSign className="w-8 h-5 text-white-600 inline" />
  {sortBy === "price"  && (sortOrder === "desc" ? " ↑ " : " ↓ "  )}
</button>

 
  </div>
</div>

   );
}
 
export default Filter;