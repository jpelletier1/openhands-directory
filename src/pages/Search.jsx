import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search as SearchIcon, ArrowLeft } from 'lucide-react'
import AssetCard from '../components/AssetCard'
import assetService from '../services/assetService'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true)
      
      if (!query.trim()) {
        setSearchResults([])
        setIsLoading(false)
        return
      }

      try {
        const results = await assetService.searchAssets(query)
        setSearchResults(results)
      } catch (error) {
        console.error('Error searching assets:', error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    // Simulate search delay for better UX
    const timeoutId = setTimeout(performSearch, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="flex items-center space-x-3 mb-4">
          <SearchIcon className="w-6 h-6 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Search Results
          </h1>
        </div>
        
        {query && (
          <p className="text-gray-600 dark:text-gray-400">
            {isLoading ? (
              'Searching...'
            ) : (
              <>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
              </>
            )}
          </p>
        )}
      </div>

      {/* Search Results */}
      {!query.trim() ? (
        <div className="text-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No search query
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enter a search term to find assets in the directory
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
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
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search terms or browse by category
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/category/mcp"
              className="btn-secondary"
            >
              Browse MCP Servers
            </Link>
            <Link
              to="/category/microagents"
              className="btn-secondary"
            >
              Browse Microagents
            </Link>
            <Link
              to="/category/scripts"
              className="btn-secondary"
            >
              Browse Scripts
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search