import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import Cookie from "src/assets/utils/cookie";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
})
export class AppComponent {
	constructor(private router: Router, private userService: UserService) {
		if (!Cookie.get("accessToken")) {
			router.navigate(["/login"]);
			return;
		}
		userService.getUser().subscribe({
			next: () => this.router.navigate(["/tracks"]),
			error: () => {
				Cookie.delete("accessToken");
				this.router.navigate(["/login"]);
			},
		});
	}
}
