import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloggerComponent } from './components/blogger/blogger.component';
import { BloggersComponent } from './components/bloggers/bloggers.component';

const routes: Routes = [
  {
    path: '',
    component: BloggersComponent
  },
  {
    path: 'bloggers',
    component: BloggersComponent
  },
  {
    path: 'blogger/{id}',
    component: BloggerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
