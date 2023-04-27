const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const esbuild = require("esbuild");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/js/');
  eleventyConfig.addPassthroughCopy('./src/assets')
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: ["./src/js/index.js"],
      bundle: true,
      outfile: "_site/js/bundle.js",
      sourcemap: true,
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
