import cors from "cors";

const corsHandler = cors({
    origin: true, // Permite qualquer origem; para maior segurança, especifique as origens permitidas: origin: ['https://meusite.com', 'https://outrosite.com'],
    methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
  });

export default corsHandler