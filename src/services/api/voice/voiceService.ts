import { SupportedLanguage } from '@/types';

export interface VoiceQueryResponse {
  recognizedText: string;
  responseText: string;
  suggestedActionUrl?: string;
  audioDurationSeconds: number;
}

/**
 * A provider adapter belongs here. It intentionally does not fabricate farm
 * advice when speech, weather, market, or soil providers are unavailable.
 */
export const voiceService = {
  async processQuery(query: string, _language: SupportedLanguage): Promise<VoiceQueryResponse> {
    return {
      recognizedText: query,
      responseText: 'Voice advisory is unavailable until a verified voice and agricultural-data provider is configured.',
      audioDurationSeconds: 0,
    };
  },
};
