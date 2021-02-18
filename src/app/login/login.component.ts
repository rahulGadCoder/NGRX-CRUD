import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameValidator } from '../shared/validators/usrname.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  arrobj: any = [
    { id: 1, eng: 70, hindi: 80 },
    { id: 2, eng: 60, hindi: 50 }
  ]

  arr1: any = [1,1,2, 2, 3];
  arr2: any = [4, 5, 6];

  obj1 = { foo: 'bar', x: 42 };
  obj2 = { foo1: 'baz', y: 13 };

    heroes = [
    { name: 'Wolverine',      family: 'Marvel',    isEvil: false },
    { name: 'Deadpool',       family: 'Marvel',    isEvil: false },
    { name: 'Magneto',        family: 'Marvel',    isEvil: true  },
    { name: 'Charles Xavier', family: 'Marvel',    isEvil: false },
    { name: 'Batman',         family: 'DC Comics', isEvil: false },
    { name: 'Harley Quinn',   family: 'DC Comics', isEvil: true  },
    { name: 'Legolas',        family: 'Tolkien',   isEvil: false },
    { name: 'Gandalf',        family: 'Tolkien',   isEvil: false },
    { name: 'Saruman',        family: 'Tolkien',   isEvil: true  }
  ]

  constructor(private fm: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fm.group({
      usrName: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      passWord: ['', [Validators.required, Validators.minLength(6)]],
    })
    let uniq = this.arr1.filter((item, i, arr) => arr.indexOf(item)== i);
  }

  get f() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('loginForm', JSON.stringify(this.loginForm.value));
      this.router.navigate(['/layout/home']);
    }
  }

}
