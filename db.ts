import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o .env (DEBUG)
const envPath = path.resolve(process.cwd(), '.env');
console.log('Tentando carregar .env de:', envPath);
config({ path: envPath });

// DEBUG: Mostra valores carregados
console.log('Variáveis carregadas:', {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PASS: '***' // não mostra a senha real
});

// Verifica se as variáveis de ambiente estão definidas
if (!process.env.DB_NAME) throw new Error('DB_NAME não definido no .env');
if (!process.env.DB_USER) throw new Error('DB_USER não definido no .env');
if (!process.env.DB_PASS) throw new Error('DB_PASS não definido no .env');
if (!process.env.DB_HOST) throw new Error('DB_HOST não definido no .env');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false // desabilita logs de SQL por padrão
  }
);

export default sequelize