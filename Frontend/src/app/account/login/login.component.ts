import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {Router, RouterLink} from '@angular/router';
import {Login} from '../models/login';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  providers: [AccountService]
})
export class LoginComponent {
  protected isSubmitted: boolean = false;
  protected loginForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private toastrService: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitted = true;
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      let login: Login = new Login(email, password);
      const isRegistered: boolean = await this.accountService.login(login);
      if (isRegistered) {
        await this.router.navigate(['/products']);
      }
    }
  }
}
