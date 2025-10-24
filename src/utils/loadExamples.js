const categories = {
  'Skills': 'skills',
  'MCP Servers': 'mcp',
  'SDK Examples': 'sdk'
};

export const loadExamples = async () => {
  console.log('Loading examples from JSON...');
  
  try {
    const response = await fetch('/examples-data.json');
    
    if (!response.ok) {
      console.error('Failed to fetch examples-data.json:', response.status);
      return [];
    }
    
    const examples = await response.json();
    console.log('Loaded examples:', examples.length);
    
    return examples;
  } catch (error) {
    console.error('Error loading examples:', error);
    return [];
  }
};

export const getCategorySlug = (category) => {
  return categories[category] || category.toLowerCase().replace(/\s+/g, '-');
};

export const getCategoryFromSlug = (slug) => {
  return Object.keys(categories).find(key => categories[key] === slug) || slug;
};
