<<<<<<< HEAD
import React from "react";

const CarouselSlide = ({ imgSrc, primaryText, secondaryText, alt }) => {
  return (
    <>
      <div className=" bg-white rounded-lg  shadow-md">
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-60 object-cover rounded-lg"
        />
        <h2 className="text-xl font-semibold mb-2">{primaryText}</h2>
        <p className="text-gray-600">
        {secondaryText}
        </p>
      </div>
    </>
  );
};

export default CarouselSlide;
=======
import React from "react";

const CarouselSlide = ({ imgSrc, primaryText, secondaryTest, alt }) => {
  return (
    <>
      <div className=" bg-white rounded-lg shadow-md">
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-60 object-cover rounded-lg"
        />
        <h2 className="text-xl font-semibold mb-2">{primaryText}</h2>
        <p className="text-gray-600">
        {secondaryTest}
        </p>
      </div>
    </>
  );
};

export default CarouselSlide;
>>>>>>> e6153e15d150aee47e062ce1b1e36b03bf6f6bae
