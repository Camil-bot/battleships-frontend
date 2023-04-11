import { useState, useEffect } from "react";
import { getGameDetails } from "../api/ApiAxios";

export const useGameStatus = () => {
  const [gameStatus, setGameStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // this is the function that will fetch the game details
  async function fetchGameDetails() {
    try {
      let response = await getGameDetails(localStorage.getItem("currentGame"));
      setGameStatus(response.data);
      setLoading(false);
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    if (localStorage.getItem("currentGame")) {
      fetchGameDetails();

      const intervalID = setInterval(async () => {
        await fetchGameDetails();
      }, parseInt(process.env.REACT_APP_REFRESH_TIME));

      return () => {
        clearInterval(intervalID);
      };
    }
  }, []);
  return {
    gameStatus,
    loading
  };
};
