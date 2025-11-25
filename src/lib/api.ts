export async function getPosts() {
  const allPosts = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(`https://cms.tpgd.jp/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed`);
    if (!res.ok) break;

    const posts = await res.json();
    totalPages = parseInt(res.headers.get('X-WP-TotalPages')) || 1;
    allPosts.push(...posts);
    page++;
  } while (page <= totalPages);

  return allPosts;
}