import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.css']
})

export class ImageSliderComponent implements OnInit {
    @Input() slides: any = [];
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "arrows": true };
    ngOnInit() {
        // ...
        console.log(this.slides, 'ye hai raula');
    }

}