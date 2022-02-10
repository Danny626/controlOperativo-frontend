require('dotenv').config();
// export const HOST = 'http://localhost:8080/controlOperativo-backend';
// INI despliegue
export const HOST = process.env.HOST;
// FIN despliegue
export const PATH_ROOT = '/controlOperativo';
export const REINTENTOS = 3;
export const TOKEN_AUTH_USERNAME = process.env.TOKEN_AUTH_USERNAME;
export const TOKEN_AUTH_PASSWORD = process.env.TOKEN_AUTH_PASSWORD;
export const TOKEN_NAME = process.env.TOKEN_NAME;
