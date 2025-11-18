const API_BASE_URL = 'http://127.0.0.1:5000';

export interface UploadResponse {
  message: string;
  filename: string;
}

export interface AskResponse {
  answer: string;
  sources?: string[];
}

export interface SummaryResponse {
  summary: string;
}

export class ApiService {
  static async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  static async askQuestion(question: string): Promise<AskResponse> {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Question failed: ${response.statusText}`);
    }

    return response.json();
  }

  static async getSummary(): Promise<SummaryResponse> {
    const response = await fetch(`${API_BASE_URL}/summary`);

    if (!response.ok) {
      throw new Error(`Summary failed: ${response.statusText}`);
    }

    return response.json();
  }
}
