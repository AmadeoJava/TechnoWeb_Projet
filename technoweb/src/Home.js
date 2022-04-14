import { Link } from "react-router-dom";
import MapComponent from "./MapComponent";
import './index.css';

function Home() {
  return <div>
    <Link to="/admin"> Link to admin dashboard </Link>

    <MapComponent />
  </div>;
  
}

export default Home;