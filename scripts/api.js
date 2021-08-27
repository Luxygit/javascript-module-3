async function getResourcesUrl (resource) {
    const URL = "https://rickandmortyapi.com/api";
    const response = await fetch(URL);
    const allDataUrl = await response.json();
    const specificDataUrl = allDataUrl[resource];
    
    return specificDataUrl;
}


async function getDataFnc (resource) {
    const URL = await getResourcesUrl(resource);
    const response = await fetch(URL);
    const specificData = await response.json();
    // just for testing
    //console.log(specificData);
    return specificData
}

export { getResourcesUrl, getDataFnc };