import { useNavigate } from "react-router-dom";

function Header({ title }) {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h2>{title}</h2>

      <div className="header-actions">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/connexion")}>Connexion</button>
      </div>
    </div>
  );
}

export default Header;