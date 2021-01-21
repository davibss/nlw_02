import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());

app.use(routes);

// Corpo (Request Body): Dados para atualização ou criação de um registro
// Route Params: Identificar quais recursos eu quero atualizar ou deletar
// Query Params: Paginação, filtros, ordenação...

app.listen(3333);