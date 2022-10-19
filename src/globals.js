export const PRODUCTION = process.env.REACT_APP_PRODUCTION;

export const SERVER_ADDRESS = PRODUCTION
  ? process.env.REACT_APP_SERVER_ADDRESS
  : 'http://localhost:8080';

export const API_ENDPOINT = `${SERVER_ADDRESS}/api/v2`;
