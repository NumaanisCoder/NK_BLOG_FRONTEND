const SitemapGenerator = require('sitemap-generator');

// Create a new generator object
const generator = SitemapGenerator('https://nkblogs.ml', {
  maxEntriesPerFile: 50000,
  stripQuerystring: true
});

// Register event listeners
generator.on('done', () => {
  console.log('Sitemap generated');
});

generator.on('error', (error) => {
  console.error('Error generating sitemap', error);
});

// Start the generator
generator.start();
