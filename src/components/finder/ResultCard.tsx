import { Check, Wine, Globe, Package } from "lucide-react";

interface ProductResult {
  name: string;
  specs: string;
  price: string;
  features: string[];
  pairings?: string[];
  delivery: string;
  tariffs?: string;
}

interface ResultCardProps {
  product: ProductResult;
  company: 'ferrarini' | 'litera-meat';
}

const ResultCard = ({ product, company }: ResultCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border-2 border-amber-100">
        {/* Product Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              {company === 'ferrarini' ? (
                <Wine className="w-6 h-6 text-amber-700" />
              ) : (
                <Package className="w-6 h-6 text-amber-700" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{product.specs}</p>
        </div>

        {/* Price */}
        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-gray-600">Wholesale Price</span>
            <span className="text-2xl font-bold text-amber-700">{product.price}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
            Key Features
          </h4>
          <ul className="space-y-2">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pairings (Ferrarini only) */}
        {product.pairings && product.pairings.length > 0 && (
          <div className="mb-6 bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Wine className="w-4 h-4 text-purple-700" />
              <h4 className="text-sm font-semibold text-purple-900 uppercase tracking-wider">
                Sommelier Pairings
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.pairings.map((pairing, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white rounded-full text-xs font-medium text-purple-700 border border-purple-200"
                >
                  {pairing}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tariffs (Litera only) */}
        {product.tariffs && (
          <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-700" />
              <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider">
                Tariff Advantage
              </h4>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">{product.tariffs}</p>
          </div>
        )}

        {/* Delivery */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Delivery Time</span>
            <span className="font-semibold text-gray-900">{product.delivery}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
