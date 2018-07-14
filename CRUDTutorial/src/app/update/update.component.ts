import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
    dataObj: any;
    employeeObj: Object = {};
    listObj: any;
    id: number;
    name: string;
    age: number;
    gender: string;
    salary: number;
    location: string;
    employeeDetailsForm: FormGroup;

    // For populating dropdown with pre defined location strings from an array
    locationArray: string[] = ['Chennai', 'Delhi', 'Bombay', 'Kolkata', 'Bangalore', 'Coimbatore'];

    // Initializes the FormBuilder service
    constructor(private fb: FormBuilder, private http: HttpClient,
        private route: ActivatedRoute, private router: Router,
        private listService: ListService) {
        this.generateEmployeeDetailsForm();
    }

    ngOnInit() {
        this.updateForm();
    }

    updateForm() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.listService.getList()
            .subscribe(arg => {
                this.listObj = arg;

                for (let i = 0; i < this.listObj.length; i++) {
                    // tslint:disable-next-line:radix
                    if (parseInt(this.listObj[i].id) === this.id) {
                        this.dataObj = this.listObj[i];
                        break;
                    }
                }
                this.employeeDetailsForm.patchValue({
                    'name': this.dataObj.name,
                    'age': this.dataObj.age,
                    'gender': this.dataObj.gender,
                    'salary': this.dataObj.salary,
                    'location': this.dataObj.location
                });
            });
    }

    // Generates the Employee Details Form
    generateEmployeeDetailsForm() {

        this.employeeDetailsForm =
            this.fb.group({
                // tslint:disable-next-line:max-line-length

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



    // Saves the Employee Details to our properties defined in this form after clicking the Submit Button and logs them to the console

    updateEmployeeDetails(form: any) {
        this.employeeObj = {
            'name': form.name,
            'age': form.age,
            'gender': form.gender,
            'salary': form.salary,
            'location': form.location
        };
        this.http.put('http://localhost:3000/company/' + this.id, this.employeeObj).subscribe(res => {
            alert('Updated!');
            this.router.navigate(['/list']);
        });
    }
}
