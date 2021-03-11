import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Blogger } from '../models/blogger';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloggerServiceService {

  private urlAPI = "http://localhost:3000"; // URL to web api

  private readonly _bloggers = new BehaviorSubject<Blogger[]>([]);
  private readonly _blogger = new BehaviorSubject<Blogger>(null);

  readonly bloggers$ = this._bloggers.asObservable();
  readonly blogger$ = this._blogger.asObservable();

  constructor(
    // Private Variables
    private _http: HttpClient,
  ) {

  }

  get bloggers() {
    return this._bloggers.getValue()
  }

  set bloggers(value: Blogger[]) {
    this._bloggers.next(value)
  }

  get blogger() {
    return this._blogger.getValue()
  }

  set blogger(value: Blogger) {
    this._blogger.next(value)
  }

  async all() {
    this.bloggers = await this._http.get<Blogger[]>(`${this.urlAPI}/bloggers`).toPromise()
  }

  async get(id: string) {
    this.blogger = await this._http.get<Blogger>(`${this.urlAPI}/blogger/${id}`).toPromise()
  }

  update(value: Blogger) {
    return this._http.put<Blogger>(`${this.urlAPI}/blogger`, value)
  }

  create(value: Blogger) {
    return this._http.post<Blogger>(`${this.urlAPI}/blogger`, value)
  }

}
