export type ErrorInfo = {
  status?: number;
  requestUrl?: string;
};

export type FormFields = {
  url?: string;
  text?: string;
  title?: string;
};

export type AnalyzeStatus = 'processing' | 'success' | null;

export type AnalyzeInitialData = {
  arid: string;
  text?: string;
  title?: string;
};

export type AnalyzisData = {
  id: number;
  date_added: string;
  date_updated: string;
  uid: string;
  status: 'IN_PROGRESS' | 'DONE';
  primary_source_url?: string;
  created_at?: string;
  source_text?: string;
  source_title?: string;
  source_score?: number;
  times_published?: number;
  percentage_blacklist?: number;
  avg_sources_score?: number;
  reliable_sources?: boolean;
  diagram_data?: string;
  plagiarism?: string;
  is_any_sentiment_delta?: true;
  facts?: string;
  grammatical_errors_count?: number;
  spam?: number;
  water?: number;
  sentiment?: number;
  speech?: number;
  intuition?: number;
  clickbait?: number;
  rationality?: number;
  fake?: number;
};
