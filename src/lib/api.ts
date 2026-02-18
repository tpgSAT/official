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

interface gqlParams {
    query: String;
    variables?: object;
}

export async function wpquery({ query, variables = {} }: gqlParams) {
    const res = await fetch('https://cms.tpgd.jp/graphql', {
        method: "post",
        headers: {
            "Content-Type": "application/json",

        },

        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!res.ok) {
        console.error(res);
        return {};
    }

    const { data } = await res.json();
    return data;
}

export async function getAllPages() {
  const data = await wpquery({
  query: `
  {
    posts(first: 10000) {
      edges {
        node {
          slug
          excerpt
				  title
          date
          categories {
            edges {
              node {
                name
              }
            }
          }
          tags {
            edges {
              node {
                name
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                sizes {
                  name
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
          content
        }
      }
    }
  }
  `});
  console.log(data);
  return data.posts.edges;
}

export async function getPostBySlug(slug) {
  const data = await wpquery({
    query: `
      query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          title
          uri
        }
      }
    `,
    variables: { slug },
  });

  return data.post;
}
