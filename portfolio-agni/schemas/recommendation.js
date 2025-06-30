export default {
  name: 'recommendation',
  title: 'Recommendation',
  type: 'document',
  fields: [
    {
      name: 'recommenderName',
      title: 'Recommender Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'recommenderTitle',
      title: 'Recommender Title',
      type: 'string'
    },
    {
      name: 'text',
      title: 'Recommendation Text',
      type: 'text',
      validation: Rule => Rule.required()
    }
  ]
}
