import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'home',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  standalone: true,
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
