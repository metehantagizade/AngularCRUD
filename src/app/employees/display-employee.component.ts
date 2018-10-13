import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  //To pass data from Parent to Child we can use @Input
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  private _selectedEmployeeId: number;
  panelExpanded = true;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this._selectedEmployeeId = +this._activatedRoute.snapshot.paramMap.get('id');
  }

  getEmployeeNameAndGender(): string {
    return this.employee.name + ' ' + this.employee.gender;
  }
  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId])
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    const prevEmployee = <Employee>changes.employee.previousValue;
    const currEmployee = <Employee>changes.employee.currentValue;

    console.log('Previous : ' + (prevEmployee ? prevEmployee.name : 'null'));
    console.log('Current : ' + (currEmployee ? currEmployee.name : 'null'));
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: {
        'searchTerm': this.searchTerm
      }
    })
  }
  editEmployee() {
    this._router.navigate(['/create-employee', this.employee.id])
  }
  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }
}
