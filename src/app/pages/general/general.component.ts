import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
})
export class GeneralComponent {
  rfContact: any;
  rfContactUpdate: any;
  public listProduct: any[] = [];
  data: any[] = [];
  dataCategory: any;
  checkInfoUpdate = false;
  checkInfoCategory = false;
  token = localStorage.getItem('token');
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      name: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
    });
    this.rfContactUpdate = this.fb.group({
      name: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
    });
    this.checkInfoCategory = false;
    this.getListProduct();
    this.getData().subscribe((res) => {
      this.data = res.data;
      console.log(this.data);
    });
  }

  getListProduct() {
    if (typeof window !== 'undefined') {
      this.listProduct =
        JSON.parse(localStorage.getItem('listProduct') as string) || <any>[];
    }
  }

  onAdd() {
    this.getListProduct();
    if (this.rfContact.invalid) {
      console.log('Lỗi thêm sản phẩm');
      this.checkInfoCategory = true;
    } else {
      this.dataCategory = {
        name: this.rfContact.value.name,
        thumbnail: this.rfContact.value.thumbnail,
      };
      console.log(this.dataCategory);
      this.postData(this.dataCategory).subscribe((res) => {
        console.log(res);
      });
      window.location.reload();
      this.rfContact.reset();
    }
  }
  onDelete(id: any) {
    this.delData(id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }

  onUpdate(id:any){
    
    this.updateData(id).subscribe((res)=>{
      console.log(res);
    })
  }

  updateData(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.post(
      'http://localhost:8080/api/v1/admin/category/update',
      {
        headers: headers,
      }
    );
  }

  delData(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.delete<any>(
      'http://localhost:8080/api/v1/admin/category/delete?id=' + id,
      { headers: headers }
    );
  }

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.post<any>(
      'http://localhost:8080/api/v1/admin/category/create',
      data,
      {
        headers: headers,
      }
    );
  }
  getData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.get<any>(
      'http://localhost:8080/api/v1/admin/category/list',
      {
        headers: headers,
      }
    );
  }
}
