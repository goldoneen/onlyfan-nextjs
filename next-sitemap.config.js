/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.onlyfans-search-finder.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.onlyfans-search-finder.com/sitemap.xml',
    ],
  },
  changefreq: 'daily',
  priority: 1.0,
  exclude: ['/404', '/500'],
  generateIndexSitemap: true,
  sitemapSize: 5000,
  autoLastmod: true,
  transform: async (config, path) => {
    // Page d'accueil
    if (path === '/') {
      return {
        loc: config.siteUrl,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }



    // Autres pages
    return {
      loc: new URL(path, config.siteUrl).href,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    }
  },
}

module.exports = config
