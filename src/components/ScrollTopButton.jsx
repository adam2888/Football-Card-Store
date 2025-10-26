import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";


const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll)
  },[])

   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return ( 
     <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-blue-600 p-3 shadow-lg transition-opacity duration-300 hover:bg-blue-700 active:scale-95 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 text-white" />
    </button>
   );
}
 
export default ScrollTopButton;




  



 

  