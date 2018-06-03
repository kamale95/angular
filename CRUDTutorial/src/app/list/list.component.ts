import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: any;
  constructor(private listService: ListService, private http: HttpClient, private router: Router) { }


  ngOnInit() {
    this.listService.getList()
      .subscribe(arg => this.list = arg);
  }

  deleteEmployeeDetails(id) {
    console.log(id);
    const status = confirm('Do you want to delete?');
    if (status) {
      this.http.delete('http://localhost:3000/company/' + id).subscribe(res => {

        this.listService.getList()
          .subscribe(arg => this.list = arg);
      });
    }
  }
}
