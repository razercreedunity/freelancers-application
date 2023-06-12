import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { FreelancerService } from '../services/freelancer.service';

@Component({
  selector: 'app-freelancer-add-edit',
  templateUrl: './freelancer-add-edit.component.html',
  styleUrls: ['./freelancer-add-edit.component.scss'],
})
export class FreelancerAddEditComponent implements OnInit {
  freelancerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _freelancerService: FreelancerService,
    private _dialogRef: MatDialogRef<FreelancerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.freelancerForm = this._fb.group({
      username: ['', [Validators.required]], // Add required validator
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      skillsets: ['', [Validators.required]],
      hobby: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.freelancerForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.freelancerForm.valid) {
      if (this.data) {
        this._freelancerService
          .updateFreelancer(this.data._id, this.freelancerForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Freelancer Details Updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Email Already Exist");
            },
          });
      } else {
        this._freelancerService.addFreelancer(this.freelancerForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Freelancer Added Successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Email Already Exist");
          },
        });
      }
    }
  }
}
