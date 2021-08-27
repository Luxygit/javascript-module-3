import { getResourcesUrl, getDataFnc } from "./api.js";

getDataFnc("episodes")

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
}
sideBarFnc()


async function renderEpisodeChars (id) {
    let episodeData = await fetch (`https://rickandmortyapi.com/api/episode/${id}`);
    let episodeJson = await episodeData.json()
    let charsUrl = episodeJson.characters
    const mainContainer = document.getElementById("main-div")
    const charsContainer = document.createElement("chars-div")
    charsContainer.style.cssText= "display:flex; width:100%; flex-direction: row; margin-right:0px; flex-wrap: wrap; flex-grow: 3"
    mainContainer.append(charsContainer)

    charsUrl.forEach( async (char) => {
        let episodeCharData = await fetch(char)
        let charsJson = await episodeCharData.json()
        let eachCharDiv = document.createElement("div")
        charsContainer.append(eachCharDiv)
        eachCharDiv.style.cssText="display:flex; flex-direction: column; flex-grow:4"

        let charImg = document.createElement("img")
        eachCharDiv.append(charImg)
        charImg.src = charsJson.image
        charImg.style.cssText="width:150px"


        let charName = document.createElement("h3")
        let anchorName = document.createElement("a")
        eachCharDiv.append(charName)
        charName.append(anchorName)

        anchorName.textContent = charsJson.name
        anchorName.href = "#"
        anchorName.addEventListener("onclick", renderChars)

        let charTypeState = document.createElement("p")
        charTypeState.style.cssText= "margin-top:0px"
        eachCharDiv.append(charTypeState)
        if (charsJson.type.length > 0 ) {
            charTypeState.textContent = charsJson.type + " | " + charsJson.status
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
    mainTitle.textContent = title

    let episodeDateAndCode = document.createElement("p")
    episodeDateAndCode.textContent = date + " | " + code
    mainContainer.append(episodeDateAndCode)
    
}

async function renderChars () {


}
//add new fucntion for a new chacter page


