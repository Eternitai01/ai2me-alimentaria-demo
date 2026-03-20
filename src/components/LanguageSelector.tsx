import { useState } from 'react';
import { Globe, Mic, MicOff } from 'lucide-react';
import { francoVoices } from '@/config/franco-voices';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
}

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  voiceEnabled,
  onVoiceToggle
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-amber-200 hover:border-amber-400 transition-colors"
        >
          <Globe className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-gray-700">
            {francoVoices[currentLanguage]?.flag} {francoVoices[currentLanguage]?.language}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-amber-200 py-2 min-w-[180px] z-50">
            {Object.entries(francoVoices).map(([key, voice]) => (
              <button
                key={key}
                onClick={() => {
                  onLanguageChange(key);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-amber-50 transition-colors flex items-center gap-2 ${
                  currentLanguage === key ? 'bg-amber-50 font-semibold' : ''
                }`}
              >
                <span className="text-xl">{voice.flag}</span>
                <span className="text-gray-700">{voice.language}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Voice Toggle */}
      <button
        onClick={onVoiceToggle}
        className={`p-2 rounded-lg border transition-all ${
          voiceEnabled
            ? 'bg-amber-600 border-amber-600 text-white hover:bg-amber-700'
            : 'bg-white border-amber-200 text-gray-600 hover:border-amber-400'
        }`}
        title={voiceEnabled ? 'Voice enabled - Click to disable' : 'Enable voice interaction'}
      >
        {voiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
      </button>
    </div>
  );
}
