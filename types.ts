export enum Tab {
  DASHBOARD = 'dashboard',
  GALLERY = 'gallery',
  REMOTE = 'remote',
  SETTINGS = 'settings'
}

export interface Photo {
  id: string;
  url: string;
  timestamp: Date;
  aiCaption?: string;
  isPrinting?: boolean;
}

export interface BoothStatus {
  isOnline: boolean;
  paperLevel: number; // 0-100
  printerStatus: 'Ready' | 'Printing' | 'Error' | 'Offline';
  sessionCount: number;
  revenue: number;
}

export interface AiAnalysisResult {
  caption: string;
  tags: string[];
}