import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AiService, GenerateBranchNameResponse, GenerateCommitMessageResponse } from '../../services/ai.service';

@Component({
  selector: 'app-ai',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.scss',
})
export class AiComponent {
  @Input() currentValue: string = ''; // Parent'ten gelen mevcut değer
  @Input() fieldType: string = 'branch'; // 'branch' veya 'commit' gibi field tipini belirtir
  @Output() branchNameGenerated = new EventEmitter<string>();
  
  isLoading: boolean = false;

  constructor(private aiService: AiService) {}

  generateWithAI() {
    // Eğer mevcut değer yoksa, default prompt kullan
    const prompt = this.currentValue || (this.fieldType === 'branch' ? 'create a professional branch name' : 'create a professional commit message');
    
    this.isLoading = true;

    // Field tipine göre uygun AI metodunu çağır
    if (this.fieldType === 'branch') {
      this.aiService.generateBranchName(prompt).subscribe({
        next: (response: GenerateBranchNameResponse) => {
          console.log('AI Branch Response:', response);
          // Parent component'e response'u gönder
          this.branchNameGenerated.emit(response.branchName.trim());
          this.isLoading = false;
        },
        error: (error) => {
          console.error('AI branch service error:', error);
          this.isLoading = false;
        },
      });
    } else {
      this.aiService.generateCommitMessage(prompt).subscribe({
        next: (response: GenerateCommitMessageResponse) => {
          console.log('AI Commit Response:', response);
          // Parent component'e response'u gönder
          this.branchNameGenerated.emit(response.commitMessage.trim());
          this.isLoading = false;
        },
        error: (error) => {
          console.error('AI commit service error:', error);
          this.isLoading = false;
        },
      });
    }
  }
}
