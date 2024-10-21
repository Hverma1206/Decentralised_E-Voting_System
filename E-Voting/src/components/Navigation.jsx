// Navigation.jsx
import { Link } from "react-router-dom";
import "./Navigation.css";
const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/candidate">Candidate</Link>
        </li>
        <li>
          <Link to="/voter">Voter</Link>
        </li>
        <li>
          <Link to="/vote">Vote</Link>
        </li>
        <li>
          <Link to="/election_commision">Election Commission</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
