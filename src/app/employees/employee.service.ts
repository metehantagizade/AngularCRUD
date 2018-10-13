import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
    private listEmployee: Employee[] = [{
        id: 1,
        name: 'Tohid',
        gender: 'Male',
        contactPreference: 'Email',
        email: 'tohid@tiga',
        dateOfBirth: new Date('10/08/1987'),
        department: '2',
        isActive: true,
        photoPath: '../assets/images/default.jpeg'
    }, {
        id: 2,
        name: 'Ahmet',
        gender: 'Female',
        contactPreference: 'Email',
        email: 'ahmet@tiga',
        dateOfBirth: new Date('05/04/1989'),
        department: '3',
        isActive: true,
        phoneNumber: 135431654,
        photoPath: '../assets/images/hKVSMFXo.jpg'
    }];

    getEmployees(): Observable<Employee[]> {
        return of(this.listEmployee).pipe(delay(2000));
    }
    getEmployee(id: number): Employee {
        return this.listEmployee.find(w => w.id === id);
    }

    save(employee: Employee) {
        if (employee.id === null) {
            const maxId = this.listEmployee.reduce(function(e1, e2){
                return (e1.id > e2.id) ? e1 : e2;
            }).id;
            employee.id = maxId +1;
            this.listEmployee.push(employee);
        } else {
            const foundIndex = this.listEmployee.findIndex(e => e.id === employee.id);
            this.listEmployee[foundIndex] = employee;
        }

    }
    deleteEmployee(id: number){
        const i =this.listEmployee.findIndex(e=> e.id === id);
        if( i !== -1){
            this.listEmployee.splice(i, 1);
        }
    }
}