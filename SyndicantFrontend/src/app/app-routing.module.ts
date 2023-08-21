import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGradComponent } from './components/add-grad/add-grad.component';
import { AddSyndicateComponent } from './components/add-syndicate/add-syndicate.component';
import { SyndicateAllocationComponent } from './components/syndicate-allocation/syndicate-allocation.component';
import { GradListComponent } from './components/grad-list/grad-list.component';

const routes: Routes = [
  { path: 'add-grad', component: AddGradComponent },
  { path: 'add-syndicate', component: AddSyndicateComponent },
  { path: 'syndicate-allocation', component: SyndicateAllocationComponent },
  { path: 'grad-list', component: GradListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
