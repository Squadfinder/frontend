const formatDescription = (description) => {
    return description.split("<p>").join("<Text>").split("</p>").join("</Text>").split("/n").join("");
};

export default formatDescription;