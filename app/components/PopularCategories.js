'use client';

// Liste des catégories populaires
const categories = [
  'Asian', 'India', 'Blonde', 'Redhead', 'Big Ass', 'Korea', '18 Years Old', 
  'Milf', 'Trans', 'Pornstar', 'Japan', 'Lesbian', 'Cuckold', 'Petite Skinny', 
  'Anal', 'Teen', 'Asmr', 'Femdom', 'Streamer', 'Cosplay', 'Squirting', 
  'Latina', 'Tattooed Girl', 'Brunette', 'Blowjob', 'Ukraine', 'Joi', 
  'Fitness', 'Big Tits', 'Russia', 'Femboy', 'Bdsm'
];

export default function PopularCategories() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Categories</h2>
            <p className="text-lg text-gray-600">
              Browse our most searched categories to find exactly what you're looking for
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <a 
                key={index}
                href={`/best/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
              >
                {category}
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="/categories" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
            >
              View All Categories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
