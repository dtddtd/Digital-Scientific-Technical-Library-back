import jwt from "jsonwebtoken";

const SECRET_KEY = "12jkj3hk1sfgsdf34";

export const generateAccessToken = (id: string, email: string) => {
  const payload = {
    userId: id,
    email: email,
  };

  return jwt.sign(payload, SECRET_KEY);
};

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode);
}
