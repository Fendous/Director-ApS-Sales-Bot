import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (!isListening && transcript) {
      onVoiceInput(transcript);
      resetTranscript();
    }
  }, [isListening, transcript, onVoiceInput, resetTranscript]);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <button 
        className="p-2 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed" 
        disabled
        title="Your browser doesn't support speech recognition"
      >
        <MicOff className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleListening}
      className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
      title={isListening ? 'Stop recording' : 'Start recording'}
    >
      {isListening ? <Mic className="h-5 w-5 animate-pulse" /> : <Mic className="h-5 w-5" />}
    </button>
  );
};

export default VoiceInput;