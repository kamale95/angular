import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';
import { EmployeeModel } from '../model/employeeModel';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
    employeeObj: EmployeeModel;
    employeeList: EmployeeModel[];
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
    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private activatedRoute: ActivatedRoute, private router: Router,
        private listService: ListService
    ) { }

    ngOnInit() {
        this.generateEmployeeDetailsForm();
        this.activatedRoute.params.subscribe(this.parseRootParams.bind(this));
    }

    /**
     *  Assigns ID from the URL and calls fetchListMethod
     * @param params contains data from the url
     */
    parseRootParams(params: number) {
        this.id = +params['id'];
        this.fetchList();
    }

    /**
     * Issues api call to the service
     */
    fetchList() {
        this.listService.getList().subscribe(this.handleList.bind(this));
    }

    /**
     * Handles response obtained from the api
     * @param response response from the api
     */
    handleList(response: EmployeeModel[]) {
        if (response && response.length > 0) {
            this.employeeList = response;
            this.extractEmployeeFromID();
        }
    }

    /**
     * Fetches Data of Employee from the list based on ID
     */
    extractEmployeeFromID() {
        for (let i = 0; i < this.employeeList.length; i++) {
            if (parseInt(this.employeeList[i].id, 10) === this.id) {
                this.employeeObj = this.employeeList[i];
                break;
            }
        }
        this.prePopulateForm();
    }

    /**
     *  Prepulates the form values based on Employee ID
     */
    prePopulateForm() {
        this.employeeDetailsForm.patchValue({
            'name': this.employeeObj.name,
            'age': this.employeeObj.age,
            'gender': this.employeeObj.gender,
            'salary': this.employeeObj.salary,
            'location': this.employeeObj.location
        });
    }

    /**
     * Generates Employee Details Reactive Form and Adds Validation Configurations to it
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
     *  Saves the Employee Details to our properties defined in this form after clicking the Submit Button
     * @param form contains form data
     */
    updateEmployeeDetails(form: any) {
        this.employeeObj = {
            'id': null,
            'name': form.name,
            'age': form.age,
            'gender': form.gender,
            'salary': form.salary,
            'location': form.location
        };
        this.listService.putList(this.id, this.employeeObj).subscribe(this.returnToList.bind(this));
    }

    /**
     * Alerts the user and returns back to the list
     */
    returnToList() {
        alert('Updated!');
        this.router.navigate(['/list']);
    }
}
