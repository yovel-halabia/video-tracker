import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {CookieService} from "ngx-cookie-service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
})
export class AppComponent {
	constructor(private router: Router, private userService: UserService, private cookie: CookieService) {
		if (!this.cookie.get("accessToken")) {
			router.navigate(["/login"]);
			return;
		}
		userService.getUser().subscribe({
			next: () => this.router.navigate(["/tracks"]),
			error: () => {
				this.cookie.delete("accessToken");
				this.router.navigate(["/login"]);
			},
		});
	}
}
