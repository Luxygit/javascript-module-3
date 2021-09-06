import { getUrl } from "./api.js";

async function createCharacterContent(
  character,
  contentNode,
  createEpisodeContent,
  createOriginContent
) {
  const html = `<div class="flex-none pl-6">
    <img src="${character.image}" alt="character profile image"/>
    <div>
      <h1>${character.name}</h1>
      <p id="character-info">${character.species} | ${character.status} | ${character.gender} | </p>
    </div>
  </div>`;

  contentNode.innerHTML = html;

  const originButton = document.createElement("button");
  originButton.innerText = character.origin.name;
  originButton.onclick = async () => {
    const origin = await getUrl(character.origin.url);
    createOriginContent(
      origin,
      contentNode,
      createEpisodeContent,
      createCharacterContent
    );
  };

  const info = document.getElementById("character-info");
  info.appendChild(originButton);

  character.episode.forEach(async (episodeUrl) => {
    const response = await getUrl(episodeUrl);
    const { name, episode } = response;
    const episodeHtml = `
      <h3>${name}</h3>
      <p>${episode}</p>
    `;

    const episodeButton = document.createElement("button");
    episodeButton.onclick = async () => {
      createEpisodeContent(
        response,
        contentNode,
        createEpisodeContent,
        createCharacterContent
      );
    };

    episodeButton.innerHTML = episodeHtml;
    contentNode.appendChild(episodeButton);
  });
}

export { createCharacterContent };