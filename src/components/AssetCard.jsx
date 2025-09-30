import { Link } from 'react-router-dom'
import { Calendar, User } from 'lucide-react'
import { categories } from '../data/assets'

const AssetCard = ({ asset }) => {
  const category = categories.find(c => c.id === asset.category)

  return (
    <Link
      to={`/asset/${asset.id}`}
      className="card p-6 hover:shadow-lg transition-shadow duration-200 block group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
          {category?.name}
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
      
      <div className="flex flex-wrap gap-1 mb-4">
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
  )
}

export default AssetCard