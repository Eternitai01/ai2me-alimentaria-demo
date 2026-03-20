import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, PhoneOff, X } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { francoVoices } from "@/config/franco-voices";
import { companies } from "@/data/companies";

const VAPI_PUBLIC_KEY = "28535a4b-015a-45b0-8d85-a6141da56ed0";
const ASSISTANT_ID = "18112336-963a-466d-b634-5d8d31753a44";

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
  const [showCallForm, setShowCallForm] = useState(true);
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-8 lg:px-16 py-4 border-b border-border h-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="text-xl font-bold text-foreground tracking-wider uppercase">
          {companyData.name}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-wider">
          {Object.entries(francoVoices).map(([key, voice]) => (
            <button
              key={key}
              onClick={() => setLanguage(key)}
              className={`transition-colors ${language === key ? "text-foreground font-semibold" : "hover:text-foreground"}`}
            >
              {voice.flag} {voice.language.substring(0, 3).toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 lg:px-16 pt-20 pb-16 max-w-5xl">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border shadow-sm flex-shrink-0">
            <img src="/piero-pini.jpg" alt="Piero Pini" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
              Talk to <span className="text-foreground">Piero Pini</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-1">Founder & Owner, Gruppo Pini</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
          {company === 'ferrarini' 
            ? 'Get expert advice on our premium Italian charcuterie. Piero knows every cut, every pairing, and every certification.'
            : 'Discuss your bulk pork export needs directly with the founder. Piero has built one of Europe\'s largest meat companies.'}
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <button
            onClick={() => !showCallForm && setShowCallForm(true)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-all ${
              callActive
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {callActive ? (
              <>
                <PhoneOff className="w-4 h-4" /> End Call
              </>
            ) : (
              <>
                <Phone className="w-4 h-4" /> Call Piero Now
              </>
            )}
          </button>
        </div>

        {/* Call Form */}
        {showCallForm && (
          <div className="mt-8 max-w-md p-6 rounded-lg border border-border bg-card relative animate-in slide-in-from-top-2 fade-in duration-200">
            <button
              onClick={() => { 
                setShowCallForm(false); 
                if (callActive) { 
                  getVapi().stop(); 
                  setCallActive(false); 
                  setCallStatus(""); 
                } 
              }}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <>
                <p className="text-sm font-semibold text-foreground mb-1">Before we connect you...</p>
                <p className="text-sm text-muted-foreground mb-4">Piero will greet you by name</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                  {error && (
                    <p className="text-xs text-destructive">{error}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready! Click the button above to call Piero in {francoVoices[language].language}
                </p>
                <button
                  onClick={toggleCall}
                  className={`w-full py-3 px-4 rounded-full text-sm font-semibold transition-all ${
                    callActive
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {callActive ? "End Call" : "Call Now"}
                </button>
                {callStatus && (
                  <p className="text-xs text-muted-foreground mt-3 text-center animate-pulse">
                    {callStatus}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default VoiceCall;
