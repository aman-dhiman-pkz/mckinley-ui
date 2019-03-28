import { Component, Input } from '@angular/core';

@Component({
    selector: 'image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.css']
})

export class ImageSliderComponent {
    @Input() slides: any = [];
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "arrows": true };
   

}