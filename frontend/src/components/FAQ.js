<<<<<<< HEAD
import React from 'react';
const FAQ = () => (
  <section className="p-6 my-5 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
    <dl className="space-y-4">
      <div>
        <dt className="font-bold">How do I create a new issue?</dt>
        <dd className="text-gray-700">Click "Create New Issue" in the main navigation.</dd>
      </div>
      <div>
        <dt className="font-bold">Can I track multiple issues?</dt>
        <dd className="text-gray-700">Yes, all reported issues appear under "Reported Academic Issues".</dd>
      </div>
    </dl>
  </section>
);

=======
import React from 'react';

const FAQ = () => (
  <section className="p-6 my-6 bg-white shadow-md rounded-lg hover:shadow-2xl transition-all duration-500">
    <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
    <dl className="space-y-4">
      <div>
        <dt className="font-bold">How do I create a new issue?</dt>
        <dd className="text-gray-700">Click "Create New Issue" or "+" icon in the main navigation.</dd>
      </div>
      <div>
        <dt className="font-bold">Can I track multiple issues?</dt>
        <dd className="text-gray-700">Yes, all reported issues appear under "Reports".</dd>
      </div>
    </dl>
  </section>
);

>>>>>>> e6153e15d150aee47e062ce1b1e36b03bf6f6bae
export default FAQ;