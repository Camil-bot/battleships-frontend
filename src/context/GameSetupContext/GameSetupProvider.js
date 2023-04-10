import { useState } from "react";
import { GameSetupContext } from "./GameSetupContext";
import { sendMap } from "../../api/ApiAxios";
import { calculateUsedFields } from "../../utils/utils";

const GameSetupProvider = ({ value, children }) => {
  const [map, setMap] = useState([]);
  const [typeOfShip, setTypeOfShip] = useState({});
  const [usedFields, setUsedFields] = useState([]);
  const [shipsUnavailable, setShipsUnavailable] = useState([]);
  const [shipsCount, setShipsCount] = useState([]);
  const [counter, setCounter] = useState(0);
  const [elementHovered, setElementHovered] = useState(null);

  async function handleSend() {
    try {
      const response = await sendMap(localStorage.getItem("currentGame"), map);
      console.log("well");
      return response;
    } catch (error) {
      console.log("fuck");
      return error;
    }
  }

  function updateMap(ship) {
    if (!ship.size || !ship.direction) return;

    setMap([...map, ship]);
    calculateUsedFields([...map, ship], setUsedFields);
    shipsAvailable([...map, ship]);
  }

  function resetMap() {
    setMap([]);
    calculateUsedFields([], setUsedFields);
    shipsAvailable([]);
  }

  function updateShip(shipDetails) {
    setTypeOfShip(shipDetails);
  }

  function shipsAvailable(map) {
    let shipCount = [0, 0, 0, 0];
    let shipsUnavailableNow = [false, false, false, false];
    console.log(map);
    map.forEach(ship => {
      if (ship.size === 2) {
        console.log("A intrat");
        shipCount[0]++;
        if (shipCount[0] >= 4) {
          shipCount[0]++;

          shipsUnavailableNow[0] = true;
        }
      }
      if (ship.size === 3) {
        shipCount[1]++;
        if (shipCount[1] === 3) {
          shipsUnavailableNow[1] = true;
        }
      }
      if (ship.size === 4) {
        shipCount[2]++;
        if (shipCount[2] === 2) {
          shipsUnavailableNow[2] = true;
        }
      }
      if (ship.size === 6) {
        shipCount[3]++;
        if (shipCount[3] === 1) {
          shipsUnavailableNow[3] = true;
        }
      }
    });

    setShipsUnavailable(shipsUnavailableNow);
  }

  return (
    <GameSetupContext.Provider
      value={{
        map,
        usedFields,
        typeOfShip,
        counter,
        setCounter,
        updateMap,
        resetMap,
        updateShip,
        calculateUsedFields,
        shipsUnavailable,
        shipsCount,
        handleSend,
        elementHovered,
        setElementHovered
      }}
    >
      {children}
    </GameSetupContext.Provider>
  );
};

export default GameSetupProvider;
