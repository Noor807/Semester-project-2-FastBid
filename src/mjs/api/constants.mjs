export const API_KEY = import.meta.env.VITE_API_KEY;

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUCTION = `${API_BASE}/auction/listings`;

export const API_AUCTION_PROFILE = `${API_BASE}/auction/profiles`;
