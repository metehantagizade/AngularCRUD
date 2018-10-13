import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-employees',
    templateUrl: './create-employees.component.html',
    styleUrls: ['./create-employees.component.css']
})

export class CreateEmployeesComponent implements OnInit {
    // viewChild used for create-employee-can-deactivate-guard , if inside createemployee page some field are filled 
    //and user click on another link, the browser should ask user are you sure want to leave page
    @ViewChild('employeeForm') public createEmployeeForm: NgForm;
    datePickerConfig: Partial<BsDatepickerConfig>;
    gender = 'male';
    isActive = true;
    previewPhoto = false;
    employee: Employee;
    departments: Department[] = [
        { id: 1, name: 'Help Desk' },
        { id: 2, name: 'HR' },
        { id: 3, name: 'IT' },
        { id: 4, name: 'Payroll' }
    ];

    constructor(
        private _employeeService: EmployeeService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this.datePickerConfig = Object.assign({},
            {
                containerClass: 'theme-dark-blue',
                // showWeekNumbers: false,
                // minDate: new Date(2018, 0, 1),
                // maxDate: new Date(2018, 11, 1),
                dateInputFormat: 'DD/MM/YYYY'
            });
    }
    togglePhotoPreview() {
        this.previewPhoto = !this.previewPhoto;
    }
    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(parameterMap => {
            const id = +parameterMap.get('id');
            this.getEmployee(id);
        })
    }
    private getEmployee(id: number) {
        if (id === 0) {
            this.employee = {
                id: null,
                name: null,
                gender: null,
                email: null,
                phoneNumber: null,
                contactPreference: null,
                dateOfBirth: null,
                department: 'selectRequired',
                isActive: null,
                photoPath: null,
                password: null

            }
            //if inside edit page user click on create button, we want to form to be clear
            this.createEmployeeForm.reset();
        } else {
            this.employee = Object.assign({}, this._employeeService.getEmployee(id));
        }
    }
    //(1 html) empForm: NgForm
    saveEmployee(): void {
        //Object.assign user dto copy a object to same type of another object
        //Before reset the form we should copy object to another object and then reset form , without that we will lose data on save
        const newEmployee: Employee = Object.assign({}, this.employee);
        this._employeeService.save(newEmployee);
        this.createEmployeeForm.reset({
            //department: this.employee.department
        });
        this._router.navigate(['employee-list']);
    }
}
