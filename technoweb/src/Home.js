import { Link } from "react-router-dom";

function Home() {
  return <div>
    <Link to="/admin"> Link to admin dashboard </Link>
    <br></br>
    <Link to="/form"> Link to formulaire </Link>
    <br></br>
    <Link to="/login"> Link to login </Link>
  </div>;
  
}

export default Home;