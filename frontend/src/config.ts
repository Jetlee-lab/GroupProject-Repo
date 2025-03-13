let BACKEND_SERVER = null;
// O11- if (process.env.REACT_APP_BACKEND_SERVER) {
// O11-   BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
// O11- } else {
  BACKEND_SERVER = "http://localhost:8000/api/v1";
// O11-}

const config = {
    // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/dashboard',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    API_SERVER: BACKEND_SERVER
};

export default config;