import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from "ngx-bootstrap/modal";
import { SlickCarouselModule } from 'ngx-slick-carousel';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RestApiCall } from './rest-api.service';
import { ImageSliderComponent } from './image-slider/image-slider.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateProductComponent,
    ImageSliderComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SlickCarouselModule
  ],
  providers:[RestApiCall],
  bootstrap: [AppComponent]
})
export class AppModule { }
