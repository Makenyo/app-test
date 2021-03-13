import { forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms'
import { Subscription } from 'rxjs';

export interface AddressFormValues {
  city: string;
  street: string;
  zipcode: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {
 
  form: FormGroup;

  subscriptions: Subscription[] = [];

  get value(): AddressFormValues {
    return this.form.value;
  }

  set value(value: AddressFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
 
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
 
  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false, }, };
  }
}