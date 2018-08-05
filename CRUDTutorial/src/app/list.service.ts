import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeModel } from './model/employeeModel';

@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    /**
     * Issues get request to fetch list of employee records from the database
     */
    getList() {
        return this.httpClient.get('http://localhost:3000/company');
    }

    /**
     * Issues POST request to add employee record in the database
     * @param postData Data to be added
     */
    postList(postData: EmployeeModel) {
        return this.httpClient.post('http://localhost:3000/company/', postData);
    }

    /**
     * Issues PUT request to update employee record in the database
     * @param id id of the record which needs to be updated
     * @param postData Data to be updated
     */
    putList(id: number, postData: EmployeeModel) {
        return this.httpClient.put('http://localhost:3000/company/' + id, postData);
    }

    /**
     * Issues Delete request to delete employee record in the database
     * @param id id of the record to be deleted
     */
    deleteList(id: number) {
        return this.httpClient.delete('http://localhost:3000/company/' + id);
    }
}
