import React from "react";

function Sidebaritem({ Icon, text }) {
  return (
    <div className="flex items-center px-4 py-2 hover:bg-gray-400">
      <div className="icon">
        <Icon />
      </div>
      <p className="text-sm ml-4 text-gray-600">{text}</p>
    </div>
  );
}

export default Sidebaritem;
