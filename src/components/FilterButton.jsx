// FilterButton.jsx
import { useCards } from "../context/CardsContext";

const FilterButton = ({ field, Icon, colour, label }) => {
  const { sortBy, sortOrder, handleSort, } = useCards();

    const colorMap = {
    green: "text-green-600",
    gold: "text-yellow-500",
    red: "text-red-500",
    blue: "text-blue-500",
    black:"text-gray-600",
  };

  return (
    <button
      title={`${label}`}
      onClick={() => handleSort(field)}
      className="inline mt-2 px-4 py-2 bg-gray-100  border border-gray-300 rounded-md shadow hover:border-green-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors mx-2 flex items-center"
    >
      
       <Icon className={`w-5 h-5  ${colorMap[colour] || ""} inline mr-2`} />


   
      {sortBy === field && (
        <span className="ml-1">{sortOrder === "desc" ? "↑" : "↓"}</span>
      )}
    </button>
  );
};

export default FilterButton;
