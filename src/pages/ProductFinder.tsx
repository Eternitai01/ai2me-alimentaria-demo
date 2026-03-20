import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/finder/ProgressBar";
import OptionCard from "@/components/finder/OptionCard";
import ResultCard from "@/components/finder/ResultCard";
import LanguageSelector from "@/components/LanguageSelector";
import { ferrariniSteps, ferrariniResults } from "@/data/ferrariniSteps";
import { literaSteps, literaResults } from "@/data/literaSteps";
import { companies } from "@/data/companies";
import { useFrancoVoice } from "@/hooks/useFrancoVoice";

interface ProductFinderProps {
  company: 'ferrarini' | 'litera-meat';
}

const ProductFinder = ({ company }: ProductFinderProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [language, setLanguage] = useState('english');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  const { startCall, endCall, isCallActive, isSpeaking } = useFrancoVoice(language, company);

  // Load company-specific data
  const companyData = companies.find(c => c.id === company)!;
  const steps = company === 'ferrarini' ? ferrariniSteps : literaSteps;
  const results = company === 'ferrarini' ? ferrariniResults : literaResults;
  
  const TOTAL_STEPS = steps.length + 1;
  const step = steps[currentStep - 1];
  const isResult = currentStep > steps.length;

  const toggleAnswer = useCallback(
    (optionId: string) => {
      if (!step) return;
      setAnswers((prev) => {
        const current = prev[step.id] || [];
        if (step.multiSelect) {
          return {
            ...prev,
            [step.id]: current.includes(optionId)
              ? current.filter((id) => id !== optionId)
              : [...current, optionId],
          };
        }
        return { ...prev, [step.id]: [optionId] };
      });
    },
    [step]
  );

  const canProceed = !isResult && (answers[step?.id]?.length ?? 0) > 0;

  const getProduct = () => {
    if (company === 'ferrarini') {
      const volume = answers[2]?.[0];
      const business = answers[1]?.[0];
      if (volume === 'bulk' || business === 'distributor') return results.bulk;
      if (volume === 'large') return results.premium;
      if (business === 'restaurant') return results.restaurant;
      return results.default;
    } else {
      // Litera Meat logic
      const destination = answers[4]?.[0];
      const volume = answers[2]?.[0];
      const certifications = answers[5] || [];
      
      if (destination === 'china') return results.china;
      if (certifications.includes('halal')) return results.halal;
      if (volume === '50+') return results.bulk;
      const cuts = answers[3] || [];
      if (cuts.includes('loin') && cuts.length === 1) return results.premium;
      return results.default;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Top progress line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-amber-200 z-50">
        <div
          className="h-full bg-amber-600 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-8 lg:px-16 py-6 border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to demos
        </button>
        <div className="flex items-center gap-3">
          <img 
            src="/piero-pini.jpg" 
            alt="Piero Pini" 
            className="w-10 h-10 rounded-full object-cover border-2 border-amber-300"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {companyData.name}
            </h2>
            <p className="text-xs text-gray-500">
              with Piero Pini
              {isSpeaking && <span className="ml-2 text-amber-600 animate-pulse">🗣️ Speaking...</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={(lang) => {
              setLanguage(lang);
              if (isCallActive) endCall();
            }}
            voiceEnabled={voiceEnabled}
            onVoiceToggle={() => {
              if (!voiceEnabled) {
                setVoiceEnabled(true);
                startCall();
              } else {
                setVoiceEnabled(false);
                endCall();
              }
            }}
          />
          <span className="text-xs text-gray-500 font-medium">
            Step {currentStep}/{TOTAL_STEPS}
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[800px] mx-auto px-8 pt-16 pb-36">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {isResult ? (
          <div key="result" className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700 mb-3">
              Piero Pini Recommends
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              {company === 'ferrarini' ? 'Your Perfect Selection' : 'Your Ideal Order'}
            </h2>
            <p className="text-gray-600 mb-8 italic">
              "Based on your needs, here's what I suggest..." — Piero Pini
            </p>
            <ResultCard product={getProduct()} company={company} />
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={() => { setCurrentStep(1); setAnswers({}); }}
                className="px-6 py-3 rounded-full text-sm font-semibold border-2 border-amber-300 text-gray-700 hover:bg-amber-50 transition-all"
              >
                Start Again
              </button>
              <button
                onClick={() => alert('Demo: Contact sales → cc@eternitaigroup.com')}
                className="px-6 py-3 rounded-full text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-all shadow-lg"
              >
                Request Quote
              </button>
            </div>
          </div>
        ) : (
          <div key={step.id} className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700 mb-3">
              Question {step.id} of {steps.length}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-2">
              {step.question}
            </h2>
            {step.multiSelect && (
              <p className="text-sm text-gray-600 mb-8">Select all that apply</p>
            )}
            <div
              className={`grid gap-4 mt-8 ${
                step.options.length === 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {step.options.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  description={opt.description}
                  icon={opt.icon}
                  selected={answers[step.id]?.includes(opt.id) ?? false}
                  onClick={() => toggleAnswer(opt.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-amber-200 px-8 py-5 shadow-lg">
        <div className="max-w-[800px] mx-auto flex justify-between">
          <button
            onClick={() => {
              if (currentStep === 1) navigate("/");
              else setCurrentStep((s) => s - 1);
            }}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {!isResult && (
            <button
              disabled={!canProceed}
              onClick={() => setCurrentStep((s) => s + 1)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-md ${
                canProceed
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* AI2me branding */}
      <div className="fixed bottom-24 right-8 text-xs text-gray-400">
        Powered by <span className="font-semibold text-amber-600">AI2me</span>
      </div>
    </div>
  );
};

export default ProductFinder;
