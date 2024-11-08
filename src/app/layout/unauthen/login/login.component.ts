import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthenticateService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }
  form!: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  // OnClickLogin() {
  //   this.form.markAllAsTouched();
  //   if (this.form.invalid) return
  //   let model = this.form.getRawValue();
  //
  //   this.authService.Login(model).pipe().subscribe(res => {
  //       if (res.status_code == 200) {
  //         this.authService.credentialSubject.next(res);
  //         localStorage.setItem('credential', JSON.stringify(res));
  //         console.log(res);
  //         this.router.navigate(["/"]);
  //       }else {
  //         this.snackBar.open("login thất bại ")
  //       }
  //     }
  //
  //   )
  //
  // }
  OnClickLogin() {
    // Đánh dấu tất cả các trường trong form là đã được chạm
    this.form.markAllAsTouched();

    // Nếu form không hợp lệ, không làm gì
    if (this.form.invalid) return;

    // Lấy dữ liệu từ form
    let model = this.form.getRawValue();

    // Gọi hàm login từ service
    this.authService.Login(model).pipe().subscribe(res => {
      if (res.status_code === 200) {
        // Cập nhật thông tin vào credentialSubject và localStorage
        this.authService.credentialSubject.next(res);
        localStorage.setItem('credential', JSON.stringify(res));

        console.log(res);

        // Chuyển hướng sau khi đã cập nhật dữ liệu thành công
        this.router.navigate(['/']);
      } else {
        // Thông báo khi login thất bại
        this.snackBar.open("Login thất bại");
      }
    }, error => {
      // Nếu có lỗi trong quá trình login
      console.error("Error during login", error);
      this.snackBar.open("Đã có lỗi trong quá trình đăng nhập.");
    });
  }


}
