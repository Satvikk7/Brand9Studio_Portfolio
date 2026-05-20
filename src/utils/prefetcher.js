/**
 * HIGH-PERFORMANCE BULK PREFETCHING UTILITY
 * 
 * This utility preloads critical assets (showcase walls, project thumbnails) in the background.
 * It uses a sequential, batch-based queue to ensure that:
 * 1. Initial page load and critical preloader animations are never starved of network bandwidth.
 * 2. High-quality assets (crop-free showcase walls) are pre-cached in memory for instant, lag-free rendering.
 * 3. The main UI thread remains completely smooth, eliminating scroll/swipe stutter.
 * 
 * EASY ROLLBACK: Simply set `ENABLE_PREFETCH = false` to disable all prefetching behavior.
 */

export const ENABLE_PREFETCH = true;

// Active in-memory cache to keep preloaded Image objects alive and prevent garbage collection
const preloadedImagesCache = new Set();

// Default core showcase images (pictures after the hero section that need original quality)
const coreShowcaseImages = [
  '/showcase/1.jpg',
  '/showcase/2.jpg',
  '/showcase/3.jpg',
  '/showcase/4.jpg',
  '/showcase/5.jpg'
];

// Helper function to preload a single image path
const preloadSingleImage = (src) => {
  return new Promise((resolve) => {
    if (!src) return resolve();
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      preloadedImagesCache.add(img); // Save reference to keep in browser cache
      resolve({ src, status: 'success' });
    };
    
    img.onerror = () => {
      // Resolve anyway so we don't block the queue progress on broken paths
      resolve({ src, status: 'error' });
    };
  });
};

/**
 * Prefetches an array of assets in background batches
 * @param {string[]} urls - List of image paths to prefetch
 * @param {number} batchSize - Number of concurrent downloads per batch
 * @param {number} delayBetweenBatches - Pause duration (ms) between successive batches to give the main thread breathing room
 */
export async function prefetchInBatches(urls, batchSize = 2, delayBetweenBatches = 300) {
  if (!ENABLE_PREFETCH) return;

  const uniqueUrls = [...new Set(urls)].filter(Boolean);
  
  // Process the queue in small batches
  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    const currentBatch = uniqueUrls.slice(i, i + batchSize);
    
    // Execute concurrent loads for the current batch
    await Promise.all(currentBatch.map(url => preloadSingleImage(url)));
    
    // Delay slightly before commencing the next batch to preserve network/UI frames
    if (i + batchSize < uniqueUrls.length) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }
}

/**
 * Initializes the global prefetching routine
 * Downloads core showcase walls first, followed by key project mockups
 */
export async function initializeGlobalPrefetch() {
  if (!ENABLE_PREFETCH) return;

  try {
    // 1. Prioritize core showcase images (the pictures immediately after the hero section)
    // We want these in original quality with zero lag on swipe/scroll
    await prefetchInBatches(coreShowcaseImages, 2, 250);

    // 2. Fetch projects.json dynamically in the background to prefetch gallery hero thumbnails
    const response = await fetch('/src/data/projects.json');
    if (!response.ok) return;
    
    const data = await response.json();
    if (!data || !data.projects) return;

    // Extract the hero images of the first 12 projects
    const projectHeroImages = data.projects
      .slice(0, 12)
      .map(p => p.heroImage)
      .filter(img => img && !img.endsWith('.pdf'));

    if (projectHeroImages.length > 0) {
      // Fetch dynamic gallery thumbnails in subsequent background batches
      await prefetchInBatches(projectHeroImages, 3, 400);
    }
  } catch (error) {
    // Fail silently in the background so regular page lifecycle is never interrupted
    console.warn('Background prefetching skipped or deferred:', error);
  }
}
