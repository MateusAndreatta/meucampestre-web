export const PRODUCTION = false;

export const SERVER_ADDRESS = PRODUCTION
  ? 'https://localhost:8080'
  : 'http://localhost:8080';

export const API_ENDPOINT = `${SERVER_ADDRESS}/api/v2`;
