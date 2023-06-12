import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {

  private apiUrl = 'https://rest-api-freelancer.vercel.app';
  
  constructor(private _http: HttpClient) {}

  addFreelancer(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/post`, data);
  }

  updateFreelancer(id: number, data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/update/${id}`, data);
  }

  getFreelancerList(): Observable<any> {
    return this._http.get(`${this.apiUrl}/getAll`);
  }

  deleteFreelancer(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
