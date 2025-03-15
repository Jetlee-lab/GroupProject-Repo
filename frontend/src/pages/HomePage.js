import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselSlide from "../components/CarouselSlide";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % 4);
  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1));

  return (
    <div className="flex flex-col items-center bg-blue-100 text-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-6">"Streamline Academic & Issue Tracking with Ease!"</h1>

      <div className="relative w-full">
        {/* Carousel */}
        <Carousel 
          selectedItem={currentSlide}
          onChange={setCurrentSlide}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          autoPlay
          className="rounded-lg shadow-lg"
        >
         <CarouselSlide imgSrc={"https://plus.unsplash.com/premium_photo-1682310075673-b408eb1ca6fd?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={"Issue Tracking"} primaryText={"📌 Issue Tracking"} secondaryTest={" Report and resolve academic concerns quickly and efficiently."}/> 

          <CarouselSlide imgSrc={"https://plus.unsplash.com/premium_photo-1682309524785-cf2288f7b544?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={"Notifications"} primaryText={"🔔 Notifications"} secondaryTest={"Get real-time updates on issue resolutions and academic progress."}/> 

          <CarouselSlide imgSrc={"https://images.unsplash.com/flagged/photo-1558963675-94dc9c4a66a9?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={"Reports & Insights"} primaryText={"📊 Reports & Insights"} secondaryTest={"View academic data and issue tracking reports in one place."}/>

          <CarouselSlide imgSrc={"https://images.unsplash.com/photo-1593698054469-2bb6fdf4b512?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={"User Roles"} primaryText={"👤 User Roles"} secondaryTest={"Custom dashboards for students, faculty, and administrators."}/>


        
        </Carousel>

        {/* Toggle Buttons */}
        <button 
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
        >
          ◀
        </button>
        <button 
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default HomePage;