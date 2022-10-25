const sortGames = (gamesArray) => {
  const sortedGames = gamesArray.sort((a, b) => {
    return (
      a.game_title.toLowerCase().charCodeAt(0) -
      b.game_title.toLowerCase().charCodeAt(0)
    );
  });
  return sortedGames;
};

const sortSquads = (squadsArray) => {
  const sortedSquads = squadsArray.sort((a, b) => {
    return new Date(a.eventTime) - new Date(b.eventTime);
  });
  return sortedSquads;
};

export { sortGames, sortSquads };
