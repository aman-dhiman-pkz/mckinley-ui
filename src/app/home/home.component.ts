import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Urls } from '../../environments/environment';
import { ProductService } from './product.service';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ProductService]
})

export class HomeComponent implements OnInit {
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

    }

    ngOnInit() {
        this.getProducts();
    }

    openModal(template) {
        this.bsModalRef = this.modalService.show(template, this.modalconfig);
    }

    hideModal() {
        this.bsModalRef.hide();
    }

    getProducts() {
        this.productService.getAllProducts().subscribe(data => {
            this.products = data;
        }, err => {
            let message = 'Something Went wrong';
            try {
                message = JSON.parse(err).msg;
            } catch (err) {
                console.log(err, 'ETIM Password');
            }
            alert(message);
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