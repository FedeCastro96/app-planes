import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNewPlan = () => {
    navigate("/plans/new");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <h1>Planes ✨</h1>
        </div>
        <div className={styles.navRight}>
          <div className={styles.profileSection} ref={menuRef}>
            <div className={styles.profileInfo} onClick={toggleMenu}>
              <span className={styles.welcome}>
                ¡Hola, {user?.data?.user?.email?.split("@")[0]}!
              </span>
              <div className={styles.profileImage}>
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.data?.user?.email}`}
                  alt="Profile"
                />
              </div>
            </div>
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                <button
                  className={styles.menuItem}
                  onClick={() => {
                    setIsMenuOpen(false);
                    // TODO: Implementar ajustes
                    console.log("Ajustes - No implementado aún");
                  }}
                >
                  ⚙️ Ajustes
                </button>
                <button
                  className={styles.menuItem}
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNewPlan();
                  }}
                >
                  ✨ Nuevo Plan
                </button>
                <button className={styles.menuItem} onClick={handleLogout}>
                  🚪 Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
