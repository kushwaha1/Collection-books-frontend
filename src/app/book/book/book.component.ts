import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteConfirmService } from '../../shared/delete-confirm/delete-confirm.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  public form: FormGroup;
  allBooks: any = [];
  book: any;
  submitted: boolean;
  bookData: Book;
  showAddTaskButton: boolean = true;
  showUpdateTaskButton: boolean;
  
  public myContent: any;
  // searchText: string;
  id: any;
  constructor(
    public bookService: BookService,
    public toastr: ToastrService,
    public router: Router,
    private formBuilder: FormBuilder,
    private confirmDialogService: DeleteConfirmService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.form = this.formBuilder.group({
      id: [''],
      title: ['',Validators.required],
      author: ['',Validators.required],
      description: ['',Validators.required],
      publicationYear: [0, Validators.required],
      ISBN: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getBooks(search: string = '') {
    this.bookService
      .getAll()
      .subscribe((result: any) => {
        this.allBooks = result.data;
        console.log('this.allBooks', this.allBooks);
      });
  }

  addBook() {
    console.log('sdfs')
    this.submitted = true;
    const jsonArray = {
      title: this.form.value.title,
      author: this.form.value.author,
      description: this.form.value.description,
      publicationYear: this.form.value.publicationYear,
      ISBN: this.form.value.ISBN
    }
    if (!this.form.valid) {
      return
    }
    console.log('jsonArray', jsonArray)
      this.bookService.create(jsonArray).subscribe((result: any) => {
        if (result) {
          setTimeout(() => {
            this.submitted = false;
            this.form.reset();
            this.toastr.success('', 'Book Added successfully');
            this.getBooks();
            this.showAddTaskButton = true;
            this.showUpdateTaskButton = false;
          }, 50)
        } else {
          this.toastr.error('error', result.message);
        }
      }),
      (err: any) => {
        this.toastr.error('error', err.error.message);
      }
    
  }

  viewBook(ISBN: any) {
    this.bookService
      .getByISBN(ISBN)
      .subscribe((result: any) => {
        this.book = result.data[0];
        this.showAddTaskButton = false;
        this.showUpdateTaskButton = false;
        this.form.patchValue(result.data[0]);
      });
      
  }

  updateBook() {
    const jsonArray = {
      title: this.form.value.title,
      author: this.form.value.author,
      description: this.form.value.description,
      publicationYear: this.form.value.publicationYear,
      ISBN: this.form.value.ISBN
    }
      this.bookService.update(jsonArray.ISBN, jsonArray).subscribe(result => {
        if (result) {
          setTimeout(() => {
            this.toastr.success('', 'Book Updated Successfully');
            this.getBooks();
            this.form.patchValue({
              status: true
            })
            this.form.reset();
            this.showAddTaskButton = true;
            this.showUpdateTaskButton = false;
          }, 50)
        } else {
          this.toastr.error('error', result.message);
        }
      },
        (err: any) => {
          this.toastr.error('error', err.error.message);
        }
      )
  }

  deleteBook(ISBN: any) {
    this.confirmDialogService.confirmThis('', 'Do you want to delete the book detail ?')
      .then((confirmed) => {
        if (confirmed) {
          this.bookService.delete(ISBN).subscribe((res) => {
            this.toastr.success('success', "Employee Deleted Successfully");
            this.getBooks();
          },
            err => {
              this.toastr.error('error', 'Some error occured');
            })
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getEditDetail(data: any) {
    this.showAddTaskButton = false;
    this.showUpdateTaskButton = true;
    this.form.patchValue(data);
  }

  cancel() {
    this.submitted = false;
    this.form.reset();
    this.showAddTaskButton = true;
    this.showUpdateTaskButton = false;
  }
}
