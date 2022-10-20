const searchFetch = (input, genre) => {
    return fetch(`https://squadfinder2205be.herokuapp.com/api/v1/search?search=${input}&genres=${genre}`)
    .then(response => response.json())
}

export { searchFetch }