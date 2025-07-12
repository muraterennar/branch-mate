import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  constructor(private httpClient: HttpClient) {}

  getBranches(username: string, repositoryName: string) {
    const url = `https://api.github.com/repos/${username}/${repositoryName}/branches`;
    return this.httpClient.get(url);
  }

  getRepositories(username: string) {
    const url = `https://api.github.com/users/${username}/repos`;
    return this.httpClient.get(url);
  }

  getCommits(username: string, repositoryName: string, branchName: string) {
    const url = `https://api.github.com/repos/${username}/${repositoryName}/commits?sha=${branchName}`;
    return this.httpClient.get(url);
  }
}
