import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from '../core/models/Status';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.login().subscribe({
        next: (status: Status) => {
          if (status) {
            localStorage.setItem('user', JSON.stringify(status));
            this.router.navigate(['/person']);
          } else {
            localStorage.setItem('user', 'null');
          }
        },
        error: () => {
          localStorage.setItem('user', 'null');
        },
      });
    }
  }
}
