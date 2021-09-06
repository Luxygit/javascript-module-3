import { getUrl as getCharacter } from "./api.js";

async function createOriginContent(
  origin,
  contentNode,
  createContent,
  createCharacterContent
) {
  const html = `<div>
    <h1>${origin.name}</h1>
    <p>${origin.type} | ${origin.dimension}</p>
  </div>
  `;

  contentNode.innerHTML = html;

  origin.residents.forEach(async (url) => {
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
        createContent,
        createOriginContent
      );
    };

    characterButton.innerHTML = characterHtml;
    contentNode.appendChild(characterButton);
  });
}

export { createOriginContent };