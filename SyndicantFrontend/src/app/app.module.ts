import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddGradComponent } from './components/add-grad/add-grad.component';
import { AddSyndicateComponent } from './components/add-syndicate/add-syndicate.component';
import { SyndicateAllocationComponent } from './components/syndicate-allocation/syndicate-allocation.component';
import { GradListComponent } from './components/grad-list/grad-list.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddGradComponent,
    AddSyndicateComponent,
    SyndicateAllocationComponent,
    GradListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
