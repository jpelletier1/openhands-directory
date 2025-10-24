import matter from 'gray-matter';

export const testLoad = async () => {
  console.log('Test: Starting test load...');
  
  try {
    const response = await fetch('/examples/skills/web-scraper.yaml');
    console.log('Test: Fetch response status:', response.status, response.ok);
    
    if (!response.ok) {
      console.error('Test: Fetch failed');
      return null;
    }
    
    const text = await response.text();
    console.log('Test: Got text, length:', text.length);
    console.log('Test: First 200 chars:', text.substring(0, 200));
    
    const parsed = matter(text);
    console.log('Test: Parsed data:', parsed.data);
    console.log('Test: Parsed content length:', parsed.content.length);
    
    return parsed;
  } catch (error) {
    console.error('Test: Error:', error);
    return null;
  }
};
