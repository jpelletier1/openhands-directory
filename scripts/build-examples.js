import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categories = ['skills', 'mcp', 'sdk'];
const examplesDir = path.join(__dirname, '../public/examples');
const outputFile = path.join(__dirname, '../public/examples-data.json');

const examples = [];

categories.forEach(category => {
  const categoryDir = path.join(examplesDir, category);
  
  if (!fs.existsSync(categoryDir)) {
    console.log(`Directory not found: ${categoryDir}`);
    return;
  }
  
  const files = fs.readdirSync(categoryDir);
  
  files.forEach(file => {
    const filePath = path.join(categoryDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: code } = matter(content);
    
    const fileName = file.replace(/\.(md|yaml|py)$/, '');
    
    examples.push({
      id: fileName,
      title: data.title || fileName,
      author: data.author || 'Anonymous',
      category: data.category || category,
      description: data.description || '',
      code: code.trim(),
      file: file
    });
  });
});

fs.writeFileSync(outputFile, JSON.stringify(examples, null, 2));
console.log(`Generated ${examples.length} examples to ${outputFile}`);
