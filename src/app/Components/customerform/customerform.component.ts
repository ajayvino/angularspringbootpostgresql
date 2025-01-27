import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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
import { Customerinterface } from '../../Interface/customerinterface';
import { CustomerserviceService } from '../../Service/customerservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customerform',
  imports: [MatButtonModule, MatDividerModule, MatIconModule,MatFormFieldModule, MatInputModule, MatSelectModule,MatDialogModule,MatDialogContent,FormsModule,CommonModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './customerform.component.html',
  styleUrl: './customerform.component.css'
})
export class CustomerformComponent {

  readonly dialogref = inject(MatDialogRef<CustomerformComponent>);

  data=inject<Customerinterface>(MAT_DIALOG_DATA);

  constructor(private customerservice:CustomerserviceService){}

  addoredit(data:Customerinterface){

    if(data.id !==0){

      this.customerservice.updateCustomer(data).subscribe({
        next:(data)=>{
          console.log("Customer Update Successfully");
          window.location.reload();

        },
        error:(err)=>{
          console.log(err);

        }
      })



    }
    else{
      this.customerservice.addCustomer(data).subscribe({
        next:(data)=>{
          console.log("Customer Added Successfully");
          window.location.reload();

        },
        error:(err)=>{
          console.log(err);

        }
      })
    }


  }

}
