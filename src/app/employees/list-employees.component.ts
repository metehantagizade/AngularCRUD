import { Employee } from './../models/employee.model';
import { Component, OnInit } from "@angular/core";
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-list-employees',
    templateUrl: './list-employees.component.html',
    styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {
    employees: Employee[];
    //Stor list of filtered edmployees
    filterEmployees: Employee[];
    employeeToDisplay: Employee;
    //----------------------
    private _searchTerm: string;
    get searchTerm(): string {
        return this._searchTerm;
    }
    set searchTerm(value: string) {
        this._searchTerm = value;
        this.filterEmployees = this.filterEmployeesFunc(value);
    }

    filterEmployeesFunc(searchString: string) {
        return this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
    }
    //----------------------
    private arrayIndex = 1;
    constructor(
        private _employeeService: EmployeeService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        //used for Resolver 
        this.employees = this._activatedRoute.snapshot.data['employeeList'];
        this.employeeToDisplay = this.employees[0];
        if (this._activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
            this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
        } else {
            this.filterEmployees = this.employees;
        }
    }
    ngOnInit() {
        // this._employeeService.getEmployees().subscribe((empList) => {
        //     this.employees = empList;
        //     //if the codes bellow placed outside of subscribe and getEmployee has delay then code bellow will run before *
        //     this.employeeToDisplay = this.employees[0];
        //     this.filterEmployees = this.employees; //*
        //     if (this._activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
        //         this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
        //     } else {
        //         this.filterEmployees = this.employees;
        //     }
        // });

        //queryParamMap used for query parameters
        // console.log(this._activatedRoute.snapshot.queryParamMap.has('searchTerm'));
        // console.log(this._activatedRoute.snapshot.queryParamMap.get('searchTerm'));
        // console.log(this._activatedRoute.snapshot.queryParamMap.getAll('searchTerm'));
        // console.log(this._activatedRoute.snapshot.queryParamMap.keys);
        //paramMap used for optional and required parameters
        // console.log(this._activatedRoute.snapshot.paramMap.keys);
    }
    onClick(employeeId: number) {
        this._router.navigate(['/employees', employeeId], {
            queryParams: {
                'searchTerm': this.searchTerm,
                'testParam': 'testValue'
            }
        })
    }


    nextEmployee(): void {
        if (this.arrayIndex <= 1) {
            this.employeeToDisplay = this.employees[this.arrayIndex];
            this.arrayIndex++;
        } else {
            this.employeeToDisplay = this.employees[0];
            this.arrayIndex = 1;
        }
    }
    // added because when delete employee after search , list of searched employee dose not update
    onDeleteNotification(id: number){
        const i =this.filterEmployees.findIndex(e=> e.id === id);
        if( i !== -1){
            this.filterEmployees.splice(i, 1);
        }
    }

    changeEmployeeName() {
        //For filter we define employeeFilter pipe and assigned to employees (employees | employeeFilter)
        //at first by writing m on search box only Ahmet is diplayed wen click on change name button, Tohid will be change
        //to Jordam but in pure pipe (this.employees[0].name= 'Jordam') dose not reexecute pipe on search to displaye jordam and ahmet

        this.employees[0].name = 'Jordam';
        this.filterEmployees = this.employees;
        //3 line bellow used to execute pipe again by change'ing name value of first employee
        // const newEmployeeArray: Employee[] = Object.assign([],this.employees);
        // newEmployeeArray[0].name = 'Jordam';
        // this.employees = newEmployeeArray;

        //another way to execute pipe on data change again is to define pipe as impure by set pure: false on pure.ts page
        //if pure set to false (this.employees[0].name= 'Jordam';) will be work but impure performans is not as well as pure

        //**Angular teams not recommended to use pipe for filter and sort data because in
        // impure pipe on every and every change(val,property,...) pipe will be executed */
    }
}