export type ErrorInfo = {
  status?: number;
  requestUrl?: string;
};

export type FormFields = {
  url?: string;
  text?: string;
  title?: string;
};

export type AnalyzeInitialData = {
  ar_id: string;
  text?: string;
  title?: string;
};

export type AnalyzisData = {
  id: number;
  primary_source_url?: string;
  created_at?: string;
  text?: string;
  source_score?: number;
  times_published?: number;
  percentage_blacklist?: number;
  source_text?: string;
  avg_sources_score?: number;
  reliable_sources_flag?: boolean;
  diagram_data?: string;
  // {
  //   date: string;
  //   is_valid: boolean;
  // }[];
  plagiary_percentage?: string;
  is_any_sentiment_delta?: true;
  facts?: string;
  grammatic_errors_count?: number;
  spam_index?: number;
  water_index?: number;
  sentiment_index?: number;
  speech_index?: number;
  intuition_index?: number;
  clickbait_index?: number;
  rationality_index?: number;
  fake_index?: number;
  date_added: string;
  date_updated: string;
};
