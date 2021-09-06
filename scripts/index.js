
// Improve the look and feel, play a little bit with tailwind and daisyUI, learn about utility-first CSS framework, feel free to use another CSS framework
// Refactor and improve the code, remove some of the repetition in sidebar.js
// Learn about JavaScript modules
// Finish adding the rest of the logic in the project, make more API calls and render the content related to characters and locations
// https://github.com/carlosgarciamar/javascript-module-3

import { createHeader } from "./header.js";
import { createSidebar } from "./sidebar.js";
import { createEpisodeContent } from "./episodeContent.js";
import { createCharacterContent } from "./characterContent.js";
import { createOriginContent } from "./originContent.js";
import { getEpisode } from "./api.js";

async function init() {
  const root = document.getElementById("root");
  const flexContainerId = "flex-container";
  createHeader(root, "Rick & Morty");
  await createSidebar(root, flexContainerId, linkCallback);
  const flexContainer = document.getElementById(flexContainerId);
  const contentNode = document.createElement("div");
  flexContainer.appendChild(contentNode);

  async function linkCallback(id) {
    const content = await getEpisode(id);
    createEpisodeContent(
      content,
      contentNode,
      createCharacterContent,
      createOriginContent
    );
  }
}

init();