import {Component} from "@angular/core";
import {user} from "src/assets/mock";
import {Subscription} from "rxjs";
import {TrackService} from "src/app/services/track.service";
import Track from "src/assets/Interfaces/Track";

@Component({
	selector: "app-tracks",
	templateUrl: "./tracks.component.html",
	styleUrls: ["./tracks.component.css"],
})
export class TracksComponent {
	userName = user.userName;
	tracks: Track[];
	subscription: Subscription;

	constructor(private trackService: TrackService) {
		this.tracks = trackService.tracks;
		this.subscription = this.trackService.getTracks().subscribe((v) => (this.tracks = v));
	}

	DeleteTrack(id: number) {
		this.trackService.deleteTrack(id);
	}

	navigateToTrack(id: number) {
		//TODO: move to track page
	}

	onNewTrackClicked(): void {
		//TODO: move to new track page
	}
}
