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
  return this.http.get<Customerinterface[]>("https://springbootpostgresql.onrender.com/getdetails");
}

public addCustomer(data:Customerinterface){
  return this.http.post<Customerinterface>("https://springbootpostgresql.onrender.com/saveCustomer",data);
}

public updateCustomer(data:Customerinterface){
  return this.http.put<Customerinterface>("https://springbootpostgresql.onrender.com/updateCustomer",data);
}

public deleteCustomer(id:number) {
  return this.http.delete("https://springbootpostgresql.onrender.com/deleteCustomer/"+id);
}


}
