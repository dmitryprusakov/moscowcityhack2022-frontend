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
  url: string;
  createdAt: string;
  text: string;
  sourceScore: string;
  timesPublished: string | number;
  percentageBlackList: string | number;
  avgSourcesScore: string | number;
  reliableSourcesFlag: boolean;
};

export type Block2 = {
  data: {
    date: string;
    isValid: boolean;
  }[];
};

export type Block3 = {
  percentageПлагиат: string | number;
  isAnySentimentDelta: boolean;
  facts: string[];
};

export type Block4 = {
  grammaticErrorsCount: number;
  spamIndex: number;
  waterIndex: number;
  sentimentIndex: number;
  speechIndex: number;
  intuitionIndex: number;
  clickbaitIndex: number;
  rationalityIndex: number;
  fakeIndex: number;
};
