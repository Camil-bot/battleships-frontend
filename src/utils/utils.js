export function calculateUsedFields(map, setUsedFields) {
  let fields = [];

  map.forEach((ship) => {
    if (ship.direction === "HORIZONTAL") {
      for (let i = 0; i < ship.size; i++) {
        let asciiCharCode = ship.x.charCodeAt(0);
        fields.push(String.fromCharCode(asciiCharCode + i) + ship.y);
      }
    }
    if (ship.direction === "VERTICAL") {
      for (let i = 0; i < ship.size; i++) {
        fields.push(ship.x + (ship.y + i));
      }
    }
  });

  setUsedFields(fields);
}

export function getPlayer(email) {
  let userName = email.match(/^[^@]*/)[0];
  return "@" + userName;
}

export function checkEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}
