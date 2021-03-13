import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent {
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: this._formBuilder.group({
        street: [''],
        zipcode: [''],
        city: [''],
      })
    })
  }

  public onSubmit(){
    console.log('Form:', this.form);
    console.log('Username:', this.form.get('username').value);
    console.log('City:', this.form.get('address.city').value);
    this.form.reset();
  }
}
