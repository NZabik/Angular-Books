import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { UserComponent } from './components/user/user.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { EditAuthorComponent } from './components/edit-author/edit-author.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AuthGuard } from './auth.guard';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'books', component: BooksComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'login', component: UserComponent},
  {path: 'addBook', canActivate: [AuthGuard], component: AddBookComponent},
  {path: 'addAuthor', canActivate: [AuthGuard], component: AddAuthorComponent},
  {path: 'editAuthor/:id', canActivate: [AuthGuard], component: EditAuthorComponent},
  {path: 'editBook/:id', canActivate: [AuthGuard], component: EditBookComponent},
  {path: 'register', component: UserRegistrationComponent},
  {path: '**', redirectTo: '/'}

];
