import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificamos que exista un token y que tenga el formato correcto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      code: 401,
      message:
        "Token no proporcionado o formato inválido. Debe ser 'Bearer <token>'",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificamos y decodificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos tanto el ID como el objeto completo del usuario en la request
    req.userId = decoded.id;
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: "Token inválido o expirado",
      error: err.message,
    });
  }
};

export default verifyToken;
