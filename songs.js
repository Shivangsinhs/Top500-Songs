// global variable for storing all songs data.
let songs = [];
// get all input elements.
const startYear = document.getElementById("selectYearStart");
const endYear = document.getElementById("selectYearEnd");
const searchInput = document.getElementById("selectArtist");
const titleInput = document.getElementById("selectTitle");
const sortByTitle = document.getElementById("sortByTitle");
const songsAmount = document.getElementById("songsAmount");

// load the json data.
fetch("songs.json")
  .then((response) => response.json())
  .then((data) => {
    songs = data.songs;
    selectAllYears();
    printSongsTable(songs);
  })
  .catch((error) => console.log(error));

function selectAllYears() {
  // create a new year and sort it in ascending order.
  const years = [];
  for (let i = 0; i < songs.length; i++) {
    if (!years.includes(Number(songs[i].year)))
      years.push(Number(songs[i].year));
  }
  years.sort();
  // create the options for start year
  for (let i = 0; i < years.length; i++) {
    let option = document.createElement("option");
    option.value = years[i];
    option.innerHTML = years[i];
    // make the first option selected the lowest year.
    if (i === 0) option.selected = true;
    startYear.appendChild(option);
  }
  // create the options for end year
  for (let i = 0; i < years.length; i++) {
    let option = document.createElement("option");
    option.value = years[i];
    option.innerHTML = years[i];
    // make the last option selected the highest year.
    if (i === years.length - 1) option.selected = true;
    endYear.appendChild(option);
  }
  return;
}

// print the songs in html table
function printSongsTable(data) {
  const songTable = document.getElementById("songTable").children[0];
  songTable.innerHTML = `<tr>
  <th>Rank</th>
  <th>Title</th>
  <th>Artist</th>
  <th>Album</th>
  <th>Year</th>
</tr>`;
  data.forEach((song) => {
    html = `
    <tr>
      <td>${song.rank}</td>
      <td>${song.title}</td>
      <td>${song.artist}</td>
      <td>${song.album}</td>
      <td>${song.year}</td>
    </tr>
    `;
    songTable.insertAdjacentHTML("beforeend", html);
  });
  return;
}

// Event listeners for all search inputs to ignore special characters

searchInput.addEventListener("keyup", (e) => {
  const lastCharacter = e.target.value.slice(-1);
  if (!/^[a-zA-Z\s]+$/.test(lastCharacter)) {
    e.target.value = e.target.value.slice(0, -1);
  }
  getSearchedSongs();
});

titleInput.addEventListener("keyup", (e) => {
  const lastCharacter = e.target.value.slice(-1);
  if (!/^[a-zA-Z\s]+$/.test(lastCharacter)) {
    e.target.value = e.target.value.slice(0, -1);
  }
  getSearchedSongs();
});

// attach event listeners on all input elements
startYear.addEventListener("change", getSearchedSongs);
endYear.addEventListener("change", getSearchedSongs);
sortByTitle.addEventListener("change", getSearchedSongs);
songsAmount.addEventListener("change", getSearchedSongs);

// only select songs that are greater than start year
// and songs that are less than end year
// and songs that have the searched artist name
// and songs that have the searched title.
// and the number of songs the user want to see.
function getSearchedSongs() {
  let currentSongs = [];
  songs.forEach((song, index) => {
    // remove non special characters for searching
    let title = song.title;
    let artist = song.artist;
    title = title.replace(/[^A-Za-z\s]/gi, "").trim();
    artist = artist.replace(/[^A-Za-z\s]/gi, "").trim();
    if (
      song.year >= startYear.value &&
      song.year <= endYear.value &&
      artist.toLowerCase().startsWith(searchInput.value.toLowerCase()) &&
      title.toLowerCase().startsWith(titleInput.value.toLowerCase()) &&
      index < Number(songsAmount.value)
    ) {
      currentSongs.push(song);
    }
  });
  currentSongs = sortSongsByName(currentSongs);
  printSongsTable(currentSongs);
}

// Sort Songs by Name
function sortSongsByName(currentSongs) {
  if (sortByTitle.value == 1) {
    currentSongs.sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );
  } else if (sortByTitle.value == -1) {
    currentSongs.sort((a, b) =>
      a.title < b.title ? 1 : b.title < a.title ? -1 : 0
    );
  } else {
    return currentSongs;
  }
  return currentSongs;
}
