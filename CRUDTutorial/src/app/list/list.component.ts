import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeModel } from '../model/employeeModel';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    employeeList: EmployeeModel[];
    constructor(
        private listService: ListService,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
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
        }
    }

    /**
     * Deletes the employee record based on the id and refreshes the list
     * @param id id of the employee
     */
    deleteEmployeeDetails(id: number) {
        const status = confirm('Do you want to delete?');
        if (status) {
            this.listService.deleteList(id).subscribe(this.fetchList.bind(this));
        }
    }
}
