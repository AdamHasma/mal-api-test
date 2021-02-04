const cardContainer = document.querySelector(".card-container");
const apiUrl = "https://api.jikan.moe/v3"
const scoreSelect = document.getElementById("multi-select-3");
const genreSelect = document.getElementById("select-1");
const typeSelect = document.getElementById("select-2");
const contentWrapper = document.querySelector(".content-wrapper");
const btn = document.querySelector(".btn");

// HTML Basic Structure
btn.addEventListener("click", getPosts);
contentWrapper.addEventListener('click', function(e) {
  if (scoreSelect.contains(e.target) || btn.contains(e.target) || typeSelect.contains(e.target) || genreSelect.contains(e.target)) {} else {
    scoreSelect.selectedIndex = "-1";
  }
});

// Fetching Data
async function getPosts() {
  const response = await fetch(`${apiUrl}/search/anime?genre=${genreSelect.value}&type=${typeSelect.value}&score=${scoreSelect.value}&order_by=score&sort=desc&limit=25`);
  getURL();
  const data = await response.json();
  console.log(data);

  let html = '';
  for (let i = 0, len = data.results.length; i < len; i++) {
    let htmlSegment =
      `   <div class="mw-full">
            <div class="card p-0">
              <img src="${data.results[i].image_url}" class="img-fluid rounded-top" alt="...">
              <p class="score font-size-12 text-monospace">Score: ${data.results[i].score}</p>
              <div class="content">
                <h2 class="content-title">
                  ${data.results[i].title}
                </h2>
                <p class="text-muted">
                  ${data.results[i].synopsis}
                </p>
                <div class="text-right">
                  <a href="${data.results[i].url}" target="_blank" class="btn">Go To MAL</a>
                </div>
              </div>
            </div>
          </div>`;

    html += htmlSegment;
  }
  cardContainer.innerHTML += html;
};

function getURL() {
  console.log(`${apiUrl}/search/anime?genre=${genreSelect.value}&type=${typeSelect.value}&score=${scoreSelect.value}&order_by=score&sort=desc`)
}
