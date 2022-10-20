const searchFetch = (input) => {
  return fetch(`https://squadfinder2205be.herokuapp.com/api/v1/search?search=${input}`)
    .then(response => response.json())
}

const getSingleUser = (userID) => {
  return fetch(`https://squadfinder2205be.herokuapp.com/api/v1/users/${userID}`)
    .then(response => response.json())
}

export { searchFetch, getSingleUser }