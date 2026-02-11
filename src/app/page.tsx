
import HeroSection from "./_components/HeroSection/HeroSection";
import CategoriesSlider from "./_components/CategoriesSlider/CategoriesSlider";
import AllProductHome from "./_components/AllProductHome/AllProductHome";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen space-y-36">

      <HeroSection/>
      <CategoriesSlider/>
      <AllProductHome/>


    </div>
  );
}
