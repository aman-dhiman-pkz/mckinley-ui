import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";


@Injectable()
export class RestApiCall {


    constructor(private http: Http) {
    }

	/**
	 *  Make an api call for fetching stats from the url
	 *@returns {Observable<R>} returns Observable
	 */
    get(url, params): Observable<any> {
        let headers = new Headers();

        if (params == null) {
            return this.http.get(url, { headers: headers })
                .map(this.extractData.bind(this))
                .catch(this.handleError.bind(this));
        } else {
            return this.http.get(url, { search: params, headers: headers })
                .map(this.extractData.bind(this))
                .catch(this.handleError.bind(this));
        }
    }


    postWithApplication(url, body): Observable<any> {
        // must to add body in requestOptions, not able to read from body on backend
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, body: body });

        return this.http.post(url, {}, options)
            .map(this.extractData.bind(this))
            .catch(this.handleError.bind(this));
    }

    postFormData(url, data): Observable<any> {
        // must to add body in requestOptions, not able to read from body on backend
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, data)
            .map(this.extractData.bind(this))
            .catch(this.handleError.bind(this));
    }



	/**
	 * In case of error in http it's get called to handle error throws error Observable
	 * @param error error response
	 * @returns {ErrorObservable}
	 */
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        let body;
        if (error instanceof Response) {
            try {

                body = error.json() || '';
                body.status = error.status;
                const err = JSON.stringify(body);
                errMsg = `${err}`;
            } catch (err) {
                errMsg = 'Some Thing Went Wrong';
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    /**
	 * @description extracts the data from observable
	 * @param res Response of http
	 * @returns {any|{}} return body if null returns blank object
	 */
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

}//service-closes
