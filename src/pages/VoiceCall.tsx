import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, PhoneOff } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { francoVoices } from "@/config/franco-voices";
import { companies } from "@/data/companies";

const VAPI_PUBLIC_KEY = "28535a4b-015a-45b0-8d85-a6141da56ed0";
const ASSISTANT_ID = "18112336-963a-466d-b634-5d8d31753a44"; // Piero Pini assistant

interface VoiceCallProps {
  company: 'ferrarini' | 'litera-meat';
}

const VoiceCall = ({ company }: VoiceCallProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("english");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState("");
  const vapiRef = useRef<Vapi | null>(null);
  const ringingAudioRef = useRef<HTMLAudioElement | null>(null);

  const companyData = companies.find(c => c.id === company)!;

  const getVapi = useCallback(() => {
    if (!vapiRef.current) {
      const vapi = new Vapi(VAPI_PUBLIC_KEY);
      vapi.on("call-start", () => {
        if (ringingAudioRef.current) {
          ringingAudioRef.current.pause();
          ringingAudioRef.current.currentTime = 0;
        }
        setCallStatus("Connected - Piero is speaking...");
      });
      vapi.on("call-end", () => {
        if (ringingAudioRef.current) {
          ringingAudioRef.current.pause();
          ringingAudioRef.current.currentTime = 0;
        }
        setCallActive(false);
        setCallStatus("");
      });
      vapi.on("speech-start", () => setCallStatus("Piero is speaking…"));
      vapi.on("speech-end", () => setCallStatus("Listening…"));
      vapi.on("error", () => {
        if (ringingAudioRef.current) {
          ringingAudioRef.current.pause();
          ringingAudioRef.current.currentTime = 0;
        }
        setCallActive(false);
        setCallStatus("Call ended");
        setTimeout(() => setCallStatus(""), 2000);
      });
      vapiRef.current = vapi;
    }
    return vapiRef.current;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    
    if (!trimmedName || !trimmedEmail) {
      setError("Please fill in both fields");
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email");
      return;
    }
    
    setError("");
    setSubmitted(true);
  };

  const toggleCall = async () => {
    if (!callActive) {
      setCallActive(true);
      setCallStatus("Calling Piero Pini...");
      
      if (!ringingAudioRef.current) {
        ringingAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        ringingAudioRef.current.loop = true;
      }
      ringingAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
      
      const firstName = name.trim().split(' ')[0];
      
      try {
        const vapi = getVapi();
        await vapi.start(ASSISTANT_ID, {
          variableValues: {
            customer_first_name: firstName,
            customer_name: name.trim(),
            customer_email: email.trim(),
            language: language,
            company: company
          },
        });
      } catch (err) {
        console.error("Call failed:", err);
        setCallActive(false);
        setCallStatus("Call failed");
        if (ringingAudioRef.current) {
          ringingAudioRef.current.pause();
        }
      }
    } else {
      const vapi = getVapi();
      vapi.stop();
      setCallActive(false);
      setCallStatus("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <header className="px-8 py-6 border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to demos
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-8 pt-16 pb-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/piero-pini.jpg" 
              alt="Piero Pini" 
              className="w-24 h-24 rounded-full object-cover border-4 border-amber-300 shadow-lg"
            />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900">
                Talk to Piero Pini
              </h1>
              <p className="text-lg text-amber-700 font-semibold mt-1">
                Founder & Owner, {companyData.name}
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            {company === 'ferrarini' 
              ? 'Get expert advice on our premium Italian charcuterie'
              : 'Discuss your bulk pork export needs directly with the founder'}
          </p>
        </div>

        {!submitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Language
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(francoVoices).map(([key, voice]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setLanguage(key)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        language === key
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{voice.flag}</div>
                      <div className="text-xs font-medium text-gray-700">{voice.language}</div>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-600 text-white font-semibold py-4 px-6 rounded-full hover:bg-amber-700 transition-all shadow-lg text-lg"
              >
                Continue to Call
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-100 text-center">
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Ready to talk with</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Piero Pini</h2>
              <p className="text-amber-700">in {francoVoices[language].language}</p>
            </div>

            <button
              onClick={toggleCall}
              className={`w-full py-6 px-8 rounded-full font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${
                callActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {callActive ? (
                <>
                  <PhoneOff className="w-6 h-6" />
                  End Call
                </>
              ) : (
                <>
                  <Phone className="w-6 h-6" />
                  Call Piero Now
                </>
              )}
            </button>

            {callStatus && (
              <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg">
                {callStatus}
              </div>
            )}

            {callActive && (
              <p className="mt-6 text-sm text-gray-500">
                💡 Tip: Speak naturally - Piero understands your questions and will help you find the perfect products.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default VoiceCall;
