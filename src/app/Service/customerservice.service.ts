import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customerinterface } from '../Interface/customerinterface';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {

  constructor(private http:HttpClient) { }

customerslist:Array<Customerinterface>=[];

public findAll(): Observable<Customerinterface[]> {
  return this.http.get<Customerinterface[]>("http://localhost:8080/getdetails");
}

public addCustomer(data:Customerinterface){
  return this.http.post<Customerinterface>("http://localhost:8080/saveCustomer",data);
}

public updateCustomer(data:Customerinterface){
  return this.http.put<Customerinterface>("http://localhost:8080/updateCustomer",data);
}

public deleteCustomer(id:number) {
  return this.http.delete("http://localhost:8080/deleteCustomer/"+id);
}


}
