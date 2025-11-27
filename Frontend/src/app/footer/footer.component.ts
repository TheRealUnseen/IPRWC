import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'custom-footer',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  standalone: true,
  templateUrl: './footer.component.html'
})
export class FooterComponent {

}
