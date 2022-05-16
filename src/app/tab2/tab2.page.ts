import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cityLabel = 'City';
  postalCodeLabel = 'ZIP';
  stateVisible = true;
  addressForm = this.fb.group({
    city: '',
    country: 'US',
    state: '',
    postalCode: '',
    cityFixed: '',
    stateFixed: '',
    postalCodeFixed: ''
  });

  private destroyed$ = new Subject();

  constructor(private fb: FormBuilder /*, private cdr: ChangeDetectorRef, private zone: NgZone */) {
  }

  ionViewDidEnter() {
    // Comment this to use the ionChange event instead of watching changes on the formControl
    this.addressForm.get('country').valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        // tried running inside ngZone without any luck
        // this.zone.run(() => {
          this.changeLabels(value);
        // });
      });
  }

  changeLabels(value: string) {
    switch (value) {
      case 'US':
        this.cityLabel = 'City';
        this.postalCodeLabel = 'ZIP';
        this.stateVisible = true;
        break;
      case 'IE':
        this.cityLabel = 'City / Town';
        this.postalCodeLabel = 'Post Code';
        this.stateVisible = false;
        break;
      case 'CA':
        this.cityLabel = 'Town / City';
        this.postalCodeLabel = 'Province / Territory';
        this.stateVisible = false;
        break;
    }

    // tried push change detection without any luck
    // this.cdr.detectChanges();
  }

  onCountryChange() {
    // uncomment this to use the ionChange event instead of watching changes on the formControl
    // this.changeLabels(this.addressForm.get('country').value);
  }

  ionViewWillLeave() {
    this.destroyed$.next();
  }
}
