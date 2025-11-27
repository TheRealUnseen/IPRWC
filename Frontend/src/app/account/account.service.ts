import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {Login} from './models/login';
import {SHA3} from "sha3";
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public accountType$: Subject<string> = new BehaviorSubject<string>('');
  private readonly SESSION_STORAGE_JWTTOKEN:string = "jwtToken";
  private readonly apiUrl: string = environment.apiUrl + '/account';

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {  }

  public async register(account: Login): Promise<boolean> {
    account.setPassword(this.hashPassword(account.getPassword()));

    const httpHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080/api/account/register/*"
    }
    const url: string = this.apiUrl + "/register";
    const response: Response = await fetch(url, { method: 'POST', body: JSON.stringify(account), headers: httpHeaders});

    if (response.status === 409) {
      this.toastrService.error("An account with this email already exists!");
      return false;
    }

    if (!response.ok) {
      this.toastrService.error("Er is iets fout gegaan! Status: " + response.status);
      return false;
    }

    return this.saveLoginDetails(await response.text());
  }

  public async login(account: Login): Promise<boolean> {
    account.setPassword(this.hashPassword(account.getPassword()));

    const httpHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    const url: string = this.apiUrl + "/login";
    const response: Response = await fetch(url, { method: 'POST', body: JSON.stringify(account), headers: httpHeaders});

    if (response.status === 401) {
      this.toastrService.error("Ongeldige e-mail of wachtwoord. Controleer je gegevens en probeer het opnieuw.");
      return false;
    }

    if (!response.ok) {
      this.toastrService.error("Er is iets fout gegaan! Status: " + response.status);
      return false;
    }

    return this.saveLoginDetails(await response.text());
  }

  public async getAccountType(): Promise<void> {
    if(window.sessionStorage.getItem("jwtToken")) {
      const httpHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Authorization": "Bearer " + window.sessionStorage.getItem("jwtToken")
      }
      const url: string = this.apiUrl + "/type";
      const response: Response = await fetch(url, { method: 'GET', headers: httpHeaders});
      const type = await response.text();
      this.accountType$.next(type);
    }
  }

  public logout(): void {
    window.sessionStorage.removeItem(this.SESSION_STORAGE_JWTTOKEN);
    this.accountType$.next("");
  }

  public isLoggedIn(): boolean {
    const loggedIn: string | null = window.sessionStorage.getItem(this.SESSION_STORAGE_JWTTOKEN);
    return loggedIn !== null ? true : false;
  }

  private async saveLoginDetails(token: string): Promise<boolean> {
    window.sessionStorage.setItem(this.SESSION_STORAGE_JWTTOKEN, token);
    return true;
  }

  private hashPassword(password: string): string {
    const hash = new SHA3(512);

    hash.update(password);
    const result: string = hash.digest({format: 'hex' });
    return result.toUpperCase();
  }
}
