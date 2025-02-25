import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <>
    <Header/>
    <main className='flex space-between'>
      <SideBar/>
      <Dashboard/>
    </main>
    </>

  );
}

export default App;
