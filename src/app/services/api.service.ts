import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError,Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getUserAvatar(githubUsername: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string):Observable<any[]> {
    const url= `https://api.github.com/users/${githubUsername}/repos`;
    return this.httpClient.get <any[]>(url);
  }
  getUserRepositories(githubUsername: string): Observable<any> {
    const url = `https://api.github.com/users/${githubUsername}`;
    return this.httpClient.get<any>(url);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
