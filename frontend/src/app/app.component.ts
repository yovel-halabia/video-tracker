import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import Cookie from "src/assets/utils/Cookie";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
})
export class AppComponent {
	public isLoading: boolean = false;

	constructor(router: Router, userService: UserService) {
		if (!Cookie.get("accessToken")) {
			router.navigate(["/login"]);
			return;
		}
		this.isLoading = true;
		userService.getUser().subscribe({
			next: () => {
				if (!router.url.includes("track")) router.navigate(["/tracks"]);
				this.isLoading = false;
			},
			error: () => {
				Cookie.delete("accessToken");
				router.navigate(["/login"]);
				this.isLoading = false;
			},
		});
	}
}
