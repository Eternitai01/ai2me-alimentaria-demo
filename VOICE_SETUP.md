# Piero Pini Voice Setup 🎤

## Multilingual Voice Assistant (Italian, English, Spanish, Chinese)

Piero Pini speaks 4 languages fluently, with authentic Italian warmth in every interaction.

---

## Language Support

### 🇮🇹 Italian (Italiano)
- **Personality:** Warm, passionate Italian expert
- **Sample phrases:**
  - "Ciao! Sono Piero Pini, il maestro del prosciutto."
  - "Bellissimo! Questo taglio è perfetto per te."
  - "Fantastico! Ti consiglio il nostro Prosciutto di Parma..."

### 🇬🇧 English
- **Personality:** Italian expert speaking English, professional but warm
- **Sample phrases:**
  - "Hello! I'm Piero Pini, The Ham Master."
  - "Perfetto! Based on your needs, I recommend..."
  - "Fantastico! This cut is perfect for you."

### 🇪🇸 Spanish (Español)
- **Personality:** Italian expert for Barcelona/Spanish market
- **Sample phrases:**
  - "¡Hola! Soy Piero Pini, el maestro del jamón."
  - "¡Perfecto! Según tus necesidades, recomiendo..."
  - "¡Fantástico! Este corte es perfecto para ti."

### 🇨🇳 Chinese (中文)
- **Personality:** Italian expert for Chinese importers
- **Sample phrases:**
  - "你好！我是Piero Pini，火腿大师。"
  - "完美！根据您的需求，我推荐..."
  - "太好了！这个部位非常适合您。"

---

## Voice Technology

**Provider:** ElevenLabs (via Vapi)
**Voice:** Professional male voice with warm, confident tone
**Model:** Multilingual V2 (supports all 4 languages)

**Settings:**
- Stability: 0.7 (consistent but expressive)
- Similarity Boost: 0.8 (authentic pronunciation)
- Style: 0.3 (moderate expressiveness)
- Speaker Boost: Enabled (clear audio quality)

---

## How to Use in Demo

### 1. Enable Voice
Click the microphone icon in the top-right header.

### 2. Select Language
Click the language dropdown (globe icon) and choose:
- 🇮🇹 Italiano
- 🇬🇧 English
- 🇪🇸 Español
- 🇨🇳 中文

### 3. Talk to Franco
- Franco greets you in the selected language
- Ask questions naturally: "What cuts do you recommend for restaurants?"
- Franco responds with expert recommendations
- He uses Italian expressions naturally ("Perfetto!", "Bellissimo!")

### 4. Switch Languages
- Change language mid-conversation (call restarts)
- Perfect for demonstrating multilingual capability at Alimentaria

---

## Alimentaria Demo Script

### Scenario 1: Italian Restaurant Buyer
**Language:** Italian
**Visitor:** "Cerco prosciutto per il mio ristorante"
**Franco:** "Bellissimo! Quanti coperti hai? Ti consiglio il nostro Prosciutto di Parma..."

### Scenario 2: Chinese Importer
**Language:** Chinese
**Visitor:** "我需要20吨猪肉"
**Franco:** "完美！我们有最低的欧盟对中国关税..."

### Scenario 3: Spanish Distributor (Alimentaria!)
**Language:** Spanish
**Visitor:** "Busco jamón italiano para distribución en España"
**Franco:** "¡Perfecto! Nuestro Prosciutto di Parma es ideal para el mercado español..."

---

## Technical Details

### Vapi Configuration
- **Public Key:** 28535a4b-015a-45b0-8d85-a6141da56ed0
- **Model:** GPT-4 (for conversational intelligence)
- **Voice Provider:** ElevenLabs
- **Voice ID:** TxGEqnHWrfWFTfGW9XjX

### System Prompts
Each language has a custom system prompt defining:
- Franco's personality
- Language-specific expressions
- Company context (Ferrarini vs Litera Meat)
- Product expertise

See `src/config/franco-voices.ts` for full prompts.

---

## Business Value

### Why Multilingual Matters at Alimentaria:

1. **International Audience**
   - Buyers from 150+ countries
   - Spanish (local), English (business), Italian (heritage), Chinese (growth market)

2. **Instant Credibility**
   - Italian buyer hears authentic Italian → instant trust
   - Chinese importer hears Mandarin → "they understand my market"

3. **Competitive Advantage**
   - Most exhibitors: English-only sales team
   - AI2me: Fluent in 4 languages, 24/7

4. **ROI Pitch**
   - "Hire one Franco → speak 4 languages"
   - No travel, no schedules, always available

---

## Future Enhancements

### Phase 2 (post-Alimentaria):
- Add French, German, Portuguese
- Custom voices per language (Italian native speaker for Italian, etc.)
- Voice cloning (clone your actual sales director's voice)
- Emotion detection (detect frustration → escalate to human)

### Phase 3:
- Real-time translation (speak Spanish, Franco replies in Chinese)
- WhatsApp voice messages
- Phone integration (call Franco directly)

---

## Troubleshooting

**Voice not working?**
- Check microphone permissions in browser
- Ensure stable internet connection
- Try refreshing the page

**Franco speaks wrong language?**
- Verify language selector shows correct flag
- Language changes require call restart (automatic)

**Audio quality issues?**
- Close other apps using microphone
- Use headphones for clearer audio
- Check browser console for errors

---

Built for Alimentaria 2026 by AI2me
Contact: cc@eternitaigroup.com | +34 673 572 343
