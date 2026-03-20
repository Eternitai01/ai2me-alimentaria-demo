import { useNavigate } from 'react-router-dom';
import { companies } from '../data/companies';

export default function CompanySelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI2me Alimentaria 2026
          </h1>
          <p className="text-xl text-gray-600">
            Conversational AI for Food & Beverage Industry
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Barcelona • March 24-27, 2026
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-100 hover:border-amber-300 transition-all"
            >
              <div className="text-6xl mb-4 text-center">{company.logo}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                {company.name}
              </h2>
              <p className="text-amber-600 font-medium mb-3 text-center">
                {company.tagline}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {company.description}
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/${company.id}/call`)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">📞</span>
                  Talk to Piero
                </button>
                
                <button
                  onClick={() => navigate(`/${company.id}`)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🔍</span>
                  Product Finder
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {company.type === 'retail' ? 'Premium Retail' : 'B2B Wholesale'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
              <img 
                src="/piero-pini.jpg" 
                alt="Piero Pini" 
                className="w-32 h-32 rounded-full object-cover border-4 border-amber-200 shadow-md"
              />
              <div className="text-left flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Piero Pini
                </h3>
                <p className="text-amber-700 font-semibold mb-2">
                  Founder & Owner, Gruppo Pini
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "I built Gruppo Pini into one of Europe's leading meat companies. Now, powered by AI2me, 
                  I'm available 24/7 to help you find the perfect products for your business. 
                  Speak with me in Italian, English, Spanish, or Chinese."
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-amber-600 font-medium text-sm">
                Powered by AI2me • Built for Alimentaria 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
