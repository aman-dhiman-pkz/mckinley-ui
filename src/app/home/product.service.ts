import { Injectable } from '@angular/core';
import { URLSearchParams } from "@angular/http";
import { RestApiCall } from '../rest-api.service';
import { Urls } from '../../environments/environment';


@Injectable()
export class ProductService {

    constructor(private restApi: RestApiCall) {

    }

    getAllProducts() {
        let url = Urls.url + 'products';
        return this.restApi.get(url, null);
    }

    uploadImage(formData) {
        let url = Urls.url + 'upload/files';
        return this.restApi.postFormData(url, formData);
    }

    createProduct(data) {
        let url = Urls.url + 'products';
        return this.restApi.postWithApplication(url, data);
    }
}