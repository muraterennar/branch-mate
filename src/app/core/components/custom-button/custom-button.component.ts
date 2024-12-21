import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomButtonTypes} from './custom-button-types';

@Component({
  selector: 'app-custom-button',
  imports: [CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent implements OnInit {
  @Input() text: string = "custom button";
  @Input() type: CustomButtonTypes = CustomButtonTypes.button;
  @Input() disabled: boolean = false;
  @Input() class: string = "";
  @Input() click: () => void;

  ngOnInit(): void {

  }

  onClick(): void {
    if (this.click) {
      this.click();
    }
  }
}
