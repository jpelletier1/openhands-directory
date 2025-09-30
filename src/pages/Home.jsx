import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/assets'
import { ArrowRight, TrendingUp } from 'lucide-react'
import assetService from '../services/assetService'

const Home = () => {
  const [recentAssets, setRecentAssets] = useState([])
  const [allAssets, setAllAssets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const [recent, all] = await Promise.all([
          assetService.getRecentAssets(6),
          assetService.loadAllAssets()
        ])
        setRecentAssets(recent)
        setAllAssets(all)
      } catch (error) {
        console.error('Error loading assets:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAssets()
  }, [])

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          OpenHands Directory
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover and share MCP configurations, microagents, and automation scripts 
          for the OpenHands ecosystem. Build better AI workflows together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/category/mcp" className="btn-primary">
            Browse MCP Servers
          </Link>
          <Link to="/upload" className="btn-secondary">
            Contribute an Asset
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Browse by Category
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="card p-6 hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count} assets
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {category.description}
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                Explore {category.name}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Assets */}
      <section>
        <div className="flex items-center space-x-2 mb-8">
          <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recently Added
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="flex gap-1">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))
          ) : recentAssets.length > 0 ? (
            recentAssets.map((asset) => (
            <Link
              key={asset.id}
              to={`/asset/${asset.id}`}
              className="card p-6 hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  {categories.find(c => c.id === asset.category)?.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(asset.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                {asset.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                {asset.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {asset.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {asset.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{asset.tags.length - 3} more
                  </span>
                )}
              </div>
            </Link>
          ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No assets available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Growing Community
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {loading ? '...' : allAssets.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total Assets
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {loading ? '...' : new Set(allAssets.map(a => a.author)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Contributors
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                3
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Categories
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home