import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  showFooter = true;
  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)  // Lọc chỉ sự kiện NavigationEnd
    ).subscribe((event) => {  // Bỏ qua việc khai báo kiểu cho event tại đây
      const navigationEndEvent = event as NavigationEnd;  // Ép kiểu event thành NavigationEnd
      if (navigationEndEvent.url === '/login') {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }
    });
  }
}
