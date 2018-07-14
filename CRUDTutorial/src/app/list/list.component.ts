import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeModel } from '../model/employeeModel'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    list: EmployeeModel[];
    constructor(private listService: ListService, private http: HttpClient, private router: Router) { }


    ngOnInit() {
        this.listService.getList()
            .subscribe(arg => this.list = <EmployeeModel[]>arg);
    }

    deleteEmployeeDetails(id: number) {
        const status = confirm('Do you want to delete?');
        if (status) {
            this.http.delete('http://localhost:3000/company/' + id).subscribe(res => {
                this.listService.getList()
                    .subscribe(arg => this.list = <EmployeeModel[]>arg);
            });
        }
    }
}
