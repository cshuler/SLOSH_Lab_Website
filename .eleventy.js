function normalizePrefix(prefix) {
  if (!prefix) {
    return "/";
  }

  let result = prefix.trim();

  if (!result.startsWith("/")) {
    result = `/${result}`;
  }

  if (!result.endsWith("/")) {
    result = `${result}/`;
  }

  return result;
}

function resolvePathPrefix() {
  // Allows manual override when needed.
  if (process.env.ELEVENTY_PATH_PREFIX) {
    return normalizePrefix(process.env.ELEVENTY_PATH_PREFIX);
  }

  const repo = process.env.GITHUB_REPOSITORY || "";
  const repoName = repo.split("/")[1] || "";

  // For project pages, assets live under /<repo-name>/.
  if (repoName && !repoName.endsWith(".github.io")) {
    return normalizePrefix(repoName);
  }

  // For user/organization pages or local development.
  return "/";
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");

  return {
    pathPrefix: resolvePathPrefix(),
  };
};
