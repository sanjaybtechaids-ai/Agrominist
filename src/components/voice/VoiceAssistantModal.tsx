'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { voiceService, VoiceQueryResponse } from '@/services/api/voice/voiceService';
import { translations } from '@/constants/translations';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  ArrowRight,
  Bot,
  User,
} from 'lucide-react';
import Link from 'next/link';

export const VoiceAssistantModal: React.FC = () => {
  const { voiceModalOpen, setVoiceModalOpen, language } = useAppStore();
  const t = translations[language] || translations.en;

  const [isListening, setIsListening] = useState(false);
  const [typedInput, setTypedInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<{
    userText: string;
    aiResponse: string;
    actionUrl?: string;
  } | null>({
    userText: 'When will it rain and should I spray fertilizer today?',
    aiResponse:
      'Light to moderate rain (12.5mm) is expected tomorrow afternoon across the delta basin. Pause fertilizer broadcasting and foliar sprays until Thursday to prevent nutrient runoff.',
    actionUrl: '/farmer/dashboard',
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Audio playback simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    } else {
      setAudioProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate speech recognition listening for 2.5 seconds
    setTimeout(async () => {
      setIsListening(false);
      setIsProcessing(true);
      const query =
        language === 'ta'
          ? 'மழை எப்போது வரும்? உரம் எப்போது இட வேண்டும்?'
          : language === 'hi'
          ? 'बारिश कब होगी और खाद कब डालें?'
          : 'When will it rain and how much fertilizer should I apply?';
      const result: VoiceQueryResponse = await voiceService.processQuery(query, language);
      setConversation({
        userText: result.recognizedText,
        aiResponse: result.responseText,
        actionUrl: result.suggestedActionUrl,
      });
      setIsProcessing(false);
      setIsPlayingAudio(true);
    }, 2500);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  const handleSubmitText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;

    setIsProcessing(true);
    const text = typedInput;
    setTypedInput('');
    const result = await voiceService.processQuery(text, language);
    setConversation({
      userText: result.recognizedText,
      aiResponse: result.responseText,
      actionUrl: result.suggestedActionUrl,
    });
    setIsProcessing(false);
    setIsPlayingAudio(true);
  };

  const handleSamplePrompt = async (prompt: string) => {
    setIsProcessing(true);
    const result = await voiceService.processQuery(prompt, language);
    setConversation({
      userText: result.recognizedText,
      aiResponse: result.responseText,
      actionUrl: result.suggestedActionUrl,
    });
    setIsProcessing(false);
    setIsPlayingAudio(true);
  };

  if (!voiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-agriBorder flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-agriBorder flex items-center justify-between bg-forest-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-semibold text-base">{t.voice.title}</h3>
              <p className="text-xs text-forest-100">{t.voice.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsPlayingAudio(false);
              setVoiceModalOpen(false);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Active Voice Interaction Visualizer */}
          <div className="flex flex-col items-center justify-center py-6 px-4 bg-forest-50/60 rounded-2xl border border-forest-100 text-center">
            {isListening ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-rose-500/20 animate-ping absolute inset-0" />
                  <div className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center relative shadow-lg">
                    <Mic className="w-9 h-9 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-rose-700 text-sm">{t.voice.listening}</p>
                  <p className="text-xs text-agriMuted">Speak in your language now...</p>
                </div>
                {/* Audio wave bars */}
                <div className="flex items-center gap-1.5 h-6">
                  {[40, 75, 95, 60, 85, 100, 70, 50, 80, 45].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-rose-500 rounded-full animate-bounce"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 75}ms`,
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={handleStopListening}
                  className="px-4 py-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg shadow-sm hover:bg-rose-50 flex items-center gap-1.5"
                >
                  <MicOff className="w-3.5 h-3.5" /> Stop Listening
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <button
                  onClick={handleStartListening}
                  className="w-20 h-20 rounded-full bg-forest-600 hover:bg-forest-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  title="Click to speak"
                >
                  <Mic className="w-9 h-9" />
                </button>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-agriText">{t.voice.speakNow}</p>
                  <p className="text-xs text-agriMuted">
                    Supports Tamil, Hindi, Telugu, Kannada, Malayalam & English
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-agriMuted uppercase tracking-wider">
              Quick Suggestions:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Rain forecast for Thanjavur', query: 'When will it rain in Thanjavur?' },
                { label: 'Urea dose for paddy', query: 'What is the recommended fertilizer for paddy?' },
                { label: 'Ponni mandi market price', query: 'What is the current mandi price for Ponni paddy?' },
                { label: 'Next crop recommendation', query: 'Which crop should I sow after paddy harvest?' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSamplePrompt(item.query)}
                  className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-forest-50 hover:text-forest-700 hover:border-forest-200 border border-transparent rounded-lg text-agriText transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation History / Results */}
          {conversation && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              {/* User Voice/Query */}
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-forest-50 text-forest-900 border border-forest-200 rounded-2xl rounded-tr-none px-4 py-2.5 text-xs max-w-[85%]">
                  <div className="flex items-center gap-1.5 text-forest-700 font-medium mb-1">
                    <User className="w-3 h-3" /> You asked
                  </div>
                  <p className="font-medium italic">"{conversation.userText}"</p>
                </div>
              </div>

              {/* AI Agro Response */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-forest-600 text-white flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs max-w-[90%] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-agriText flex items-center gap-1.5">
                      Agronomist AI Advisor
                    </span>
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="p-1 rounded hover:bg-white text-forest-700 flex items-center gap-1 text-[11px] font-medium"
                      title={isPlayingAudio ? 'Pause Voice' : 'Play Audio Voice'}
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                          <span className="text-rose-600">Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{t.voice.playAudio}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Simulated audio player progress */}
                  {isPlayingAudio && (
                    <div className="space-y-1 py-1">
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-forest-600 transition-all duration-150"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-agriMuted">
                        <span>Speaking audio...</span>
                        <span>0:04</span>
                      </div>
                    </div>
                  )}

                  <p className="text-agriText leading-relaxed">{conversation.aiResponse}</p>

                  {conversation.actionUrl && (
                    <div className="pt-1">
                      <Link
                        href={conversation.actionUrl}
                        onClick={() => setVoiceModalOpen(false)}
                        className="inline-flex items-center gap-1 text-forest-700 hover:text-forest-800 font-semibold text-xs"
                      >
                        View relevant advisory module <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center justify-center py-4 text-xs text-agriMuted gap-2">
              <div className="w-4 h-4 border-2 border-forest-600 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing query with agricultural advisory model...</span>
            </div>
          )}
        </div>

        {/* Text Fallback Footer */}
        <div className="p-4 border-t border-agriBorder bg-slate-50">
          <form onSubmit={handleSubmitText} className="flex items-center gap-2">
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder={t.voice.typeQuery}
              className="flex-1 bg-white border border-agriBorder rounded-xl px-4 py-2 text-xs text-agriText focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
            <button
              type="submit"
              disabled={!typedInput.trim()}
              className="bg-forest-600 hover:bg-forest-700 disabled:opacity-50 text-white p-2 rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
