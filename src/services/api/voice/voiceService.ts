import { SupportedLanguage } from '@/types';

export interface VoiceQueryResponse {
  recognizedText: string;
  responseText: string;
  suggestedActionUrl?: string;
  audioDurationSeconds: number;
}

export const mockVoiceKnowledgeBase: Record<string, Record<string, string>> = {
  rain: {
    en: 'Light to moderate rain is expected tomorrow afternoon in Thanjavur (around 12.5 mm). It is advisable to pause foliar pesticide spraying and fertilizer broadcasting until Wednesday.',
    ta: 'தஞ்சாவூரில் நாளை மதியம் லேசானது முதல் மிதமான மழை (12.5 மி.மீ) எதிர்பார்க்கப்படுகிறது. பூச்சிக்கொல்லி மற்றும் உரமிடுவதை புதன்கிழமை வரை தள்ளிப்போட பரிந்துரைக்கப்படுகிறது.',
    hi: 'कल दोपहर तंजावुर में हल्की से मध्यम बारिश (लगभग 12.5 मिमी) होने की संभावना है। कीटनाशक छिड़काव और यूरिया डालने का कार्य दो दिन के लिए स्थगित रखें।',
    te: 'రేపు మధ్యాహ్నం మోస్తరు వర్షం కురిసే అవకాశం ఉంది. ఎరువులు లేదా పురుగుమందుల పిచికారీని రెండు రోజులు వాయిదా వేయడం మంచిది.',
    kn: 'ನಾಳೆ ಮಧ್ಯಾಹ್ನ ಸಾಧಾರಣ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ. ರಸಗೊಬ್ಬರ ಮತ್ತು ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆಯನ್ನು ಮುಂದೂಡುವುದು ಉತ್ತಮ.',
    ml: 'നാളെ ഉച്ചയ്ക്ക് മിതമായ മഴയ്ക്ക് സാധ്യതയുണ്ട്. കീടനാശിനി പ്രയോഗവും വളപ്രയോഗവും രണ്ടു ദിവസത്തേക്ക് മാറ്റിവെക്കുക.',
  },
  fertilizer: {
    en: 'For Samba Ponni paddy, apply the 2nd split of Neem-coated Urea (25 kg/acre) along with MOP (15 kg/acre) at the panicle initiation stage. Keep standing water low during application.',
    ta: 'சம்பா பொன்னி நெல்லுக்கு, கதிர் உருவாகும் தருணத்தில் வேப்பம் பூசிய யூரியா (ஏக்கருக்கு 25 கிலோ) மற்றும் பொட்டாஷ் (15 கிலோ) இடவும்.',
    hi: 'सांभा पोन्नी धान में बालियां निकलते समय नीम लेपित यूरिया (25 किग्रा/एकड़) और पोटाश (15 किग्रा/एकड़) की दूसरी खुराक दें।',
    te: 'వరికి అంకురం దశలో వేప పూత పూసిన యూరియా మరియు పొటాష్ రెండో విడతగా వేయండి.',
    kn: 'ಭತ್ತದ ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ ಎಕರೆಗೆ 25 ಕೆಜಿ ಬೇವಿನ ಲೇಪಿತ ಯೂರಿಯಾ ಮತ್ತು 15 ಕೆಜಿ ಪೊಟ್ಯಾಶ್ ಹಾಕಿ.',
    ml: 'നെല്ലിന് കതിരിടുന്ന ഘട്ടത്തിൽ ഏക്കറിന് 25 കിലോ യൂറിയയും 15 കിലോ പൊട്ടാഷും നൽകുക.',
  },
  price: {
    en: 'Today at Thanjavur regulated market: Ponni paddy is trading at ₹2,450/quintal, and Black Gram (VBN 8) is steady at ₹8,500/quintal.',
    ta: 'இன்றைய தஞ்சாவூர் ஒழுங்குமுறை விற்பனைக்கூடத்தில்: பொன்னி நெல் குவிண்டாலுக்கு ₹2,450 ஆகவும், உளுந்து குவிண்டாலுக்கு ₹8,500 ஆகவும் விற்பனையாகிறது.',
    hi: 'आज तंजावुर मंडी में पोन्नी धान का भाव ₹2,450 प्रति क्विंटल तथा उड़द का भाव ₹8,500 प्रति क्विंटल रहा।',
    te: 'ఈరోజు మార్కెట్‌లో పొన్ని వరి క్వింటాలుకు ₹2,450 మరియు మినుములు ₹8,500 పలుకుతున్నాయి.',
    kn: 'ಇಂದಿನ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಭತ್ತ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹2,450 ಮತ್ತು ಉದ್ದು ₹8,500 ಆಗಿದೆ.',
    ml: 'ഇന്നത്തെ വിപണിയിൽ നെല്ല് ക്വിന്റലിന് ₹2,450-ഉം ഉഴുന്ന് ₹8,500-ഉം ആണ് നിരക്ക്.',
  },
  crop: {
    en: 'After Samba paddy harvest, the recommended relay crop is Black Gram (VBN 8) or Sesame (TMV 7). Pulses restore soil nitrogen and require minimal water.',
    ta: 'நெல் அறுவடைக்கு பின் உளுந்து (VBN 8) அல்லது எள் (TMV 7) பயிரிடுவது சிறந்தது. இது மண்ணில் தழைச்சத்தை நிலைநிறுத்தும்.',
    hi: 'धान की कटाई के बाद उड़द (VBN 8) या तिल की बुवाई सबसे उपयुक्त है। दलहन फसलें मिट्टी में नाइट्रोजन बढ़ाती हैं।',
    te: 'వరి కోత తర్వాత మినుములు లేదా నువ్వులు వేయడం ద్వారా నేల సారం పెరుగుతుంది.',
    kn: 'ಭತ್ತದ ಕೊಯ್ಲಿನ ನಂತರ ಉದ್ದು ಅಥವಾ ಎಳ್ಳು ಬೆಳೆಯುವುದು ಮಣ್ಣಿನ ಫಲವತ್ತತೆಗೆ ಉತ್ತಮ.',
    ml: 'നെല്ല് കൊയ്ത്തിന് ശേഷം ഉഴുന്നോ എള്ളോ കൃഷി ചെയ്യുന്നത് മണ്ണിന്റെ ഫലഭൂയിഷ്ഠത വർദ്ധിപ്പിക്കും.',
  },
};

export const voiceService = {
  async processQuery(query: string, lang: SupportedLanguage): Promise<VoiceQueryResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const lower = query.toLowerCase();
    let topic = 'rain';

    if (lower.includes('fertilizer') || lower.includes('urea') || lower.includes('உரம்') || lower.includes('खाद') || lower.includes('ఎరువు')) {
      topic = 'fertilizer';
    } else if (lower.includes('price') || lower.includes('mandi') || lower.includes('rate') || lower.includes('விலை') || lower.includes('भाव') || lower.includes('ధర')) {
      topic = 'price';
    } else if (lower.includes('crop') || lower.includes('suggest') || lower.includes('பயிர்') || lower.includes('फसल') || lower.includes('పంట')) {
      topic = 'crop';
    }

    const responseText = mockVoiceKnowledgeBase[topic][lang] || mockVoiceKnowledgeBase[topic]['en'];

    return {
      recognizedText: query || 'When will it rain and should I fertilize today?',
      responseText,
      audioDurationSeconds: 4,
      suggestedActionUrl: topic === 'crop' ? '/farmer/suggestions' : topic === 'fertilizer' ? '/farmer/fertilizers' : '/farmer/dashboard',
    };
  },
};
