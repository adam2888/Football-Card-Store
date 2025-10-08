import { useCards } from "../context/CardsContext";
import FilterButton from "./FilterButton";
import { FaFutbol, FaTrophy, FaStar, FaPoundSign } from "react-icons/fa";
import { FaShirt, FaHands } from "react-icons/fa6";


const Filter = () => {
    const {positionFilter,setPositionFilter, nationalityFilter, setNationalityFilter, cards, setSortBy, sortBy, sortOrder, handleSort,searchQuery, setSearchQuery} = useCards()
    
    
    const uniqueNationalities = Array.from(
      new Set (cards?.players?.map(players => players.team))
    )
    const sortedUniqueNationalities = [...uniqueNationalities].sort((a,b) => (a.localeCompare(b)))

  return ( 
  <div className="flex flex-col justify-between md:flex-row gap-4 items-center p-4 bg-gray-100 rounded-lg shadow-md">
  <div className="">
    <select
      value={positionFilter}
      onChange={e => setPositionFilter(e.target.value)}
      className="w-full md:w-auto px-6 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
      className="w-full md:w-auto px-6 py-4 my-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="All">All Nationalities</option>
      {sortedUniqueNationalities.map(country => (
      <option key={country}>{country}</option>
    ))}
    </select>
  </div>
  <div className="w-full">
    <input
    type="text"
    placeholder="Search players..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full  px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full "
    />
  </div>
  <div className="px-6 py-4 flex-wrap ">
   <p className="">
  Sort By:
</p>
<FilterButton field="overall" label="Rating" Icon={FaStar} colour="black" />
<FilterButton field="appearances" label="Appearances" Icon={FaShirt} colour="black" />
<FilterButton field="goals" label="Goals" Icon={FaFutbol} colour="black" />
<FilterButton field="cleanSheets" label="Clean Sheets" Icon={FaHands} colour="black" />
<FilterButton field="trophies" label="Trophies" Icon={FaTrophy} colour="black" />
<FilterButton field="price" label="Card Price" Icon={FaPoundSign} colour="black" />

  </div>
</div>

   );
}
 
export default Filter;