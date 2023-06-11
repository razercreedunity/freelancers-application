import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private apiUrl = 'https://rest-api-freelance.onrender.com';
  
  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/post`, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/update/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(`${this.apiUrl}/getAll`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
