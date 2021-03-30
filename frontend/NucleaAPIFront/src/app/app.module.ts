import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { FooterComponent } from './partials/footer/footer.component';
import {ApiTextService} from './services/api-text.service';
import {GoogleAnalyzerService} from './services/google-analyzer.service';
import { HttpClientModule } from '@angular/common/http'; 
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {AlertasService} from './services/alertas.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
  ],
  providers: [
    ApiTextService,
    GoogleAnalyzerService,
    AuthService,
    AlertasService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
