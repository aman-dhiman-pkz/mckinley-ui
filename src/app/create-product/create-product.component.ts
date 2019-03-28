import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../home/product.service';
import { Urls } from '../../environments/environment';


@Component({
    selector: 'create-prduct',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.css'],
    providers: [ProductService]
})

export class CreateProductComponent {
    createProductForm: FormGroup;
    loading: boolean = false;
    @Output() hideModal = new EventEmitter();
    @Output() refershTable = new EventEmitter();
    images: any = [];
    url = Urls.url;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService
    ) {
        this.initializeForm();
    }


    private initializeForm() {
        this.createProductForm = this.formBuilder.group(
            {
                productname: [null, [Validators.required, Validators.minLength(1)]],
                productcategory: [null, [Validators.required, Validators.minLength(1)]],
                productsubcategory: [null, [Validators.required, Validators.minLength(1)]],
                productcost: [null, [Validators.required, Validators.minLength(1)]],
                productsizes: [null, [Validators.required, Validators.minLength(1)]],
                image: [null, [Validators.required]]
            });
    }

    submitForm() {
        this.loading = true;
        this.productService.createProduct({
            productname: this.createProductForm.controls['productname'].value,
            productcategory: this.createProductForm.controls['productcategory'].value,
            productsubcategory: this.createProductForm.controls['productsubcategory'].value,
            productcost: this.createProductForm.controls['productcost'].value,
            productsizes: this.createProductForm.controls['productsizes'].value,
            image: [...this.images]
        }).subscribe(data => {
            this.loading = false;
            this.hideModal.emit();
            this.refershTable.emit();
            alert('Sucessfully Added');
        }, error => {
            this.errorOccured(error);
        })
    }


    errorOccured(err) {
        this.loading = false;
        let message = 'Something Went wrong';
        try {
            message = JSON.parse(err).msg;
        } catch (err) {
            console.log(err, 'ETIM Password');
        }
        alert(message)
    }

    onFileChange(evt: any) {
        const formData = new FormData();
        formData.append("file", evt.target.files[0]);
        this.productService.uploadImage(formData).subscribe(data => {
            this.images.push(data._id);
            this.createProductForm.controls['image'].setValue('set');
        })
    }
}