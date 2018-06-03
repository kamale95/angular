import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
import { ListService } from './list.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: '', pathMatch: 'full', redirectTo: '/list' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UpdateComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
