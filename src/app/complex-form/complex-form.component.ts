import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent {

    form: FormGroup;
 
    constructor(private _formBuilder: FormBuilder) {
      this.form = this._formBuilder.group({
        contact: [],
        address: [],
      });
    }

    onSubmit() {
      console.log('Form Object:', this.form);
      console.log('Contact Object:', this.form.get('contact'));
      console.log('First Name Value:', this.form.get('contact').value?.firstName);
    }
}