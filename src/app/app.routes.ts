import { Routes } from '@angular/router';
import { BookComponent } from './book/book/book.component';

export const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full', },
    {path: '', component: BookComponent},
];
