const NEWS_API = import.meta.env.VITE_API_KEY;

export async function fetchNews(pageCards) {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=weather&pageSize=4&page=${pageCards}&apiKey=${NEWS_API}`
  );
  const data = await response.json();
  return [...data.articles] || [];
}
