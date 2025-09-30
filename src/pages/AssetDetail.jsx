import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { categories } from '../data/assets'
import assetService from '../services/assetService'
import { ArrowLeft, Copy, Check, Share2, Calendar, User, Tag, ExternalLink } from 'lucide-react'

const AssetDetail = () => {
  const { id } = useParams()
  const [asset, setAsset] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [shareUrlCopied, setShareUrlCopied] = useState(false)

  useEffect(() => {
    const loadAsset = async () => {
      try {
        const assetData = await assetService.getAssetById(id)
        setAsset(assetData)
      } catch (error) {
        console.error('Error loading asset:', error)
        setAsset(null)
      } finally {
        setLoading(false)
      }
    }

    loadAsset()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-2/3"></div>
          <div className="space-y-3 mb-8">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!asset) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Asset Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The asset you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }

  const category = categories.find(c => c.id === asset.category)
  const currentUrl = window.location.href

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(asset.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const shareAsset = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setShareUrlCopied(true)
      setTimeout(() => setShareUrlCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={`/category/${asset.category}`}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                {category?.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {asset.status}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {asset.title}
            </h1>
          </div>
        </div>
        
        <button
          onClick={shareAsset}
          className="btn-secondary flex items-center space-x-2"
        >
          {shareUrlCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Description */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Description
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {asset.description}
        </p>
      </div>

      {/* Code Block */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Code
          </h2>
          <button
            onClick={copyCode}
            className="btn-secondary flex items-center space-x-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
        
        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 overflow-x-auto">
          <pre className="text-sm text-gray-300">
            <code className={`language-${asset.category === 'mcp' ? 'json' : 'javascript'}`}>
              {asset.code}
            </code>
          </pre>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Details */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
                <p className="font-medium text-gray-900 dark:text-white">{asset.author}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(asset.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(asset.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {asset.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Usage Instructions
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          {asset.category === 'mcp' && (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                To use this MCP server configuration:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Copy the configuration above</li>
                <li>Add it to your MCP client configuration file</li>
                <li>Restart your MCP client to load the new server</li>
                <li>The server will be available for use in your AI workflows</li>
              </ol>
            </div>
          )}
          
          {asset.category === 'microagents' && (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                To use this microagent:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Copy the code above into your project</li>
                <li>Install any required dependencies</li>
                <li>Import and instantiate the microagent class</li>
                <li>Use the microagent methods in your application</li>
              </ol>
            </div>
          )}
          
          {asset.category === 'scripts' && (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                To use this script:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Copy the script code above</li>
                <li>Save it to a file with appropriate permissions</li>
                <li>Make the script executable: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">chmod +x script.sh</code></li>
                <li>Run the script with any required parameters</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Related Assets */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          More from this Category
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300">
            Explore more {category?.name.toLowerCase()} in our directory
          </p>
          <Link
            to={`/category/${asset.category}`}
            className="btn-primary flex items-center space-x-2"
          >
            <span>Browse {category?.name}</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AssetDetail