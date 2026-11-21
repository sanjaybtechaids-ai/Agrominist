import type { Metadata } from 'next';
import '@/styles/globals.css';
import { VoiceAssistantModal } from '@/components/voice/VoiceAssistantModal';

export const metadata: Metadata = {
  title: 'Agronomist — Smart Farming. Better Decisions. Fair Markets.',
  description:
    'Multilingual AI-powered agricultural advisory and direct farmer-to-customer marketplace designed for Indian agriculture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-agriBg text-agriText antialiased">
        {children}
        <VoiceAssistantModal />
      </body>
    </html>
  );
}
