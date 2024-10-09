import Navbar from "./components/Navbar";
import Card from "./components/Card";

function App() {


  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center flex-wrap gap-5 py-20">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}

export default App
