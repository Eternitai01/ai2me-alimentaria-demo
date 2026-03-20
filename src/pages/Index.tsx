import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageCircle, Search, Send, Phone, PhoneOff, X } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

const VAPI_PUBLIC_KEY = "28535a4b-015a-45b0-8d85-a6141da56ed2";
const ASSISTANT_ID = "4917a22c-c1e4-483b-8d57-0ea3640dbded";

const langOptions: { code: Lang; label: string }[] = [
  { code: "es", label: "ESP" },
  { code: "en", label: "ENG" },
  { code: "ru", label: "RUS" },
  { code: "it", label: "ITA" },
  { code: "zh", label: "中文" },
];

const Index = () => {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [showCallForm, setShowCallForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState("");
  const vapiRef = useRef<Vapi | null>(null);
  const ringingAudioRef = useRef<HTMLAudioElement | null>(null);

  const getVapi = useCallback(() => {
    if (!vapiRef.current) {
      const vapi = new Vapi(VAPI_PUBLIC_KEY);
      vapi.on("call-start", () => {
        // Stop ringing when call connects
        if (ringingAudioRef.current) {
          ringingAudioRef.current.pause();
          ringingAudioRef.current.currentTime = 0;
        }
        setCallStatus("Connected");
      });
      vapi.on("call-end", () => { 
        if (ringingAudioRef.current) {
          ringingAudioRef.current.pause();
          ringingAudioRef.current.currentTime = 0;
        }
        setCallActive(false); 
        setCallStatus(""); 
      });
      vapi.on("speech-start", () => setCallStatus("Katy is speaking…"));
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
    if (!trimmedName || !trimmedEmail) { setError(t("callForm.fillBoth")); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) { setError(t("callForm.validEmail")); return; }
    if (trimmedName.length > 100 || trimmedEmail.length > 255) { setError(t("callForm.tooLong")); return; }
    setError("");
    setSubmitted(true);
  };

  const toggleCall = async () => {
    if (!callActive) {
      setCallActive(true);
      setCallStatus("Ringing…");
      
      // Play ringing sound
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
          },
        });
      } catch (err) {
        console.error("Call failed:", err);
        if (ringingAudioRef.current) {
          ringingAudioRef.current.pause();
          ringingAudioRef.current.currentTime = 0;
        }
        setCallActive(false);
        setCallStatus("Failed to connect");
        setTimeout(() => setCallStatus(""), 3000);
      }
    } else {
      const vapi = getVapi();
      vapi.stop();
      if (ringingAudioRef.current) {
        ringingAudioRef.current.pause();
        ringingAudioRef.current.currentTime = 0;
      }
      setCallActive(false);
      setCallStatus("");
    }
  };

  const cards = [
    { num: "01", titleKey: "card.01.title", descKey: "card.01.desc", icon: Search, action: () => navigate("/finder") },
    { num: "02", titleKey: "card.02.title", descKey: "card.02.desc", icon: Phone, action: () => { setShowCallForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); } },
    { num: "03", titleKey: "card.03.title", descKey: "card.03.desc", icon: Send, action: () => {} },
    { num: "04", titleKey: "card.04.title", descKey: "card.04.desc", icon: MessageCircle, action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 lg:px-16 py-4 border-b border-border h-16">
        <div className="text-2xl font-bold text-foreground">KEENETIC</div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {langOptions.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`transition-colors ${lang === l.code ? "text-foreground font-medium" : "hover:text-foreground cursor-pointer"}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 lg:px-16 pt-20 pb-16 max-w-5xl">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border shadow-sm flex-shrink-0">
            <img src="/katy-avatar.jpg" alt="Katy Port" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
              {t("hero.title.prefix")} <span className="text-foreground">{t("hero.title.name")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-1">{t("hero.subtitle")}</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
          {t("hero.desc")}
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <button
            onClick={() => setShowCallForm(true)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-all ${
              callActive
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            <Phone className="w-4 h-4" /> {t("hero.cta")}
          </button>
        </div>

        {/* Call form */}
        {showCallForm && (
          <div className="mt-8 max-w-md p-6 rounded-lg border border-border bg-card relative animate-in slide-in-from-top-2 fade-in duration-200">
            <button
              onClick={() => { setShowCallForm(false); if (callActive) { getVapi().stop(); setCallActive(false); setCallStatus(""); } }}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <>
                <p className="text-sm font-semibold text-foreground mb-1">{t("callForm.before")}</p>
                <p className="text-sm text-muted-foreground mb-4">{t("callForm.details")}</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder={t("callForm.name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                  <input
                    type="email"
                    placeholder={t("callForm.email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                  {error && <p className="text-xs text-destructive">{error}</p>}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {t("callForm.continue")} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-2 space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("callForm.ready")} {name.trim().split(' ')[0]}?
                </p>
                <button
                  onClick={toggleCall}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-all ${
                    callActive
                      ? "bg-destructive text-destructive-foreground hover:opacity-90"
                      : "bg-[hsl(142,71%,45%)] text-white hover:bg-[hsl(142,71%,40%)]"
                  }`}
                >
                  {callActive ? (
                    <><PhoneOff className="w-4 h-4" /> {t("callForm.end")}</>
                  ) : (
                    <><Phone className="w-4 h-4" /> {t("callForm.talk")}</>
                  )}
                </button>
                {callStatus && (
                  <p className="text-xs text-muted-foreground animate-pulse">{callStatus}</p>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Options */}
      <section className="px-8 lg:px-16 py-20 max-w-5xl">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
          {t("hero.howCanIHelp")}
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-12">
          {t("hero.chooseHow")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <button
              key={card.num}
              onClick={card.action}
              className="group text-left p-8 rounded-lg border-2 border-border hover:border-[hsl(142,71%,45%)] transition-all duration-200 bg-card"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs font-semibold text-muted-foreground tracking-wider">{card.num}</span>
                <card.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t(card.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
