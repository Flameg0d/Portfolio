import { useState, useEffect } from 'react';
import { useSanity } from '../hooks/useSanity';

export default function Recommendations() {
  const { data: initialRecommendations, mutate } = useSanity(`
    *[_type == "recommendation"] | order(_createdAt desc) {
      _id,
      recommenderName,
      recommenderTitle,
      text,
      _createdAt
    }
  `);
  
  // State to manage recommendations
  const [recommendations, setRecommendations] = useState(initialRecommendations || []);
  
  const [formData, setFormData] = useState({
    recommenderName: '',
    text: '',
    recommenderTitle: ''
  });
  
  const [errors, setErrors] = useState({
    recommenderName: '',
    text: '',
    submit: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update recommendations when initialRecommendations changes
  useEffect(() => {
    if (initialRecommendations) {
      setRecommendations(initialRecommendations);
    }
  }, [initialRecommendations]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { recommenderName: '', text: '', submit: '' };

    if (!formData.recommenderName.trim()) {
      newErrors.recommenderName = 'Name is required';
      isValid = false;
    }

    if (!formData.text.trim()) {
      newErrors.text = 'Recommendation text is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors(prev => ({...prev, submit: ''}));

    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.REACT_APP_SANITY_DATASET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_SANITY_TOKEN}`
          },
          body: JSON.stringify({
            mutations: [{
              create: {
                _type: 'recommendation',
                recommenderName: formData.recommenderName,
                recommenderTitle: formData.recommenderTitle,
                text: formData.text
              }
            }]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Sanity API Error:', errorData);
        throw new Error(errorData.message || 'Submission failed');
      }

      // Create a new recommendation object
      const newRecommendation = {
        _id: Date.now().toString(), // Temporary ID until fetched from Sanity
        recommenderName: formData.recommenderName,
        recommenderTitle: formData.recommenderTitle,
        text: formData.text,
        _createdAt: new Date().toISOString() // Set current date
      };

      // Update recommendations state
      setRecommendations(prev => [newRecommendation, ...prev]);

      // Clear form data
      setFormData({ recommenderName: '', text: '', recommenderTitle: '' });
      
    } catch (error) {
      console.error('Submission failed:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message.includes('session') 
          ? 'Authentication failed - check your API token'
          : 'Failed to submit. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="my-16" id="recommendations">
      <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
      
      {/* Testimonials List */}
      <div className="grid gap-6 mb-12">
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <div key={rec._id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <blockquote className="italic mb-4 text-gray-700">
                "{rec.text}"
              </blockquote>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{rec.recommenderName}</div>
                  {rec.recommenderTitle && <div className="text-sm text-gray-600">{rec.recommenderTitle}</div>}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(rec._createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recommendations yet. Be the first!</p>
        )}
      </div>
      
      {/* Recommendation Form */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Add Your Recommendation</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.recommenderName}
              onChange={(e) => setFormData({...formData, recommenderName: e.target.value})}
              className={`w-full p-2 border rounded ${errors.recommenderName ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.recommenderName && <p className="text-red-500 text-sm mt-1">{errors.recommenderName}</p>}
          </div>
          
          <div>
            <label className="block mb-1 font-medium">
              Your Title (optional)
            </label>
            <input
              value={formData.recommenderTitle}
              onChange={(e) => setFormData({...formData, recommenderTitle: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">
              Your Recommendation <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({...formData, text: e.target.value})}
              className={`w-full p-2 border rounded ${errors.text ? 'border-red-500' : 'border-gray-300'}`}
              rows="4"
              disabled={isSubmitting}
            />
            {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text}</p>}
          </div>
          
          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Recommendation'}
          </button>
        </form>
      </div>
    </section>
  );
}
