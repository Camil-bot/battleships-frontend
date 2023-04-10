import axios from "axios";

// instance setup
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// interceptors
// request interceptor to send the token as a bearer token in the Authorization header
instance.interceptors.request.use(async config => {
  const token = localStorage.getItem("authToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Content-Type"] = "application/json";
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/auth/login";
      return;
    }
    return error.response;
  }
);

export async function getAllGames() {
  return await instance.get(`/game`);
}

export async function postLogin(email, password) {
  return await instance.post(`/auth/login`, {
    email: email,
    password: password
  });
}

export async function postRegister(email, password) {
  return await instance.post(`/auth/register`, {
    email: email,
    password: password
  });
}

export async function getGameDetails(gameID) {
  return await instance.get(`/game/${gameID}`);
}

export async function postCreateGame() {
  return await instance.post(`/game`);
}

export async function postGameStrike(currentGame, strike) {
  return await instance.post(`/game/strike/${currentGame}`, strike);
}

export async function postJoinGame(gameID) {
  return await instance.post(`/game/join/${gameID}`);
}

export async function sendMap(currentGame, map) {
  return await instance.patch(`/game/${currentGame}`, { ships: map });
}
