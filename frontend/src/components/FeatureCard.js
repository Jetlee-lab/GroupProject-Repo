<<<<<<< HEAD
import React from 'react'

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-gray-700 mt-1">{description}</p>
    </div>
  );
};

=======
import React from 'react'

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-gray-700 mt-1">{description}</p>
    </div>
  );
};

>>>>>>> e6153e15d150aee47e062ce1b1e36b03bf6f6bae
export default FeatureCard;