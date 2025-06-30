// schemas/portfolioItem.js
export default {
  name: 'portfolioItem',
  title: 'Portfolio Items',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Project', value: 'project' },
          { title: 'Training/Certificate', value: 'training' }
        ],
        layout: 'radio' // Visual radio button toggle
      },
      validation: Rule => Rule.required()
    },
    // Shared Fields
    {
      name: 'title',
      title: 'Title/Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    },
    // Project-specific fields
    {
      name: 'url',
      title: 'URL (Projects only)',
      type: 'url',
      hidden: ({ document }) => document?.type !== 'project'
    },
    {
      name: 'tags',
      title: 'Tags (Projects only)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      hidden: ({ document }) => document?.type !== 'project'
    },
    // Training-specific fields
    {
      name: 'date',
      title: 'Date (Training only)',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD'
      },
      hidden: ({ document }) => document?.type !== 'training'
    }
  ]
}
