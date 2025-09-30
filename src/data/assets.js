// Sample data for the directory
export const assets = [
  {
    id: 'mcp-filesystem',
    title: 'Filesystem MCP Server',
    description: 'A Model Context Protocol server that provides secure file system access with read/write capabilities.',
    category: 'mcp',
    code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}`,
    author: 'OpenHands Team',
    tags: ['filesystem', 'files', 'read', 'write'],
    status: 'approved',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'mcp-git',
    title: 'Git MCP Server',
    description: 'MCP server for Git operations including commit, push, pull, and repository management.',
    category: 'mcp',
    code: `{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git", "--repository", "/path/to/repo"],
      "env": {
        "GIT_AUTHOR_NAME": "MCP User",
        "GIT_AUTHOR_EMAIL": "mcp@example.com"
      }
    }
  }
}`,
    author: 'Community',
    tags: ['git', 'version-control', 'repository'],
    status: 'approved',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'microagent-code-reviewer',
    title: 'Code Review Microagent',
    description: 'An intelligent microagent that performs automated code reviews, checking for best practices, security issues, and code quality.',
    category: 'microagents',
    code: `import { Microagent } from '@openhands/microagent';

class CodeReviewMicroagent extends Microagent {
  async review(code, language) {
    const issues = [];
    
    // Check for common security patterns
    if (code.includes('eval(') || code.includes('exec(')) {
      issues.push({
        type: 'security',
        message: 'Avoid using eval() or exec() functions',
        severity: 'high'
      });
    }
    
    // Check for code complexity
    const lines = code.split('\\n').length;
    if (lines > 100) {
      issues.push({
        type: 'complexity',
        message: 'Function is too long, consider breaking it down',
        severity: 'medium'
      });
    }
    
    return {
      issues,
      score: this.calculateScore(issues),
      suggestions: this.generateSuggestions(issues)
    };
  }
  
  calculateScore(issues) {
    const weights = { high: 10, medium: 5, low: 1 };
    const penalty = issues.reduce((sum, issue) => sum + weights[issue.severity], 0);
    return Math.max(0, 100 - penalty);
  }
  
  generateSuggestions(issues) {
    return issues.map(issue => ({
      issue: issue.message,
      suggestion: this.getSuggestion(issue.type)
    }));
  }
  
  getSuggestion(type) {
    const suggestions = {
      security: 'Use safer alternatives like JSON.parse() or parameterized queries',
      complexity: 'Extract smaller functions and use composition',
      style: 'Follow the project style guide and use consistent formatting'
    };
    return suggestions[type] || 'Review and improve this code section';
  }
}

export default CodeReviewMicroagent;`,
    author: 'OpenHands Team',
    tags: ['code-review', 'security', 'quality', 'automation'],
    status: 'approved',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z'
  },
  {
    id: 'microagent-test-generator',
    title: 'Test Generator Microagent',
    description: 'Automatically generates unit tests for JavaScript/TypeScript functions with comprehensive coverage.',
    category: 'microagents',
    code: `import { Microagent } from '@openhands/microagent';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

class TestGeneratorMicroagent extends Microagent {
  async generateTests(sourceCode, framework = 'jest') {
    const ast = this.parseCode(sourceCode);
    const functions = this.extractFunctions(ast);
    
    return functions.map(func => this.generateTestForFunction(func, framework));
  }
  
  parseCode(code) {
    return parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx']
    });
  }
  
  extractFunctions(ast) {
    const functions = [];
    
    traverse(ast, {
      FunctionDeclaration(path) {
        functions.push({
          name: path.node.id.name,
          params: path.node.params.map(p => p.name),
          async: path.node.async,
          type: 'function'
        });
      },
      ArrowFunctionExpression(path) {
        if (path.parent.type === 'VariableDeclarator') {
          functions.push({
            name: path.parent.id.name,
            params: path.node.params.map(p => p.name),
            async: path.node.async,
            type: 'arrow'
          });
        }
      }
    });
    
    return functions;
  }
  
  generateTestForFunction(func, framework) {
    const testCases = this.generateTestCases(func);
    
    return \`describe('\${func.name}', () => {
\${testCases.map(testCase => this.generateTestCase(testCase, func, framework)).join('\\n\\n')}
});\`;
  }
  
  generateTestCases(func) {
    return [
      { name: 'should handle valid input', type: 'happy-path' },
      { name: 'should handle edge cases', type: 'edge-case' },
      { name: 'should handle invalid input', type: 'error-case' }
    ];
  }
  
  generateTestCase(testCase, func, framework) {
    const asyncKeyword = func.async ? 'async ' : '';
    const awaitKeyword = func.async ? 'await ' : '';
    
    return \`  it('\${testCase.name}', \${asyncKeyword}() => {
    // Arrange
    const input = /* TODO: Add test input */;
    const expected = /* TODO: Add expected output */;
    
    // Act
    const result = \${awaitKeyword}\${func.name}(input);
    
    // Assert
    expect(result).toBe(expected);
  });\`;
  }
}

export default TestGeneratorMicroagent;`,
    author: 'Community',
    tags: ['testing', 'automation', 'jest', 'unit-tests'],
    status: 'approved',
    createdAt: '2024-02-05T16:45:00Z',
    updatedAt: '2024-02-05T16:45:00Z'
  },
  {
    id: 'script-project-setup',
    title: 'Project Setup Script',
    description: 'Automated script to set up a new OpenHands project with all necessary configurations and dependencies.',
    category: 'scripts',
    code: `#!/bin/bash

# OpenHands Project Setup Script
# This script initializes a new OpenHands project with standard configuration

set -e

PROJECT_NAME=\${1:-"openhands-project"}
TEMPLATE=\${2:-"basic"}

echo "🚀 Setting up OpenHands project: $PROJECT_NAME"

# Create project directory
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Initialize package.json
cat > package.json << EOF
{
  "name": "$PROJECT_NAME",
  "version": "1.0.0",
  "description": "OpenHands project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "@openhands/core": "^1.0.0",
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.0.0"
  }
}
EOF

# Create basic project structure
mkdir -p src tests docs

# Create main entry point
cat > index.js << EOF
const { OpenHands } = require('@openhands/core');

const app = new OpenHands({
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development'
});

app.start().then(() => {
  console.log('🤖 OpenHands project started successfully!');
}).catch(error => {
  console.error('❌ Failed to start:', error);
  process.exit(1);
});
EOF

# Create configuration file
cat > openhands.config.js << EOF
module.exports = {
  agents: {
    enabled: true,
    maxConcurrent: 5
  },
  logging: {
    level: 'info',
    format: 'json'
  },
  security: {
    enableCors: true,
    rateLimiting: true
  }
};
EOF

# Create README
cat > README.md << EOF
# $PROJECT_NAME

An OpenHands project created with the setup script.

## Getting Started

1. Install dependencies:
   \\\`\\\`\\\`bash
   npm install
   \\\`\\\`\\\`

2. Start the development server:
   \\\`\\\`\\\`bash
   npm run dev
   \\\`\\\`\\\`

3. Open your browser and navigate to \\\`http://localhost:3000\\\`

## Project Structure

- \\\`src/\\\` - Source code
- \\\`tests/\\\` - Test files
- \\\`docs/\\\` - Documentation
- \\\`openhands.config.js\\\` - OpenHands configuration

## Scripts

- \\\`npm start\\\` - Start the production server
- \\\`npm run dev\\\` - Start the development server with hot reload
- \\\`npm test\\\` - Run tests
EOF

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Project setup complete!"
echo "📁 Project created in: $(pwd)"
echo "🚀 Run 'cd $PROJECT_NAME && npm run dev' to start developing"`,
    author: 'OpenHands Team',
    tags: ['setup', 'automation', 'bash', 'initialization'],
    status: 'approved',
    createdAt: '2024-01-25T11:20:00Z',
    updatedAt: '2024-01-25T11:20:00Z'
  },
  {
    id: 'script-deployment',
    title: 'Deployment Script',
    description: 'Comprehensive deployment script for OpenHands applications with Docker support and environment management.',
    category: 'scripts',
    code: `#!/bin/bash

# OpenHands Deployment Script
# Handles building, testing, and deploying OpenHands applications

set -e

# Configuration
ENVIRONMENT=\${1:-"staging"}
BUILD_NUMBER=\${BUILD_NUMBER:-$(date +%Y%m%d-%H%M%S)}
DOCKER_REGISTRY=\${DOCKER_REGISTRY:-"registry.openhands.dev"}
APP_NAME=\${APP_NAME:-"openhands-app"}

echo "🚀 Starting deployment for $APP_NAME to $ENVIRONMENT"
echo "📦 Build number: $BUILD_NUMBER"

# Validate environment
validate_environment() {
  case $ENVIRONMENT in
    development|staging|production)
      echo "✅ Valid environment: $ENVIRONMENT"
      ;;
    *)
      echo "❌ Invalid environment: $ENVIRONMENT"
      echo "Valid options: development, staging, production"
      exit 1
      ;;
  esac
}

# Run tests
run_tests() {
  echo "🧪 Running tests..."
  npm test
  echo "✅ Tests passed"
}

# Build Docker image
build_image() {
  echo "🏗️ Building Docker image..."
  
  cat > Dockerfile << EOF
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
EOF

  docker build -t "$DOCKER_REGISTRY/$APP_NAME:$BUILD_NUMBER" .
  docker tag "$DOCKER_REGISTRY/$APP_NAME:$BUILD_NUMBER" "$DOCKER_REGISTRY/$APP_NAME:latest"
  
  echo "✅ Docker image built: $DOCKER_REGISTRY/$APP_NAME:$BUILD_NUMBER"
}

# Push to registry
push_image() {
  echo "📤 Pushing to registry..."
  docker push "$DOCKER_REGISTRY/$APP_NAME:$BUILD_NUMBER"
  docker push "$DOCKER_REGISTRY/$APP_NAME:latest"
  echo "✅ Image pushed to registry"
}

# Deploy to environment
deploy() {
  echo "🚀 Deploying to $ENVIRONMENT..."
  
  # Create deployment configuration
  cat > deploy-$ENVIRONMENT.yml << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $APP_NAME-$ENVIRONMENT
  labels:
    app: $APP_NAME
    environment: $ENVIRONMENT
spec:
  replicas: \${REPLICAS:-2}
  selector:
    matchLabels:
      app: $APP_NAME
      environment: $ENVIRONMENT
  template:
    metadata:
      labels:
        app: $APP_NAME
        environment: $ENVIRONMENT
    spec:
      containers:
      - name: $APP_NAME
        image: $DOCKER_REGISTRY/$APP_NAME:$BUILD_NUMBER
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: $ENVIRONMENT
        - name: BUILD_NUMBER
          value: $BUILD_NUMBER
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: $APP_NAME-$ENVIRONMENT-service
spec:
  selector:
    app: $APP_NAME
    environment: $ENVIRONMENT
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
EOF

  # Apply deployment
  kubectl apply -f deploy-$ENVIRONMENT.yml
  
  # Wait for rollout
  kubectl rollout status deployment/$APP_NAME-$ENVIRONMENT
  
  echo "✅ Deployment complete"
}

# Health check
health_check() {
  echo "🏥 Performing health check..."
  
  SERVICE_URL=$(kubectl get service $APP_NAME-$ENVIRONMENT-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
  
  for i in {1..30}; do
    if curl -f "http://$SERVICE_URL/health" > /dev/null 2>&1; then
      echo "✅ Health check passed"
      return 0
    fi
    echo "⏳ Waiting for service to be ready... ($i/30)"
    sleep 10
  done
  
  echo "❌ Health check failed"
  exit 1
}

# Cleanup old deployments
cleanup() {
  echo "🧹 Cleaning up old images..."
  docker image prune -f
  echo "✅ Cleanup complete"
}

# Main execution
main() {
  validate_environment
  run_tests
  build_image
  push_image
  deploy
  health_check
  cleanup
  
  echo "🎉 Deployment successful!"
  echo "🌐 Application URL: http://$(kubectl get service $APP_NAME-$ENVIRONMENT-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
}

# Run main function
main "$@"`,
    author: 'DevOps Team',
    tags: ['deployment', 'docker', 'kubernetes', 'automation'],
    status: 'approved',
    createdAt: '2024-02-10T13:30:00Z',
    updatedAt: '2024-02-10T13:30:00Z'
  }
];

// Utility functions
export const getAssetsByCategory = (category) => {
  return assets.filter(asset => asset.category === category && asset.status === 'approved');
};

export const getAssetById = (id) => {
  return assets.find(asset => asset.id === id);
};

export const searchAssets = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return assets.filter(asset => 
    asset.status === 'approved' && (
      asset.title.toLowerCase().includes(lowercaseQuery) ||
      asset.description.toLowerCase().includes(lowercaseQuery) ||
      asset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  );
};

export const categories = [
  {
    id: 'mcp',
    name: 'MCP Servers',
    description: 'Model Context Protocol servers for extending AI capabilities',
    icon: '🔌',
    count: getAssetsByCategory('mcp').length
  },
  {
    id: 'microagents',
    name: 'Microagents',
    description: 'Specialized AI agents for specific tasks and workflows',
    icon: '🤖',
    count: getAssetsByCategory('microagents').length
  },
  {
    id: 'scripts',
    name: 'Scripts',
    description: 'Automation scripts and utilities for OpenHands projects',
    icon: '📜',
    count: getAssetsByCategory('scripts').length
  }
];