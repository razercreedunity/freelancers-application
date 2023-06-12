import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FreelancerAddEditComponent } from './freelancer-add-edit/freelancer-add-edit.component';
import { FreelancerService } from './services/freelancer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'rowNumber',
    'username',
    'email',
    'phone_number',
    'skillsets',
    'hobby',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _freelancerService: FreelancerService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getFreelancerList();
  }

  openAddEditFreelancerForm() {
    const dialogRef = this._dialog.open(FreelancerAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFreelancerList();
        }
      },
    });
  }

  getFreelancerList() {
    this._freelancerService.getFreelancerList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFreelancer(id: number) {
    this._freelancerService.deleteFreelancer(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Freelancer Deleted!', 'Done');
        this.getFreelancerList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FreelancerAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFreelancerList();
        }
      },
    });
  }
}
