import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const servicesDirectory = path.join(process.cwd(), 'src/data/services')

export function getSortedServicesData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(servicesDirectory)
  const allData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(servicesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allData.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    } else {
      return -1
    }
  })
}

export function getRelatedServices(current_id) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(servicesDirectory)
  const allData = [];

  fileNames.filter((fileName) => fileName.includes('.md')).map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(servicesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Exclude current id from result

    if ( id != current_id ) {
      // Combine the data with the id
      allData.push({
        id,
        ...matterResult.data
      });
    }
  })

  // Sort posts by date
  return allData.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllServicesIds() {
  const fileNames = fs.readdirSync(servicesDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
}

export async function getServiceData(id) {
  const fullPath = path.join(servicesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Normalize HTML strings in data to prevent hydration errors
  const normalizeString = (str) => {
    if (typeof str !== 'string') return str;
    // Normalize whitespace: replace multiple spaces/tabs/newlines with single space
    // but preserve HTML structure
    return str
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  };

  const normalizeData = (data) => {
    if (typeof data === 'string') {
      return normalizeString(data);
    }
    if (Array.isArray(data)) {
      return data.map(normalizeData);
    }
    if (data && typeof data === 'object' && data.constructor === Object) {
      const normalized = {};
      for (const key in data) {
        if (key === 'content' || key === 'value') {
          normalized[key] = normalizeString(data[key]);
        } else {
          normalized[key] = normalizeData(data[key]);
        }
      }
      return normalized;
    }
    return data;
  };

  const normalizedData = normalizeData(matterResult.data);

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...normalizedData
  }
}