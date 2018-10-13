import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private _id: number;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router
  ) { }

  ngOnInit() {
    //it initialize for the first time****
    //this._id = +this._activatedRoute.snapshot.paramMap.get('id');
    //but code bellow inisialize every time the component recalled
    this._activatedRoute.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this.employee = this._employeeService.getEmployee(this._id);
    });
    
  }

  viewNextEmployee() {
    if(this._id < 2){
      this._id = this._id + 1;
    }else{
      this._id= 1;
    }
    
    this._router.navigate(['/employees', this._id],{
      queryParamsHandling: 'preserve'
    });
  }
}
