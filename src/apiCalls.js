const searchFetch = (input) => {
  return fetch(
    `https://squadfinder2205be.herokuapp.com/api/v1/search?search=${input}`
  ).then((response) => response.json());
};

const getSingleUser = (userID) => {
  return fetch(
    `https://squadfinder2205be.herokuapp.com/api/v1/users/${userID}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Looks like something went wrong.");
    } else {
      return response.json();
    }
  });
};

const getAllUsers = () => {
  return fetch(`https://squadfinder2205be.herokuapp.com/api/v1/users`).then((response) => {
    if (!response.ok) {
      throw new Error("Looks like something went wrong.");
    } else {
      return response.json();
    }
  });
};

const getUserSquad = (userId) => {
  return fetch(
    `https://quadfinder2205be.herokuapp.com/api/v1/users/${userId}/squads`
  ).then((response) => {
    if(!response.ok) {
      throw new Error("Error");
    } else {
      return response.json();
    }
  });
};

const postSquad = ({
  id,
  game,
  eventTime,
  numberPlayers,
  competitive,
  squadMembers,
}) => {
  return fetch(`https://squadfinder2205be.herokuapp.com/api/v1/squads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: id,
      game: game,
      event_time: eventTime,
      number_players: numberPlayers,
      competitive: competitive,
      squadMembers: squadMembers,
    }),
  }).then((response) => {
    if(!response.ok) {
      throw new Error("Something went wrong.");
    } else {
      return response.json();
    }
  });
};

const postGame = ({ userID, gameID, imageURL, gameTitle }) => {
  return fetch(
    `https://squadfinder2205be.herokuapp.com/api/v1/users/${userID}/games`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
        game_id: gameID,
        image_url: imageURL,
        game_title: gameTitle,
      }),
    }
  ).then((response) => response.json());
};

const deleteGame = (userID, gameID) => {
  return fetch(
    `https://squadfinder2205be.herokuapp.com/api/v1/users/${userID}/games/${gameID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(response => {
    if(!response.ok) {
      throw new Error("Looks like something looked wrong.")
    }
  })
};

const deleteSquad = (userID, squadID) => {
  return fetch(
    `https://squadfinder2205be.herokuapp.com/api/v1/users/${userID}/squads/${squadID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export {
  searchFetch,
  getUserSquad,
  getSingleUser,
  getAllUsers,
  postSquad,
  postGame,
  deleteGame,
  deleteSquad,
};
