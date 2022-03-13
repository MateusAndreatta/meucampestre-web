export const PRODUCTION = false;

export const SERVER_ADDRESS = PRODUCTION
  ? 'https://localhost:3333'
  : 'http://localhost:3333';

export const API_ENDPOINT = `${SERVER_ADDRESS}`;
