import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Upload as UploadIcon, AlertCircle, CheckCircle } from 'lucide-react'
import { categories } from '../data/assets'

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    code: '',
    tags: '',
    author: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.code.trim()) {
      newErrors.code = 'Code is required'
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would send this to your backend
      const assetData = {
        ...formData,
        id: `asset-${Date.now()}`,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      console.log('Asset submitted:', assetData)
      
      // Save to localStorage for demo purposes
      const existingAssets = JSON.parse(localStorage.getItem('pendingAssets') || '[]')
      existingAssets.push(assetData)
      localStorage.setItem('pendingAssets', JSON.stringify(existingAssets))
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting asset:', error)
      setErrors({ submit: 'Failed to submit asset. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Asset Submitted Successfully!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Thank you for contributing to the OpenHands Directory. Your asset has been submitted 
            for review and will be published once approved by our team.
          </p>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Our team will review your submission within 24-48 hours</li>
                <li>• We may reach out if we need any clarifications</li>
                <li>• Once approved, your asset will be live in the directory</li>
                <li>• You'll be credited as the author</li>
              </ul>
            </div>
            <div className="flex space-x-4 justify-center">
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    title: '',
                    description: '',
                    category: '',
                    code: '',
                    tags: '',
                    author: ''
                  })
                }}
                className="btn-secondary"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link
          to="/"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add to Directory
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share your MCP configuration, microagent, or script with the community
          </p>
        </div>
      </div>

      {/* Guidelines */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Submission Guidelines
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Quality</h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Well-documented code</li>
              <li>• Clear descriptions</li>
              <li>• Working examples</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Originality</h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Original work or properly attributed</li>
              <li>• No duplicates</li>
              <li>• Adds value to community</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Compliance</h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Follows OpenHands standards</li>
              <li>• No malicious code</li>
              <li>• Appropriate licensing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Asset Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`input ${errors.title ? 'border-red-500' : ''}`}
                placeholder="e.g., Filesystem MCP Server"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`input ${errors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className={`input ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Describe what your asset does, how it works, and when to use it..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Author */}
          <div className="mt-6">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className={`input ${errors.author ? 'border-red-500' : ''}`}
              placeholder="Your name or organization"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.author}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="mt-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="input"
              placeholder="filesystem, files, read, write (comma-separated)"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add relevant tags separated by commas to help users find your asset
            </p>
          </div>
        </div>

        {/* Code */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Code
          </h2>
          
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Code/Configuration *
            </label>
            <textarea
              id="code"
              name="code"
              rows={20}
              value={formData.code}
              onChange={handleInputChange}
              className={`input font-mono text-sm ${errors.code ? 'border-red-500' : ''}`}
              placeholder={`Paste your ${formData.category === 'mcp' ? 'MCP configuration JSON' : formData.category === 'microagents' ? 'microagent JavaScript/TypeScript code' : 'script code'} here...`}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.code}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Include complete, working code that others can use directly or with minimal modifications
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            * Required fields
          </p>
          
          <div className="flex space-x-4">
            <Link to="/" className="btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <UploadIcon className="w-4 h-4" />
                  <span>Submit for Review</span>
                </>
              )}
            </button>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errors.submit}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}

export default Upload