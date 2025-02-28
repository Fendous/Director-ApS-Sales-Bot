export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string | ArrayBuffer | null;
}