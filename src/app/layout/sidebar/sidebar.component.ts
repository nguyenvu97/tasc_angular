import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import { AuthenticateService } from "../../services/authenticate.service";
import {BehaviorSubject, filter, Observable} from "rxjs";
import { Info_customer } from "../../models/info_customer";
import { Response_Data } from "../../models/authen";
import {Customer} from "../../models/Customer";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']  // Sửa 'styleUrl' thành 'styleUrls'
})
export class SidebarComponent implements OnInit {
   customer: Info_customer | null = null;
  showHeader = true;

  constructor(private router: Router, private authService: AuthenticateService) {


  }

  ngOnInit() {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)  // Lọc chỉ sự kiện NavigationEnd
    ).subscribe((event) => {  // Bỏ qua việc khai báo kiểu cho event tại đây
      const navigationEndEvent = event as NavigationEnd;  // Ép kiểu event thành NavigationEnd
      if (navigationEndEvent.url === '/login' || navigationEndEvent.url === '/register') {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    });
    this.get_data_customer();
  }

  goToLogin() {
    this.router.navigate(['/login']);  // Điều hướng đến trang login
  }

  goToLogout() {
    this.authService.Logout();  // Gọi phương thức logout trong service
    this.router.navigate(['/login']);  // Điều hướng về trang chủ
  }
  get_data_customer (){
    var data = localStorage.getItem("credential");
    if (data) {
      var parsedData = JSON.parse(data);
      var accessToken = parsedData.data.access_token;

      // Gọi hàm getCustomerInfo và subscribe để nhận giá trị mới
      this.authService.getCustomerInfo(accessToken).subscribe(
        (customerData) => {
          this.customer = customerData;
        },
        (error) => {
          console.error('Error fetching customer data:', error);
        }
      );
    }
  }

}
