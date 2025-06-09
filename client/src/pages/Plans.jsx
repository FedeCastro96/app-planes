import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import styles from "./Plans.module.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const { user, logout } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPlans = useCallback(async () => {
    try {
      console.log("→ Intentando traer los planes...");
      console.log("🔑 Token usado:", user?.data?.token);
      const response = await axios.get("http://localhost:5000/api/plans", {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      console.log("✅ Respuesta del servidor:", response.data);
      console.log(
        "📸 Estructura de imágenes:",
        response.data.map((plan) => ({ id: plan._id, images: plan.images }))
      );
      setPlans(response.data);
    } catch (error) {
      console.error("❌ Error al traer los planes:", error);
      if (error.response?.status === 401) {
        console.log("🔒 Token inválido o expirado");
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [user?.data?.token, logout, navigate]);

  useEffect(() => {
    if (user?.data?.token) {
      console.log("🔑 Token presente, llamando a fetchPlans...");
      fetchPlans();
    } else {
      console.log("🚫 No hay token, redirigiendo al login");
      navigate("/login");
    }
  }, [user, fetchPlans, navigate]);

  console.log("📊 Estado actual:", { loading, plansCount: plans.length, user });

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.container}>
        {loading ? (
          <p className={styles.loading}>Cargando planes...</p>
        ) : plans.length === 0 ? (
          <p className={styles.noPlans}>No hay planes disponibles</p>
        ) : (
          <div className={styles.grid}>
            {plans.map((plan) => (
              <div key={plan._id} className={styles.card}>
                {plan.images && plan.images.length > 0 ? (
                  <div className={styles.imageContainer}>
                    <img
                      src={plan.images[0]}
                      alt={plan.title}
                      className={styles.image}
                      onError={(e) => {
                        console.error(
                          `Error al cargar la imagen: ${plan.images[0]}`
                        );
                        e.target.src = "https://picsum.photos/200/300";
                      }}
                    />
                  </div>
                ) : (
                  <div className={styles.imageContainer}>
                    <img
                      src="https://picsum.photos/200/300"
                      alt="Imagen por defecto"
                      className={styles.image}
                    />
                  </div>
                )}
                <h2 className={styles.cardTitle}>{plan.title}</h2>
                <p className={styles.description}>{plan.description}</p>
                {plan.link && (
                  <a
                    href={plan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Ver más
                  </a>
                )}
                <p className={styles.rating}>
                  ⭐ {plan.rating || "Sin calificación"}
                </p>
                <p
                  className={`${styles.status} ${
                    plan.status === "Done"
                      ? styles.statusDone
                      : styles.statusPending
                  }`}
                >
                  {plan.status}
                </p>
                <div className={styles.tags}>
                  {plan.tags?.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;
