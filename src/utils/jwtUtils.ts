import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";


export const createToken = (payload: object, expiresIn: string = "1h"): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};


export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
