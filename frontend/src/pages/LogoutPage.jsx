import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AITS_Logo from '../components/images/logo2.jpg';
import { logout } from '../auth/lib/allauth';

const LogoutPage = () => {
  const [response, setResponse] = useState({ fetching: false, content: null });

  function submit() {
    setResponse({ ...response, fetching: true });
    logout()
      .then((content) => {
        setResponse((r) => {
          return { ...r, content };
        });
      })
      .catch((e) => {
        console.error(e);
        window.alert(e);
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false };
        });
      });
  }

  if (response.content) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-normaly h-screen bg-blue-100 relative">
      {/* Logo and Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center mt-24 space-y-4 lg:space-y-0 lg:space-x-8">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <img src={AITS_Logo} alt="AITS Logo" className="w-40 h-40" />
        </div>

        {/* Main Content */}
        <div className="text-center lg:text-left space-y-4">
          <h1 className="text-4xl font-bold text-black-800">Logging Out</h1>
          <p className="text-black-100 font-bold">Thank you for using AITS</p>
          <button
            disabled={response.fetching}
            onClick={submit}
            className="bg-blue-500 hover:bg-white-100 text-white px-6 py-2 rounded shadow transition-all"
          >
            {response.fetching ? 'Logging out...' : 'Logout'}
          </button>
          <p className="text-lg text-black-100 font-bold mt-4">See You Later</p>
          <Link to="/account/login">
            <button className="bg-blue-500 hover:bg-white-100 text-white px-6 py-2 rounded shadow transition-all">
              Log in Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
