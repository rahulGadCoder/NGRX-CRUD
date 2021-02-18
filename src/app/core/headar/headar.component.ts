import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headar',
  templateUrl: './headar.component.html',
})
export class HeadarComponent implements OnInit {

  dropdownArray: any = [];
  dropdownValue: any;

  constructor(private router: Router) {

    this.dropdownArray = [
      { name: 'Profile qdhjhkqehwehwe qwrhhqerhr qwjhqwrh', code: 'PF' },
      { name: 'Logout', code: 'log' },
    ];
  }

  ngOnInit() {
  }

  onChange(event) {
    if (event.value.code == "PF") {
      this.router.navigate(['layout/profile']);
    } else {
      localStorage.setItem('isLoggedIn', "false");
      this.router.navigate(['/login']);
    }
  }

}
