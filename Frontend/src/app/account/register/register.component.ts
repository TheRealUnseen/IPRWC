import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {Router, RouterLink} from '@angular/router';
import {Login} from '../models/login';
import {ToastrService} from 'ngx-toastr';
import {passwordValidator} from '../../validator/password.validator';
import {NgIf} from '@angular/common';

@Component({
  selector: 'register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  providers: [AccountService]
})
export class RegisterComponent {
  protected isSubmitted: boolean = false;
  protected registerForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router, private toastrService: ToastrService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      this.isSubmitted = true;
      const email = this.registerForm.get('email')!.value;
      const password = this.registerForm.get('password')!.value;
      const confirmPassword = this.registerForm.get('confirmPassword')!.value;

      if (password === confirmPassword) {
        let login: Login = new Login(email, password);
        const isRegistered: boolean = await this.accountService.register(login);
        if (isRegistered) {
          await this.router.navigate(['/products']);
        }
      } else {
        this.toastrService.error('Passwords do not match!');
      }
    }
  }
}
