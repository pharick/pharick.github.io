import pluginRss from "@11ty/eleventy-plugin-rss";

// Post "types" shown as badges on the timeline. Add your own here.
export const POST_TYPES = {
  project: { label: "Project", icon: "🛠" },
  course: { label: "Course", icon: "🎓" },
  book: { label: "Book", icon: "📚" },
  concept: { label: "Concept", icon: "💡" },
  article: { label: "Article", icon: "📝" },
  talk: { label: "Talk", icon: "🎤" },
  milestone: { label: "Milestone", icon: "🏁" },
  note: { label: "Note", icon: "✏️" },
};

export default function (eleventyConfig) {
  // Static assets are copied as-is.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });

  // Global data available in every template.
  eleventyConfig.addGlobalData("postTypes", POST_TYPES);
  eleventyConfig.addGlobalData("buildTime", () => new Date());

  // Posts collection: everything under src/posts, newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  // Posts grouped by year for the timeline: [{ year, posts: [...] }, ...]
  eleventyConfig.addCollection("postsByYear", (api) => {
    const posts = api
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date);
    const groups = new Map();
    for (const post of posts) {
      const year = post.date.getUTCFullYear();
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(post);
    }
    return [...groups.entries()].map(([year, posts]) => ({ year, posts }));
  });

  // List of all tags with their post counts, most used first.
  eleventyConfig.addCollection("tagList", (api) => {
    const counts = new Map();
    for (const post of api.getFilteredByGlob("src/posts/**/*.md")) {
      if (post.data.draft) continue;
      for (const tag of post.data.tags || []) {
        if (tag === "posts") continue;
        counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  });

  // Filters
  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(date)
  );
  eleventyConfig.addFilter("monthYear", (date) =>
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(date)
  );
  eleventyConfig.addFilter("isoDate", (date) => date.toISOString().slice(0, 10));
  eleventyConfig.addFilter("contentTags", (tags) =>
    (tags || []).filter((t) => t !== "posts")
  );
  eleventyConfig.addFilter("typeInfo", (type) => POST_TYPES[type] || POST_TYPES.note);
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("groupByYear", (posts) => {
    const groups = new Map();
    for (const post of [...posts].sort((a, b) => b.date - a.date)) {
      const year = post.date.getUTCFullYear();
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(post);
    }
    return [...groups.entries()].map(([year, posts]) => ({ year, posts }));
  });

  // RSS filters (absoluteUrl, dateToRfc3339, ...) used by src/feed.njk.
  // Note: this plugin also registers Eleventy's HtmlBasePlugin, which prefixes
  // root-relative URLs in the output with pathPrefix. Do not add it again.
  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // GitHub Pages serves project sites under /<repo>/. The deploy workflow
    // sets PATH_PREFIX; locally the site is served from the root.
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
