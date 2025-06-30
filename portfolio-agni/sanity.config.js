import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import personalInfo from './schemas/personalInfo'; // Import the personalInfo schema
import project from './schemas/project'; // Import the project schema
import recommendation from './schemas/recommendation'; // Import the recommendation schema

export default defineConfig({
  name: 'default',
  title: 'portfolio-agni',

  projectId: 'plv6g7d8',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [personalInfo, project, recommendation], // Add your schemas here
  },
});
