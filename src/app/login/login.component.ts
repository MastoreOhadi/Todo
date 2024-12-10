import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatListModule ,MatCardModule,
    MatFormFieldModule, MatInputModule,
    MatButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  // username: string = '';
  // password: string = '';
  loginForm!: FormGroup;
  // @ViewChild('txtName') txtName? : ElementRef
  // @ViewChild('txtEmail') txtEmail? : ElementRef

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login successful');
          // هدایت به داشبورد
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }


  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
