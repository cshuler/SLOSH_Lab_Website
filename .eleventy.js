module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");

  return {
    pathPrefix: "/SLOSH_Lab_Website/",
  };
};
