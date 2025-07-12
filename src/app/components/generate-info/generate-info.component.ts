import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BranchTypes } from '../../datas/branch-types';
import { BranchData } from '../../core/models/branch-data';
import { GitService } from '../../core/services/git.service';
import { AiComponent } from '../../core/components/ai/ai.component';

@Component({
  selector: 'app-generate-info',
  imports: [CommonModule, ReactiveFormsModule, AiComponent],
  templateUrl: './generate-info.component.html',
  styleUrl: './generate-info.component.scss',
})
export class GenerateInfoComponent {
  form: FormGroup;
  readonly branchTypes = BranchTypes;
  isSubmitted: boolean = false;
  branchData: BranchData;
  basePath: string = '';
  branchNameValue: string = '';
  commitMessageValue: string = '';
  prTitle: string = '';
  repos: any;
  loadingRepos: boolean = false;
  showRepoSuggestions: boolean = false;
  copiedStates: { [key: string]: boolean } = {};

  // AI generated suggestions
  aiGeneratedBranchName: string = '';
  aiGeneratedCommitMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private gitService: GitService
  ) {
    this.createForm();
  }

  getRepoByUsername(username: string): void {
    console.log('username', username);

    if (username && username.length > 3) {
      this.loadingRepos = true;
      this.gitService.getRepositories(username).subscribe({
        next: (response) => {
          this.repos = response;
          this.loadingRepos = false;
          console.log('Repositories:', this.repos);
        },
        error: (error) => {
          console.error('Error fetching repositories:', error);
          this.loadingRepos = false;
          this.repos = [];
        },
      });
    } else {
      this.repos = [];
    }
  }

  selectRepository(repoName: string): void {
    this.form.patchValue({
      repositoryName: repoName,
    });
    this.showRepoSuggestions = false;
  }

  hideRepoSuggestions(): void {
    // Small delay to allow click events to fire first
    setTimeout(() => {
      this.showRepoSuggestions = false;
    }, 200);
  }

  getFieldErrorClass(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.invalid && (field?.dirty || this.isSubmitted)) {
      return '!border-error !outline-error focus:!outline-error dark:!border-dark-error dark:!outline-dark-error';
    }
    return '';
  }

  onUsernameInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target?.value) {
      this.getRepoByUsername(target.value);
    }
  }

  copyCommitCommand(): void {
    const command = `git commit -m "${this.commitMessageValue}"`;
    this.copyWithEffect(command, 'commitCommand');
  }

  createForm() {
    // FormGroup oluşturuluyor
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      repositoryName: ['', [Validators.required, Validators.minLength(3)]],
      branchType: ['', [Validators.required, Validators.minLength(3)]],
      issueCode: [''],
      branchName: ['', [Validators.required, Validators.minLength(3)]],
      commitMessage: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  get username() {
    return this.form.get('username');
  }

  get repositoryName() {
    return this.form.get('repositoryName');
  }

  get branchType() {
    return this.form.get('branchType');
  }

  get issueCode() {
    return this.form.get('issueCode');
  }

  get branchName() {
    return this.form.get('branchName');
  }

  get commitMessage() {
    return this.form.get('commitMessage');
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.branchData = this.form.value as BranchData;
      this.generateBranchName();
      this.generateCommitMessage();
      this.generatePRTitle();

      // Results section'a otomatik scroll
      setTimeout(() => {
        this.scrollToResults();
      }, 100);
    }
  }

  private scrollToResults(): void {
    const resultsElement = document.querySelector('.results-section');
    if (resultsElement) {
      resultsElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  private generateBranchName(): void {
    const branchType = this.branchData?.branchType?.toLowerCase();
    const issueCode = this.branchData?.issueCode;
    const branchName = this.branchData?.branchName?.toKebabCase();

    if (issueCode && issueCode.toString().trim()) {
      this.branchNameValue = `${branchType}/iss-${issueCode}-${branchName}`;
    } else {
      this.branchNameValue = `${branchType}/${branchName}`;
    }
  }

  private generateCommitMessage(): void {
    const repositoryName = this.branchData?.repositoryName?.toKebabCase();
    const issueCode = this.branchData?.issueCode;
    const commitMessage = this.branchData?.commitMessage?.toKebabCase(); // Commit mesajında da boşlukları tire ile değiştir

    if (issueCode && issueCode.toString().trim()) {
      this.commitMessageValue = `${repositoryName}#${issueCode} | ${commitMessage}`;
    } else {
      this.commitMessageValue = `${repositoryName} | ${commitMessage}`;
    }
  }

  private generatePRTitle(): void {
    const branchType = this.branchData?.branchType;
    const issueCode = this.branchData?.issueCode;
    const commitMessage = this.branchData?.commitMessage?.toKebabCase(); // PR title'da da boşlukları tire ile değiştir

    if (issueCode && issueCode.toString().trim()) {
      this.prTitle = `${this.convertBranchType(
        branchType
      ).toUpperCase()} #${issueCode} | PR`;
    } else {
      this.prTitle = `${this.convertBranchType(
        branchType
      ).toUpperCase()} | PR `;
    }
  }

  copyToClipboard(value: string, key?: string) {
    if (value) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          console.log('Text copied to clipboard:', value);

          // Copy effect için state güncelle
          if (key) {
            this.copiedStates[key] = true;
            setTimeout(() => {
              this.copiedStates[key] = false;
            }, 2000);
          }
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
  }

  copyWithEffect(value: string, key: string): void {
    this.copyToClipboard(value, key);
  }

  onBranchTypeChange() {
    this.branchType.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  convertBranchType(branchType: string): string {
    switch (branchType?.toLowerCase()) {
      case 'feature':
        return 'feat';
      case 'bugfix':
        return 'fix';
      case 'hotfix':
        return 'hotfix';
      case 'release':
        return 'release';
      default:
        return branchType;
    }
  }

  onBranchNameGenerated(generatedName: string) {
    // AI'dan gelen branch name'i suggestion olarak sakla
    this.aiGeneratedBranchName = generatedName;
  }

  onCommitMessageGenerated(generatedMessage: string) {
    // AI'dan gelen commit message'ı suggestion olarak sakla
    this.aiGeneratedCommitMessage = generatedMessage;
  }

  useBranchNameSuggestion() {
    // AI suggestion'ını form'a uygula ve smooth animasyon ile suggestion'ı temizle
    this.form.patchValue({ branchName: this.aiGeneratedBranchName });
    
    // Kısa bir gecikme ile suggestion'ı temizle (animasyon için)
    setTimeout(() => {
      this.aiGeneratedBranchName = '';
    }, 300);
  }

  useCommitMessageSuggestion() {
    // AI suggestion'ını form'a uygula ve smooth animasyon ile suggestion'ı temizle
    this.form.patchValue({ commitMessage: this.aiGeneratedCommitMessage });
    
    // Kısa bir gecikme ile suggestion'ı temizle (animasyon için)
    setTimeout(() => {
      this.aiGeneratedCommitMessage = '';
    }, 300);
  }
}
