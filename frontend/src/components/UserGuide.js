import React from 'react';

const UserGuide = () => (
  <section className="p-6 my-5  bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold mb-4">User Guide</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong>Creating an Issue:</strong> Click "Create New Issue" to report a problem.</li>
      <li><strong>Tracking Issues:</strong> View submitted issues in "Reported Academic Issues".</li>
      <li><strong>Issue Status:</strong> Follow issue progress through different stages.</li>
      <li><strong>Editing or Closing an Issue:</strong> Mark issues as closed when resolved.</li>
    </ul>
  </section>
);

export default UserGuide;