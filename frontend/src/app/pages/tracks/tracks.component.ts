import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {user} from "src/assets/mock";
import {Subscription} from "rxjs";
import {TrackService} from "src/app/services/track.service";
import {UserService} from "src/app/services/user.service";
import Track from "src/assets/Interfaces/Track";

@Component({
	selector: "app-tracks",
	templateUrl: "./tracks.component.html",
})
export class TracksComponent {
	userName = user.userName;
	tracks: Track[];
	subscription: Subscription;
	showMore: boolean = false;

	constructor(private trackService: TrackService, private userService: UserService, private router: Router, private cookie: CookieService) {
		this.tracks = trackService.tracks;
		this.subscription = this.trackService.getTracks().subscribe((v) => (this.tracks = v));
	}

	setShowMore(): void {
		this.showMore = !this.showMore;
	}

	logOut(): void {
		this.userService.logout().subscribe({
			next: () => this.router.navigate(["/login"]),
			error: () => {
				this.cookie.delete("accessToken");
				this.router.navigate(["/login"]);
			},
		});
	}

	DeleteTrack(id: number) {
		this.trackService.deleteTrack(id);
	}
}
