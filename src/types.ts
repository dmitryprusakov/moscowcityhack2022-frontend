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
  text?: string;
  title?: string;
  blocksCountForLoading: number;
};

export type Block1 = {
  isPrimarySource: boolean;
  primarySourceURL: string;
};

export type Block2 = {
  data: any;
};
