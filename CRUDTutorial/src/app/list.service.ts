import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient, private router: Router) {

  }
  getList() {
    return this.httpClient.get('http://localhost:3000/company');
  }

  addEmployee(params) {
    this.httpClient.post('http://localhost:3000/company/', params).subscribe(res => {
      alert('Added!');
      this.router.navigate(['/list']);
    });
  }
}
