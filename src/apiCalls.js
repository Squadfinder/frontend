const searchFetch = (input) => {
    return fetch(`https://squadfinder2205be.herokuapp.com/api/v1/search?search=${input}`)
    .then(response => response.json())
}

export { searchFetch }