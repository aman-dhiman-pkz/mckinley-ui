import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Urls } from '../../environments/environment';
import { ProductService } from './product.service';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ProductService]
})

export class HomeComponent {
    bsModalRef: BsModalRef;
    products: any = [];
    selectedItem: any;
    url = Urls.url;
    public modalconfig = {
        ignoreBackdropClick: true
    };
    constructor(
        private modalService: BsModalService,
        private productService: ProductService
    ) {
        this.getProducts();
    }

    openModal(template) {
        this.bsModalRef = this.modalService.show(template, this.modalconfig);
    }

    hideModal() {
        this.bsModalRef.hide();
    }

    onFileChange(evt: any) {
        const formData = new FormData();
        formData.append("file", evt.target.files[0]);
        this.productService.uploadImage(formData).subscribe(data => {
            console.log(data, 'upload Image');
        })
    }

    getProducts() {
        this.productService.getAllProducts().subscribe(data => {
            console.log(data, 'njn')
            this.products = data;
        })
    }

    openImageSlider(template, item) {
        this.selectedItem = item;
        this.openModal(template);
    }

    convertToUrl(arr = []) {
        return arr.map(item => this.url + 'download/files/' + item);
    }
}