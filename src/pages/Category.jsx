import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { categories } from '../data/assets'
import { ArrowLeft, Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import assetService from '../services/assetService'

const Category = () => {
  const { categoryType } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false
  })
  
  const category = categories.find(c => c.id === categoryType)
  const currentPage = parseInt(searchParams.get('page')) || 1

  useEffect(() => {
    const loadAssets = async () => {
      setLoading(true)
      try {
        const result = await assetService.getAssetsPaginated(categoryType, currentPage, 20)
        setAssets(result.assets)
        setPagination({
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage
        })
      } catch (error) {
        console.error('Error loading category assets:', error)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      loadAssets()
    }
  }, [categoryType, currentPage, category])

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Category Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The category you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link
          to="/"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{category.icon}</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {loading ? '...' : `${pagination.totalCount} ${pagination.totalCount === 1 ? 'Asset' : 'Assets'}`}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Available in this category
            </p>
          </div>
          <Link to="/contribute" className="btn-primary">
            Add New Asset
          </Link>
        </div>
      </div>

      {/* Assets Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="card p-6 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="flex gap-1 mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No assets yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Be the first to contribute a {category.name.toLowerCase()} asset!
          </p>
          <Link to="/contribute" className="btn-primary">
            Add First Asset
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <Link
              key={asset.id}
              to={`/asset/${asset.id}`}
              className="card p-6 hover:shadow-lg transition-shadow duration-200 block group"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                  {asset.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {asset.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {asset.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {asset.tags.length > 2 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{asset.tags.length - 2} more
                  </span>
                )}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{asset.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && assets.length > 0 && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.currentPage <= 3) {
                pageNum = i + 1;
              } else if (pagination.currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = pagination.currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    pageNum === pagination.currentPage
                      ? 'text-primary-600 bg-primary-50 border border-primary-300 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Category