
import HeroSection from "./_components/HeroSection/HeroSection";
import CategoriesSlider from "./_components/CategoriesSlider/CategoriesSlider";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen  space-y-36">
      {/* Decorative background elements */}


      {/* Main content container */}
      <HeroSection/>
      <CategoriesSlider/>
      


    </div>
  );
}
