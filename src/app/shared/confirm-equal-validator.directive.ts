import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]
})
export class ConfirmEqualValidatorDirective implements Validator{
    validate(passwordGoupd: AbstractControl):{[key: string]: any} | null{
        //control.parent goes to root of our control = Form then find appConfirmEqualValidator="password"
        const passwordField= passwordGoupd.get('password');
        const confirmPasswordField= passwordGoupd.get('confirmPassword');
        //if fetched value from control.parent s not equal to our control value then return notEqual: true
        if(passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value){
            return { 'notEqual': true};
        }
        return null;
    }
}