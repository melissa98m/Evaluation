import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  hide = true;
  signinForm: FormGroup;
  isLoading = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private headerTitleService: HeaderTitleService
  ) { 
    
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.headerTitleService.setTitle("Login");

    if (localStorage.getItem('access_token')) {
      this.router.navigate(['accueil']);
    }

  }

  ngOnInit(): void { }

  loginUser() {
    this.isLoading = true;
    this.authService.signIn(this.signinForm.value);
    this.authService.errorSend.subscribe( 
      data => { 
        if (data === 'none') {
          this.router.navigate(['accueil']);
        }
      }
    )
  }

}
