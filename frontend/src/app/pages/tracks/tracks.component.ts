import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {TrackService} from "src/app/services/track.service";
import {UserService} from "src/app/services/user.service";
import Track from "src/assets/Interfaces/Track";

@Component({
	selector: "app-tracks",
	templateUrl: "./tracks.component.html",
})
export class TracksComponent {
	userName = "";
	tracks: Track[];
	showMore: boolean = false;

	constructor(private trackService: TrackService, private userService: UserService, private router: Router) {
		this.userName = this.userService.user?.userName || "";
		this.tracks = trackService.tracks || [];
		this.trackService.subject.subscribe((v) => (this.tracks = v));
		this.userService.subject.subscribe((v) => (this.userName = v.userName));
	}

	setShowMore(): void {
		this.showMore = !this.showMore;
	}

	logOut(): void {
		this.userService.logout().subscribe({
			next: () => this.router.navigate(["/login"]),
			error: () => {
				this.router.navigate(["/login"]);
			},
		});
	}

	onClickOutSide(): void {
		this.showMore = false;
	}

	DeleteTrack(trackId: number) {
		this.trackService.deleteTrack(trackId).subscribe();
	}
}
