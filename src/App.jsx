import CardsList from "./components/CardsList";
import Header from "./components/Header";
import Filter from "./components/Filter";
import ScrollTopButton from "./components/ScrollTopButton";



const app = () => {
  return ( <>
   <Header />
   <Filter />
   <CardsList />
   <ScrollTopButton />
  </> );
}
 
export default app;