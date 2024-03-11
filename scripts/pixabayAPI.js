const searchForm =document.getElementById("searchForm")
let currentQuery = "Photosession"

window.onload = () => {
    fetchImages(currentQuery)
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  const query = document.getElementById("searchInput").value;

  fetchImages(query);
});

function fetchImages(query) {
const apiKey = "42599168-fa0365c417937f5e9a31e9e84";

fetch(
  `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=50`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous search results

    data.hits.forEach((image) => {
      const img = document.createElement("img");
    //   img.setAttribute('class', 'apiImage')
      img.src = image.webformatURL;
      img.alt = image.tags;
      gallery.appendChild(img);
    });
  })
  .catch((error) => {
    console.error(
      "There was a problem with the fetch operation:",
      error
    );
  });
}