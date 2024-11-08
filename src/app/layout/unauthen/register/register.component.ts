import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from "../../../services/authenticate.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(private authService: AuthenticateService, private fb: FormBuilder, private router: Router) {

  }
  registerForm!: FormGroup;

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', [Validators.required]]

    })
  }
  onRegister(): void {
    if (this.registerForm.invalid) {
      alert('Vui lòng điền đầy đủ và đúng thông tin!');
      return;
    }
    const formValues = this.registerForm.value;
    this.authService.Register(formValues).subscribe();
    this.router.navigate(["/login"]) ;


  }


}


