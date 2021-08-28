import { getResourcesUrl, getDataFnc } from "./api.js";


function headerFnc() {
    let rootDiv = document.getElementById("root")
    let headerContainer = document.createElement('header')
    headerContainer.style.cssText = "width: 99%;border: outset 2px lightgrey;margin:0px;padding:5px"
    rootDiv.append(headerContainer)
    headerContainer.innerHTML = "<h2> Rick & Marty API</h2>" 
}
headerFnc()
function sideBarFnc () {
    let rootDiv = document.getElementById("root")
    let asideContainer = document.createElement('aside')
    asideContainer.style.cssText = "float:left; width: 15%; height: 850px;clear: both;border-right: outset 2px grey; margin:0px;padding:20px; border-bottom: outset 2px grey; margin:0px;padding:20px"
    rootDiv.append(asideContainer)
    let listRoot  = document.createElement("ul")
    asideContainer.append(listRoot)

    async function renderEpisodeLinks () {
    const episodeList = await getDataFnc("episodes");
    let episodePage = episodeList.results
    
    episodePage.forEach(async ({id}) => { 
    let listItem = document.createElement("li")
    listItem.style.cssText = "list-style-position: outside; list-style: none; margin-top:20px"
    listRoot.append(listItem)
    
    let episodeTitle = document.createElement("a");
    listItem.append(episodeTitle)
    episodeTitle.textContent = "Episode " + id
    episodeTitle.href = "#"
    episodeTitle.addEventListener('click', async () => {
        let mainContainer = document.getElementById("main-div"); 
        
        if  (mainContainer != null ) { rootDiv.removeChild(mainContainer)}  
       
        let episodeData = await fetch (`https://rickandmortyapi.com/api/episode/${id}`);
        let episodeJson = await episodeData.json()
        let episodeName = episodeJson.name
        let episodeDate = episodeJson.air_date
        let episodeEpisode = episodeJson.episode

        episodeInfoFnc(episodeName,episodeDate,episodeEpisode)
        renderEpisodeChars(id)
        })
    return episodeTitle

    })
    } 
    renderEpisodeLinks()

    let loadButton = document.createElement("button")
    loadButton.textContent="Load episodes"
    loadButton.style.cssText= "margin-left:20px;border-radius:20px;height:40px"
    asideContainer.append(loadButton)
    //loadButton.addEventListener("click", ()=> )
}
sideBarFnc()


async function renderEpisodeChars (id) {
    let episodeData = await fetch (`https://rickandmortyapi.com/api/episode/${id}`);
    let episodeJson = await episodeData.json()
    let charsUrl = episodeJson.characters
    let mainContainer = document.getElementById("main-div")
    let charsContainer = document.createElement("div")
    charsContainer.style.cssText= "gap:40px;display:flex; width:100%; flex-direction: row; margin-right:0px;margin-top:50px; flex-wrap: wrap; flex-grow: 1"
    charsContainer.setAttribute ("id", "chars-container")
    mainContainer.append(charsContainer)

    charsUrl.forEach( async (char) => {
        let episodeCharData = await fetch(char)
        let charsJson = await episodeCharData.json()
        let eachCharDiv = document.createElement("div")
        charsContainer.append(eachCharDiv)
        eachCharDiv.classList.add("charcubes")
        eachCharDiv.style.cssText="display:flex; flex-direction: column; flex-grow:1"

        let charImg = document.createElement("img")
        eachCharDiv.append(charImg)
        charImg.src = charsJson.image
        charImg.style.cssText="width:150px; align-self:center"


        let charName = document.createElement("h3")
        let anchorName = document.createElement("a")
        charName.style.cssText=" align-self:center"
        eachCharDiv.append(charName)
        charName.append(anchorName)
        anchorName.setAttribute("onclick", "return false")

        anchorName.textContent = charsJson.name
        anchorName.href = charsJson.url
        anchorName.addEventListener("click", async () => {
                
                const charData = await fetch(anchorName.href)
                let charJson = await charData.json()

                let charName = charJson.name
                let mainTitle = document.getElementById("main-title")
                mainTitle.textContent=charName     
                
                let charInfo = document.getElementById("char-info")
                let charGender = charJson.gender
                let charSpecies = charJson.species
                
                let charStatus = charJson.status
                let charOrigin = charJson.origin.name
                charInfo.textContent=charSpecies+ " | "+ charStatus +" | "+ charGender +" | "+ charOrigin

                let originButton = document.createElement("button")
                mainContainer.append(originButton)
                originButton.textContent="Go To World"
                originButton.addEventListener("click", async () => {
                    let worldData = await fetch(charJson.origin.url)
                    let worldJson = await worldData.json()

                    let removeThisImg = document.getElementById("char-img")
                    removeThisImg.remove()
                    let removeThisToo = document.getElementById("episodes-container")
                    removeThisToo.remove()
                    originButton.remove()
                    let worldTitle = document.getElementById("main-title")
                    worldTitle.textContent=worldJson.name
                    charInfo.textContent=worldJson.type + " | " + worldJson.dimension

                    // residents list
                    let residentsList = worldJson.residents
                    let resContainer = document.createElement("div")
                        resContainer.style.cssText= "gap:40px;display:flex; width:100%; flex-direction: row; margin-right:0px;margin-top:50px; flex-wrap: wrap; flex-grow: 1"
                    mainContainer.append(resContainer)
                    console.log(residentsList);
                residentsList.forEach( async (char) => {
                    let episodeCharData = await fetch(char)
                    let charsJson = await episodeCharData.json()
                    let eachCharDiv = document.createElement("div")
                    resContainer.append(eachCharDiv)
                    eachCharDiv.classList.add("rescubes")
                    eachCharDiv.style.cssText="display:flex; flex-direction: column; flex-grow:1"

                    let charImg = document.createElement("img")
                    eachCharDiv.append(charImg)
                    charImg.src = charsJson.image
                    charImg.style.cssText="width:150px; align-self:center"


                    let charName = document.createElement("h3")
                    let anchorName = document.createElement("a")
                    charName.style.cssText=" align-self:center"
                    charName.textContent=charsJson.name
                    eachCharDiv.append(charName)
                    charName.append(anchorName)
                    anchorName.setAttribute("onclick", "return false")
                    // do it properly
                })
                })

                let containerToRemove = document.getElementById("chars-container")
                let cubes = document.getElementsByClassName("charcubes")
                containerToRemove.remove(cubes)
                
                let charImg = document.createElement("img")
                let mainDiv =  document.getElementById("main-div")
                mainDiv.prepend(charImg)
                    charImg.src = charJson.image
                    charImg.setAttribute("id", "char-img")
                    charImg.style.cssText="width:150px"

                
                
                let episodeUrl = charJson.episode
                let episodesContainer = document.createElement("div")
                episodesContainer.style.cssText= "margin-top:100px;display:flex; width:100%;gap:100px; flex-direction: row; margin-right:0px; flex-wrap: wrap; justify-content: space-evenly"
                episodesContainer.setAttribute ("id", "episodes-container")
                mainDiv.append(episodesContainer)

                episodeUrl.forEach( async (epi) => {
                    let episodeCharData = await fetch(epi)
                    let epiJson = await episodeCharData.json()
                    let eachEpiDiv = document.createElement("div")
                    episodesContainer.append(eachEpiDiv)
                    eachEpiDiv.classList.add("epicubes")
                    eachEpiDiv.style.cssText="display:flex; flex-direction: column"

                    let epiTitle = document.createElement("h3")
                    epiTitle.style.cssText=" align-self:center; text-decoration: underline; color:blue"
                    eachEpiDiv.append(epiTitle)
                    epiTitle.textContent = epiJson.name              

                    let epiCode = document.createElement("p")
                    epiCode.style.cssText=" align-self:center"
                    eachEpiDiv.append(epiCode)
                    epiCode.textContent = epiJson.episode   

                    epiTitle.addEventListener('click', async () => {
                    let mainContainer = document.getElementById("main-div"); 
                    let rootDiv = document.getElementById("root")
                    if  (mainContainer != null ) { rootDiv.removeChild(mainContainer)} 

                    let episodeName = epiJson.name
                    let episodeDate = epiJson.air_date
                    let episodeEpisode = epiJson.episode
                    let epiId = epiJson.id

                    episodeInfoFnc(episodeName,episodeDate,episodeEpisode)
                    renderEpisodeChars(epiId)
                    })
                })
            }

        )

        let charTypeState = document.createElement("p")
        charTypeState.style.cssText= "margin-top:0px;align-self:center"
        eachCharDiv.append(charTypeState)
        if (charsJson.type.length > 0 ) {
            charTypeState.textContent = charsJson.species + " | " +  charsJson.type +" | " + charsJson.status
        }
        else {charTypeState.textContent = charsJson.species + " | " +charsJson.status}
        
        let lineBreak = document.createElement("br")
        eachCharDiv.append(lineBreak)
    }
    )    

}

function episodeInfoFnc (title, date, code){
    const rootDiv = document.getElementById("root")
    const mainContainer = document.createElement('div')
    mainContainer.style.cssText = " width:60%;position:absolute; left: 30%; margin:20px;padding:10px"
    mainContainer.setAttribute("id", "main-div")
    rootDiv.append(mainContainer)

    let mainTitle = document.createElement("h1")
    mainContainer.append(mainTitle)
    mainTitle.setAttribute("id", "main-title")
    mainTitle.textContent = title

    let episodeDateAndCode = document.createElement("p")
    episodeDateAndCode.textContent = date + " | " + code
    episodeDateAndCode.setAttribute("id", "char-info")
    mainContainer.append(episodeDateAndCode)
    
}

// create origin page fnc
// make load episode button work


