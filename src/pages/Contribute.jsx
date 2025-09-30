import { Link } from 'react-router-dom'
import { ArrowLeft, GitPullRequest, Github, FileText, Code, Users } from 'lucide-react'

const Contribute = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <GitPullRequest className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contribute to the Directory
          </h1>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400">
          Help grow the OpenHands community by contributing your MCP configurations, microagents, and automation scripts.
        </p>
      </div>

      {/* How to Contribute */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Github className="w-5 h-5 mr-2" />
          How to Contribute
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-medium">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Fork the Repository</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fork the <a href="https://github.com/jpelletier1/openhands-directory" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">openhands-directory repository</a> on GitHub.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-medium">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Add Your Asset</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Add your asset to the appropriate folder structure in your fork.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-medium">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Create a Pull Request</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Submit a pull request with your changes for review and inclusion in the directory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Folder Structure */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Folder Structure
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Organize your contributions in the following directory structure:
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            <div>📁 assets/</div>
            <div className="ml-4">📁 mcp/</div>
            <div className="ml-8">📄 your-mcp-config.json</div>
            <div className="ml-8">📄 another-mcp-server.json</div>
            <div className="ml-4">📁 microagents/</div>
            <div className="ml-8">📄 your-microagent.py</div>
            <div className="ml-8">📄 another-agent.js</div>
            <div className="ml-4">📁 scripts/</div>
            <div className="ml-8">📄 automation-script.sh</div>
            <div className="ml-8">📄 deployment-script.py</div>
          </div>
        </div>
      </div>

      {/* Asset Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">MCP Servers</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Model Context Protocol server configurations and implementations.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Microagents</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Specialized AI agents for specific tasks and workflows.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scripts</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Automation scripts and utilities for OpenHands workflows.
          </p>
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Contribution Guidelines
        </h2>
        
        <div className="space-y-3 text-gray-600 dark:text-gray-400">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Ensure your code is well-documented and includes usage examples</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Test your configurations and scripts before submitting</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Include a clear description of what your asset does and how to use it</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Follow existing naming conventions and file organization</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Be respectful and constructive in your contributions</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <a
          href="https://github.com/jpelletier1/openhands-directory"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Github className="w-4 h-4" />
          <span>View Repository</span>
        </a>
      </div>
    </div>
  )
}

export default Contribute