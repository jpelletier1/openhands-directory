/**
 * Asset Service
 * Handles loading assets from the filesystem
 */

const ASSET_CATEGORIES = ['mcp', 'microagents', 'scripts'];

class AssetService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Load all assets from the filesystem
   */
  async loadAllAssets() {
    const cacheKey = 'all_assets';
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }

    try {
      const allAssets = [];
      
      for (const category of ASSET_CATEGORIES) {
        const categoryAssets = await this.loadCategoryAssets(category);
        allAssets.push(...categoryAssets);
      }

      // Sort by creation date (most recent first)
      allAssets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Cache the result
      this.cache.set(cacheKey, {
        data: allAssets,
        timestamp: Date.now()
      });

      return allAssets;
    } catch (error) {
      console.error('Error loading assets:', error);
      return [];
    }
  }

  /**
   * Load assets for a specific category
   */
  async loadCategoryAssets(category) {
    const cacheKey = `category_${category}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }

    try {
      // Get the list of files for this category
      const fileList = await this.getAssetFileList(category);
      const assets = [];

      for (const filename of fileList) {
        try {
          const assetResponse = await fetch(`/assets/${category}/${filename}`);
          if (assetResponse.ok) {
            const assetData = await assetResponse.json();
            assets.push({
              ...assetData,
              id: this.generateAssetId(category, filename),
              filename
            });
          }
        } catch (error) {
          console.warn(`Failed to load asset ${filename}:`, error);
        }
      }

      // Sort by creation date (most recent first)
      assets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Cache the result
      this.cache.set(cacheKey, {
        data: assets,
        timestamp: Date.now()
      });

      return assets;
    } catch (error) {
      console.error(`Error loading ${category} assets:`, error);
      return [];
    }
  }

  /**
   * Get asset by ID
   */
  async getAssetById(id) {
    const allAssets = await this.loadAllAssets();
    return allAssets.find(asset => asset.id === id);
  }

  /**
   * Search assets
   */
  async searchAssets(query) {
    const allAssets = await this.loadAllAssets();
    const searchTerm = query.toLowerCase();

    return allAssets.filter(asset => {
      const titleMatch = asset.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = asset.description.toLowerCase().includes(searchTerm);
      const authorMatch = asset.author.toLowerCase().includes(searchTerm);
      const tagsMatch = asset.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      const categoryMatch = asset.category.toLowerCase().includes(searchTerm);
      
      return titleMatch || descriptionMatch || authorMatch || tagsMatch || categoryMatch;
    });
  }

  /**
   * Get file list for a category (hardcoded for now)
   * In a real implementation, this would read the directory listing
   */
  async getAssetFileList(category) {
    const fileLists = {
      mcp: [
        'github-mcp.json',
        'filesystem-mcp.json',
        'slack-mcp.json',
        'database-mcp.json',
        'test-mcp-5.json',
        'test-mcp-6.json',
        'test-mcp-7.json',
        'test-mcp-8.json',
        'test-mcp-9.json',
        'test-mcp-10.json',
        'test-mcp-11.json',
        'test-mcp-12.json',
        'test-mcp-13.json',
        'test-mcp-14.json',
        'test-mcp-15.json',
        'test-mcp-16.json',
        'test-mcp-17.json',
        'test-mcp-18.json',
        'test-mcp-19.json',
        'test-mcp-20.json',
        'test-mcp-21.json',
        'test-mcp-22.json',
        'test-mcp-23.json',
        'test-mcp-24.json',
        'test-mcp-25.json'
      ],
      microagents: [
        'code-reviewer.py',
        'test-generator.js'
      ],
      scripts: [
        'deploy-openhands.sh',
        'backup-workspace.py'
      ]
    };

    return fileLists[category] || [];
  }

  /**
   * Generate a unique ID for an asset
   */
  generateAssetId(category, filename) {
    return `${category}-${filename.replace(/\.[^/.]+$/, '')}`;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get recent assets (for homepage)
   */
  async getRecentAssets(limit = 6) {
    const allAssets = await this.loadAllAssets();
    return allAssets.slice(0, limit);
  }

  /**
   * Get assets with pagination
   */
  async getAssetsPaginated(category = null, page = 1, limit = 20) {
    let assets;
    
    if (category) {
      assets = await this.loadCategoryAssets(category);
    } else {
      assets = await this.loadAllAssets();
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAssets = assets.slice(startIndex, endIndex);

    return {
      assets: paginatedAssets,
      totalCount: assets.length,
      currentPage: page,
      totalPages: Math.ceil(assets.length / limit),
      hasNextPage: endIndex < assets.length,
      hasPrevPage: page > 1
    };
  }
}

// Create a singleton instance
const assetService = new AssetService();

export default assetService;