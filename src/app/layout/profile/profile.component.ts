import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;
  filteredCountriesSingle: any[];

  constructor(private fm: FormBuilder, private router: Router, private service: SharedService) { }

  ngOnInit() {
    this.profileForm = this.fm.group({
      name: ['', Validators.required],
      // lastName: ['', Validators.required],
      age: ['', Validators.required],
      profession: ['', Validators.required],
      country: ['', Validators.required]

    })
  }

  get f() {
    return this.profileForm.controls;
  }

  onClickUpdate() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.router.navigate(['/layout/home']);
  }


  filterCountrySingle(event) {

    let query = event.query;
   this.service.getCoutrie().subscribe(response => {
      this.filteredCountriesSingle = this.filterCountry(query, response.data);
      console.log("this.filteredCountriesSingle", this.filteredCountriesSingle);
    })
  }



  filterCountry(query, countries: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

}

