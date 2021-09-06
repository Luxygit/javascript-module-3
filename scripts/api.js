async function getListOfEpisodes(page) {
  const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
  const json = await getUrl(url);
  return json.results;
}

async function getEpisode(episode) {
  const url = `https://rickandmortyapi.com/api/episode/${episode}`;
  return getUrl(url);
}

async function getUrl(url) {
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export { getListOfEpisodes, getEpisode, getUrl };