import { useState, useEffect, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { francoVapiConfig, francoPrompts } from '@/config/franco-voices';

// Vapi credentials from AI2me account
const VAPI_PUBLIC_KEY = '28535a4b-015a-45b0-8d85-a6141da56ed0';

export function useFrancoVoice(language: string, company: 'ferrarini' | 'litera-meat') {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize Vapi
  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on('call-start', () => {
      console.log('Franco: Call started');
      setIsCallActive(true);
    });

    vapiInstance.on('call-end', () => {
      console.log('Franco: Call ended');
      setIsCallActive(false);
      setIsSpeaking(false);
    });

    vapiInstance.on('speech-start', () => {
      console.log('Franco: Speaking...');
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      console.log('Franco: Stopped speaking');
      setIsSpeaking(false);
    });

    vapiInstance.on('error', (error) => {
      console.error('Franco: Error', error);
    });

    return () => {
      vapiInstance.stop();
    };
  }, []);

  const startCall = useCallback(() => {
    if (!vapi) return;

    // Build system prompt based on company and language
    const companyContext = company === 'ferrarini'
      ? 'You specialize in premium Italian charcuterie - prosciutto, mortadella, salami, bresaola.'
      : 'You specialize in bulk pork export orders - cuts, volumes, logistics, and China market expertise.';

    const systemPrompt = `${francoPrompts[language]}

${companyContext}

Help buyers discover the perfect products through natural conversation. Ask clarifying questions, suggest pairings, and provide expert recommendations.`;

    vapi.start({
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          }
        ],
        temperature: 0.7,
      },
      voice: {
        provider: '11labs' as any,
        voiceId: francoVapiConfig.voiceId,
        stability: francoVapiConfig.stability,
        similarityBoost: francoVapiConfig.similarityBoost,
        style: francoVapiConfig.style,
        useSpeakerBoost: francoVapiConfig.useSpeakerBoost,
      },
      name: `Piero Pini - ${language}`,
      firstMessage: getFrancoGreeting(language, company),
    } as any);
  }, [vapi, language, company]);

  const endCall = useCallback(() => {
    if (vapi) {
      vapi.stop();
    }
  }, [vapi]);

  return {
    startCall,
    endCall,
    isCallActive,
    isSpeaking,
  };
}

function getFrancoGreeting(language: string, company: 'ferrarini' | 'litera-meat'): string {
  const greetings: Record<string, string> = {
    italian: company === 'ferrarini'
      ? 'Ciao! Sono Piero Pini, fondatore del Gruppo Pini. Parliamo di salumi italiani. Come posso aiutarti?'
      : 'Ciao! Sono Piero Pini, fondatore del Gruppo Pini. Parliamo del tuo ordine di carne suina.',
    english: company === 'ferrarini'
      ? 'Hello! I\'m Piero Pini, founder of Gruppo Pini. Let me help you discover our finest Italian charcuterie.'
      : 'Hello! I\'m Piero Pini, founder of Gruppo Pini. Let\'s discuss your pork order.',
    spanish: company === 'ferrarini'
      ? '¡Hola! Soy Piero Pini, fundador de Grupo Pini. Hablemos de embutidos italianos. ¿Cómo puedo ayudarte?'
      : '¡Hola! Soy Piero Pini, fundador de Grupo Pini. Hablemos de tu pedido de cerdo.',
    chinese: company === 'ferrarini'
      ? '你好！我是Piero Pini，Gruppo Pini的创始人。让我帮您发现最好的意大利腌肉。'
      : '你好！我是Piero Pini，Gruppo Pini的创始人。让我们讨论您的猪肉订单。'
  };

  return greetings[language] || greetings.english;
}
