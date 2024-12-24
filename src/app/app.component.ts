import {Component, OnInit} from '@angular/core';
import {CustomButtonComponent} from './core/components/custom-button/custom-button.component';
import {ThemeService} from './core/services/theme.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BranchTypes} from './datas/branch-types';
import {CommonModule} from '@angular/common';
import {CustomButtonTypes} from './core/components/custom-button/custom-button-types';
import {Icons} from './core/constants/icons';
import {BranchData} from './core/models/branch-data';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CustomButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  readonly branchTypes = BranchTypes;
  customButtonTypes = CustomButtonTypes;
  isSubmitted: boolean = false;
  darkModeIcon: string;
  theme: string;
  branchData: BranchData;
  basePath: string = '';
  branchNameValue: string = '';
  commitMessageValue: string = '';
  prTitle: string = '';
  version: string = environment?.version;

  constructor(private themeService: ThemeService, private formBuilder: FormBuilder) {
    this.createForm();
    this.onBranchTypeChange();
  }

  ngOnInit(): void {
    this.getTheme();
  }

  createForm() {
    // FormGroup oluşturuluyor
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      repositoryName: ['', [Validators.required, Validators.minLength(3)]],
      branchType: ['', [Validators.required, Validators.minLength(3)]],
      issueCode: ['', [Validators.required, Validators.minLength(1)]],
      branchName: ['', [Validators.required, Validators.minLength(3)]],
      commitMessage: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    });
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

  getTheme() {
    this.theme = localStorage.getItem('theme');
    this.darkModeIcon = this.theme === 'dark' ? Icons.lightMode : Icons.darkMode;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.getTheme();
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.branchData = this.form.value as BranchData;
      this.branchNameValue = this.branchData?.branchType?.toLowerCase() + '/iss-' + this.branchData?.issueCode?.toString()?.toLowerCase() + '-' + this.branchData?.branchName?.toLowerCase().replaceSpacesWithDash();
      this.commitMessageValue = this.branchData?.username?.toLowerCase()?.replaceSpacesWithDash() + '/' + this.branchData?.repositoryName?.toLowerCase()?.replaceSpacesWithDash() + '#' + this.branchData?.issueCode?.toString()?.toLowerCase() + '|' + this.branchData?.commitMessage?.toLowerCase()?.replaceSpacesWithDash();
      this.prTitle = 'ISS #' + this.branchData?.issueCode?.toString()?.toLowerCase() + ' | PR';
    }
  }

  copyToClipboard(value: string) {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        console.log('Text copied to clipboard:', value);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  }

  onBranchTypeChange() {
    this.branchType.valueChanges.subscribe(value => {
      console.log(value);
    });
  }
}
