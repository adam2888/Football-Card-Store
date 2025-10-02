import CardsList from "./components/CardsList";
import Header from "./components/Header";
import Filter from "./components/Filter";


const app = () => {
  return ( <>
   <Header />
   <Filter />
   <CardsList />
  </> );
}
 
export default app;