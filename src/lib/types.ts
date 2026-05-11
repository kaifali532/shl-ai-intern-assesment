export interface SHLRecommendation {
  name: string;
  url: string;
  test_type: string;
}

export interface SHLResponse {
  reply: string;
  recommendations: SHLRecommendation[];
  end_of_conversation: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  data?: SHLResponse;
}
