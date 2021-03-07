import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';

const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/geographique', routes.geographique);
app.use('/catalogue', routes.catalogue);
app.use('/login', routes.login);
app.use('/cluster', routes.cluster);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
