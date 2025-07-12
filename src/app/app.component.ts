import { Component, OnInit } from '@angular/core';
import { CustomButtonComponent } from './core/components/custom-button/custom-button.component';
import { ThemeService } from './core/services/theme.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BranchTypes } from './datas/branch-types';
import { CommonModule } from '@angular/common';
import { CustomButtonTypes } from './core/components/custom-button/custom-button-types';
import { Icons } from './core/constants/icons';
import { BranchData } from './core/models/branch-data';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  darkModeIcon: string;
  theme: string;
  version: string = environment?.version;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.getTheme();
  }

  getTheme() {
    this.theme = localStorage.getItem('theme');
    this.darkModeIcon =
      this.theme === 'dark' ? Icons.lightMode : Icons.darkMode;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.getTheme();
  }
}
