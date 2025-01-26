import * as admin from 'firebase-admin';
import { Request } from 'firebase-functions/https';
import { Response } from 'firebase-functions/v1';

// Middleware de autenticação
const validateJWT = async (req: Request, res: Response<any, Record<string, any>>, next: Function) => {
  try {
    // Obtém o token JWT dos cabeçalhos ou corpo da requisição
        const headers = req.headers
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ error: 'Authorization token is missing.' });
    }

    // Verifica o token com o Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Adiciona os dados do token na requisição
    req['user'] = decodedToken;

    // Chama o próximo middleware ou rota
    next();
    return true
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

export default validateJWT