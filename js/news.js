const API_KEY = "ab2c0c4f704a4b8d926c4bd7428f0625"; // Replace with your API key
const BASE_URL = "https://newsapi.org/v2/everything";

// Add event listener for the fetch button
document.getElementById("fetchButton").addEventListener("click", () => {
  const query = document.getElementById("query").value.trim();
  const newsContainer = document.getElementById("news");

  // Check if the query is empty
  if (!query) {
    newsContainer.innerHTML = `<p class="text-red-400">Please enter a topic to search for news.</p>`;
    return;
  }

  // Display loading message
  newsContainer.innerHTML = `<p>Fetching news...</p>`;

  // Fetch data from News API
  fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.status === "ok" && data.articles) {
        const articles = data.articles.slice(0, 5); // Get top 5 articles
        if (articles.length > 0) {
          // Render news articles
          newsContainer.innerHTML = articles
            .map(
              article => `
              <div class="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <h3 class="text-xl font-semibold mb-2">${article.title}</h3>
                <p class="text-sm text-gray-400 mb-2">${new Date(article.publishedAt).toLocaleDateString()} - ${
                  article.source.name
                }</p>
                <p class="mb-4">${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank" class="text-yellow-400 hover:underline">Read more</a>
              </div>
            `
            )
            .join("");
        } else {
          newsContainer.innerHTML = `<p class="text-yellow-400">No news articles found for '${query}'.</p>`;
        }
      } else {
        throw new Error(data.message || "Unexpected error occurred.");
      }
    })
    .catch(error => {
      newsContainer.innerHTML = `<p class="text-red-400">Error fetching news: ${error.message}</p>`;
      console.error("Error fetching news:", error);
    });
});
