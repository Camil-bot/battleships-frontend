import { useEffect, useState } from "react";
import { CurrentGameContext } from "./CurrentGameContext";
import { getGameDetails } from "../../api/ApiAxios";

const CurrentGameProvider = ({ value, children }) => {
  const [gameStatus, setGameStatus] = useState();
  const [moveArray, setMoveArray] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("currentGame")) {
      const intervalID = setInterval(async () => {
        try {
          const response = await getGameDetails(
            localStorage.getItem("currentGame")
          );

          setGameStatus(response.data);
          setMoveArray(response.data.moves);
        } catch (err) {
          return err;
        }
      }, parseInt(process.env.REACT_APP_REFRESH_TIME));

      return () => {
        clearInterval(intervalID);
      };
    }
  }, []);

  function setMoves(status, moveArr) {
    setGameStatus(status);
    setMoveArray(moveArr);
  }

  return (
    <CurrentGameContext.Provider
      value={{
        gameStatus,
        moveArray,
        setMoves
      }}
    >
      {children}
    </CurrentGameContext.Provider>
  );
};

export default CurrentGameProvider;
