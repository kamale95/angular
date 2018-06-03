import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  employeeObj: Object = {};
  name: string;
  age: number;
  gender: string;
  salary: number;
  location: string;
  employeeDetailsForm: FormGroup;

  // For populating dropdown with pre defined location strings from an array
  locationArray: string[] = ['Chennai', 'Delhi', 'Bombay', 'Kolkata', 'Bangalore', 'Coimbatore'];

  /**
   * @param fb Injects FormBuilder Service
   * @param http Injects HttpClient Service
   * @param router Injects Router Service
   */
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

  }

  /**
   * On initialization, it calls a function to generate Employee Details Form
   */
  ngOnInit() {
    this.generateEmployeeDetailsForm();
  }


  /**
   * Generates the Employee Details form using Angular's Reactive Forms
   */
  generateEmployeeDetailsForm() {
    this.employeeDetailsForm =
      this.fb.group({
        'name': [null,
          Validators.compose([Validators.required,
          Validators.maxLength(15),
          Validators.minLength(5),
          Validators.pattern('[A-Za-z]*$')])],

        'age': [null,
          Validators.compose([Validators.required,
          Validators.min(18),
          Validators.max(65),
          Validators.pattern('^[0-9]*$')])],

        'gender': [null,
          Validators.required],

        'salary': [null,
          Validators.compose([Validators.required,
          Validators.pattern('^[0-9]*$')])],

        'location': ['',
          Validators.required]
      });
  }


  /**
   * 
   * @param form Contains Employee Details entered by user in the form 
   */
  saveEmployeeDetails(form: any) {
    this.employeeObj = {
      'name': form.name,
      'age': form.age,
      'gender': form.gender,
      'salary': form.salary,
      'location': form.location
    };
    console.log(`Name : ${this.employeeObj} Age : ${this.age} Gender : ${this.gender}`);
    console.log(`Salary: ${this.salary} Location ${this.location}`);
    this.http.post('http://localhost:3000/company/', this.employeeObj).subscribe(res => {
      alert('Added!');
      this.router.navigate(['/list']);
    });
  }

}
