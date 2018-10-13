import { CanDeactivate } from "@angular/router";
import { CreateEmployeesComponent } from "./create-employees.component";
import { Injectable } from "@angular/core";

// after create this service we have to add as provider to app.module.ts and inside this file define it in RouterModule

//CanDeactivate dose not work when user refrase page or change url and press enter or close a window
@Injectable()
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeesComponent>{
    canDeactivate(component: CreateEmployeesComponent): boolean {
        if(component.createEmployeeForm.dirty){
            return confirm('Are you sure you want to discard your changes?');
        }
        return true;
    }
}