import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap, Subject} from "rxjs";
import {environment} from "src/environments/environment";
import Cookie from "src/assets/utils/Cookie";
import User from "src/assets/Interfaces/User";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private baseUrl = environment.baseUrl + "/user";
	public user!: User;
	public subject = new Subject<User>();
	constructor(private http: HttpClient) {}

	public login(body: {email: string; password: string; userName?: string}): Observable<User> {
		const isLogin = body.userName ? false : true;
		if (isLogin) delete body.userName;

		return this.http.post<User>(`${this.baseUrl}/${isLogin ? "login" : "register"}`, body, {withCredentials: true}).pipe(
			tap({
				next: (user) => {
					this.addUser(user);
				},
			}),
		);
	}

	public logout(): Observable<any> {
		return this.http.get(`${this.baseUrl}/logout`, {withCredentials: true}).pipe(tap({error: () => Cookie.delete("accessToken")}));
	}

	public getUser(): Observable<User> {
		return this.http.get<User>(`${this.baseUrl}/get-user`, {withCredentials: true}).pipe(
			tap({
				next: (user) => {
					this.addUser(user);
				},
			}),
		);
	}

	private addUser(user: User): void {
		this.user = user;
		this.subject.next(this.user);
	}
}
