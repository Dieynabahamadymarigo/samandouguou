import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogRecettesService {

  url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // methode pour ajouter blog
  createBlog (blog:any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    console.log('client', blog)
    return accessToken ?
    this.http.post<any>('http://127.0.0.1:8000/api/createCategorieBlog',blog, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

  // methode pour ajouter blog
  createArticle (article:any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    console.log('client', article)
    return accessToken ?
    this.http.post<any>('http://127.0.0.1:8000/api/createPost',article, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

  // liste blog
  listerBlog(): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.get(`http://127.0.0.1:8000/api/indexCategorieBlog`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

  // liste blog
  listerAticle(): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.get(`http://127.0.0.1:8000/api/indexPost`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

  // modifier article
  updateArticle(id: number, article:any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
      return accessToken ?
        this.http.post<any>(`http://127.0.0.1:8000/api/updatePost/${id}`, article, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) : of(null);}

  // supprime blog
  deleteBlog(id:number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.delete(`http://127.0.0.1:8000/api/supprimerCategorieBlog`+ id, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

  // supprime un article
  deleteArticle(id:number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.delete(`http://127.0.0.1:8000/api/deletePost/`+ id, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }


}




