# Song Search App

The Song Search app allows users to search for songs based on various criteria such as the year, artist, and title. The app loads data from a JSON file and provides a user-friendly interface to filter and display the desired songs.

## Global Variables

- `songs`: An array to store all the songs data.

## Input Elements

The app retrieves and interacts with the following input elements:

- `startYear`: The start year select element.
- `endYear`: The end year select element.
- `searchInput`: The input element to search for an artist.
- `titleInput`: The input element to search for a song title.
- `sortByTitle`: The select element to sort songs by title.
- `songsAmount`: The select element to limit the number of displayed songs.

## Loading Data

The app fetches data from a JSON file called "songs.json" using the `fetch()` function. The retrieved data is stored in the `songs` array. After loading the data, the app calls the `selectAllYears()` function to populate the start year and end year select elements and the `printSongsTable()` function to display all songs initially.

## Selecting All Years

The `selectAllYears()` function creates a sorted list of unique years from the `songs` array. It populates the start year and end year select elements with the generated options, ensuring that the lowest and highest years are selected by default.

## Printing Songs Table

The `printSongsTable()` function takes an array of songs as input and dynamically generates an HTML table to display the song data. It clears the existing table contents and inserts new rows for each song using the `insertAdjacentHTML()` method.

## Event Listeners

- The `keyup` event listeners for `searchInput` and `titleInput` sanitize the input by removing any special characters except alphabets and whitespace. The `getSearchedSongs()` function is called to update the displayed songs based on the search criteria.

- The `change` event listeners for `startYear`, `endYear`, `sortByTitle`, and `songsAmount` call the `getSearchedSongs()` function to update the displayed songs based on the selected criteria.

## Searching Songs

The `getSearchedSongs()` function filters the songs based on the selected search criteria. It iterates over each song and checks if it meets the following conditions:
- The song's year is greater than or equal to the start year and less than or equal to the end year.
- The artist name starts with the searched artist name (case-insensitive).
- The song title starts with the searched title (case-insensitive).
- The number of displayed songs does not exceed the selected songs amount.

The filtered songs are then sorted by title using the `sortSongsByName()` function and passed to the `printSongsTable()` function to update the displayed table.

## Sorting Songs by Name

The `sortSongsByName()` function sorts the given songs array based on the selected sorting option. It uses the `sort()` method with a comparison function to sort the songs alphabetically by title in ascending or descending order.

Feel free to use the Song Search app to explore and search for songs based on different criteria. Enjoy discovering new music!
