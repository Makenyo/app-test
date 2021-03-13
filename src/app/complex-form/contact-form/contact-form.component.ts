import { forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms'
import { Subscription } from 'rxjs';

export interface ContactFormValues {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContactFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements ControlValueAccessor, OnDestroy {
 
  form: FormGroup;

  subscriptions: Subscription[] = [];

  get value(): ContactFormValues {
    return this.form.value;
  }

  set value(value: ContactFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
 
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      firstName: [],
      lastName: []
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