import { getUrl as getCharacter } from "./api.js";

async function createEpisodeContent(
  content,
  contentNode,
  createCharacterContent,
  createOriginContent
) {
  const html = `<div class="flex-none pl-6"><p class="card bordered">
    <div><h1 class="something">${content.name}</h1></div>
    <div>${content.air_date} | ${content.episode}</div>
  </div>
  </div>`;

  contentNode.innerHTML = html;

  content.characters.forEach(async (url) => {
    const character = await getCharacter(url);
    const characterHtml = `
      <img src="${character.image}" />
      <h2>${character.name}</h2>
      <p>${character.species} | ${character.status}</p>
    `;

    const characterButton = document.createElement("button");
    characterButton.onclick = async () => {
      createCharacterContent(
        character,
        contentNode,
        createEpisodeContent,
        createOriginContent
      );
    };

    characterButton.innerHTML = characterHtml;
    contentNode.appendChild(characterButton);
  });
}

export { createEpisodeContent };