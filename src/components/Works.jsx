import { useState } from 'react';
import { useSanity } from '../hooks/useSanity';
import { urlFor } from '../lib/sanity';

export default function Works() {
  const { data: portfolioItems } = useSanity(`
    *[_type == "portfolioItem"] {
      _id,
      type,
      title,
      description,
      image {
        asset -> {
          _id,
          url
        }
      },
      url,
      tags,
      date
    }
  `);

  // Separate the items by type
  const projects = portfolioItems?.filter(item => item.type === 'project') || [];
  const trainingCerts = portfolioItems?.filter(item => item.type === 'training') || [];

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}>
      <div className="bg-white bg-opacity-80 py-16">
        {/* Training & Certificates Section */}
        {trainingCerts.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-8">Training & Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {trainingCerts.map(item => (
                <div key={item._id} className="cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    {item.image?.asset && (
                      <img
                        src={urlFor(item.image.asset).width(600).quality(80).url()}
                        alt={`Certificate: ${item.title}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      {item.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(item => (
                <div key={item._id} className="cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    {item.image?.asset && (
                      <img
                        src={urlFor(item.image.asset).width(600).quality(80).url()}
                        alt={`Project: ${item.title}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags?.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Item Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 z-10"
                >
                  ✕
                </button>
                {selectedItem.image?.asset && (
                  <img
                    src={urlFor(selectedItem.image.asset).width(1200).quality(90).url()}
                    alt={`Detailed view of ${selectedItem.title}`}
                    className="w-full h-64 sm:h-96 object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                <p className="whitespace-pre-line mb-4">{selectedItem.description}</p>
                
                {selectedItem.url && (
                  <a 
                    href={selectedItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Project
                  </a>
                )}

                {selectedItem.date && (
                  <p className="text-sm text-gray-500 mt-2">
                    {selectedItem.type === 'training' ? 'Completed' : 'Published'}: {new Date(selectedItem.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
