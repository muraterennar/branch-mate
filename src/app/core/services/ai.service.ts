// Angular Frontend Service (updated for BranchMate Backend API)
// File: src/app/core/services/ai.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Request Interfaces
export interface GenerateContentRequest {
  contents: Array<{
    role: string;
    parts: Array<{ text: string }>;
  }>;
}

export interface GenerateContentTextRequest {
  prompt: string;
  systemPrompt?: string;
}

export interface GenerateBranchNameRequest {
  prompt: string;
}

export interface GenerateCommitMessageRequest {
  prompt: string;
}

// Response Interfaces
export interface GenerateContentTextResponse {
  text: string;
}

export interface GenerateBranchNameResponse {
  branchName: string;
}

export interface GenerateCommitMessageResponse {
  commitMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly apiUrl = `${environment.API_BASE_URL}/api`;

  constructor(private readonly httpClient: HttpClient) {
    // Development environment check
    if (!environment.production) {
      console.log('🚀 BranchMate AI Service initialized');
      console.log('📡 Backend URL:', this.apiUrl);
    }
  }

  /**
   * Raw content generation - direkt Gemini API formatı
   * Endpoint: POST /api/generate-content
   * @param contents Gemini API formatında içerikler
   * @returns Gemini API response
   *
   * @example
   * ```typescript
   * const contents = [
   *   {
   *     role: "user",
   *     parts: [{ text: "Hello, how are you?" }]
   *   }
   * ];
   * service.generateContent(contents).subscribe(response => {
   *   console.log(response);
   * });
   * ```
   */
  generateContent(
    contents: Array<{ role: string; parts: Array<{ text: string }> }>
  ): Observable<any> {
    const body: GenerateContentRequest = { contents };

    return this.httpClient.post(`${this.apiUrl}/ai/generate-content`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Text generation with optional system prompt
   * Endpoint: POST /api/generate-content-text
   * @param prompt Kullanıcı promptu
   * @param systemPrompt Opsiyonel sistem promptu
   * @returns Sadece text içeriği
   *
   * @example
   * ```typescript
   * service.generateContentText(
   *   "TypeScript nedir?",
   *   "You are a helpful programming tutor"
   * ).subscribe(response => {
   *   console.log(response.text);
   * });
   * ```
   */
  generateContentText(
    prompt: string,
    systemPrompt?: string
  ): Observable<GenerateContentTextResponse> {
    const body: GenerateContentTextRequest = { prompt, systemPrompt };

    return this.httpClient.post<GenerateContentTextResponse>(
      `${this.apiUrl}/ai/generate-content-text`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  /**
   * GitHub branch name generation
   * Endpoint: POST /api/generate-branch-name
   * @param prompt Branch açıklaması (Türkçe veya İngilizce)
   * @returns Clean, professional branch name
   *
   * @example
   * ```typescript
   * service.generateBranchName("kullanıcı giriş sistemi eklendi").subscribe(response => {
   *   console.log(response.branchName); // "user-login-system"
   * });
   * ```
   */
  generateBranchName(prompt: string): Observable<GenerateBranchNameResponse> {
    const body: GenerateBranchNameRequest = { prompt };

    return this.httpClient.post<GenerateBranchNameResponse>(
      `${this.apiUrl}/ai/generate-branch-name`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  /**
   * GitHub commit message generation
   * Endpoint: POST /api/generate-commit-message
   * @param prompt Commit açıklaması (Türkçe veya İngilizce)
   * @returns Clean, professional commit message
   *
   * @example
   * ```typescript
   * service.generateCommitMessage("login butonu hatası düzeltildi").subscribe(response => {
   *   console.log(response.commitMessage); // "resolve login button validation error"
   * });
   * ```
   */
  generateCommitMessage(
    prompt: string
  ): Observable<GenerateCommitMessageResponse> {
    const body: GenerateCommitMessageRequest = { prompt };

    return this.httpClient.post<GenerateCommitMessageResponse>(
      `${this.apiUrl}/ai/generate-commit-message`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
