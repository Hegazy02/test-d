module.exports = {
  siteUrl: "https://www.darbproductions.com",
  generateRobotsTxt: true,
  sitemapSize: 7000, // Large enough to avoid splitting
  additionalSitemaps: [
    "https://www.darbproductions.com/sitemap.ar.xml",
    "https://www.darbproductions.com/sitemap.en.xml",
  ],
  // Do not split sitemaps, only generate the index
  // No i18n config, so only the index is generated
};
