import jwt from 'jsonwebtoken';
import {base64Decode} from '../helpers/tools';

export const getSecret = () => {
  return base64Decode(process.env.JWT_SECRET);
};

export const token = (token: string) => {
  const encodedToken = jwt.sign(
    {
      data: {
        accessToken: token,
      },
    },
    getSecret(),
    {expiresIn: '1h'},
  );
  return encodedToken;
};

export const verifyToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, getSecret());
    if (Date.now() >= decodedToken.exp * 1000) {
      return 'expired';
    }
    return decodedToken.data;
  } catch (e) {
    return 'error';
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Mengambil token dari header Authorization

  if (!token) {
    return res
      .status(401)
      .json({status: 'FAILED', message: 'Token is required'}); // Jika token tidak ada
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({status: 'FAILED', message: 'Invalid token'}); // Jika token tidak valid
    }

    req.user = user; // Menyimpan data user ke dalam req
    next(); // Melanjutkan ke middleware atau route selanjutnya
  });
};
