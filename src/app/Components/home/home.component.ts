import { AfterViewInit, Component, inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {MatFormField} from '@angular/material/form-field'
import { MatInput, MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import {MatTooltip} from '@angular/material/tooltip';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Customerinterface } from '../../Interface/customerinterface';
import { CustomerserviceService } from '../../Service/customerservice.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CustomerformComponent } from '../customerform/customerform.component';
@Component({
  selector: 'app-home',
  imports: [MatFormField,MatInput,MatButtonModule,MatTooltip,MatTableModule, MatPaginatorModule,MatSortModule,MatInputModule,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'address','edit','delete'];
  customers:Array<Customerinterface>=[];
  filteredcustomers:Array<Customerinterface>=[];
  readonly dialog = inject(MatDialog);
  name:String="";
  email:String="";
  address:String="";

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  dataSource = new MatTableDataSource<Customerinterface>();

  customer:Customerinterface={
    id:0,
    name:"",
    email:"",
    address:""
  }

  cusservice:any;

  constructor(private customerService:CustomerserviceService){
    this.cusservice=customerService;

  }


  ngAfterViewInit(): void {


   this.cusservice.findAll().subscribe((data:any)=>{
     this.customers=data;
     console.log(this.customers);
     this.dataSource = new MatTableDataSource<Customerinterface>(data);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;


   });

  }

  filterCustomers(searchtext:String){

   this.filteredcustomers=this.customers.filter(item=>item.name.toLowerCase().includes(searchtext.toLowerCase()) || item.email.toLowerCase().includes(searchtext.toLowerCase()) || item.address.toLowerCase().includes(searchtext.toLowerCase()));
   this.dataSource = new MatTableDataSource<Customerinterface>(this.filteredcustomers);

  }

  saveuser(customersave:Customerinterface){
    const dialogRef = this.dialog.open(CustomerformComponent, {
      data: customersave,
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        this.customer.name=result.name;
        this.customer.address=result.address;
        this.customer.email=result.email;


      }
    });
  }

  deletecustomer(id:number){

    if(confirm("Are you sure you want to delete the customer?")){


      this.cusservice.deleteCustomer(id).subscribe({
        next:(data:any)=>{
          console.log(data);
          if(data){
            alert("Customer Deleted Successfully");
            window.location.reload();
          }
          else{
            alert(data.message);
          }
        }
      })
    }

  }
  }



