import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {TrackService} from "src/app/services/track.service";
import Track from "src/assets/Interfaces/Track";

@Component({
	selector: "app-track",
	templateUrl: "./track.component.html",
	styleUrls: ["./track.component.css"],
})
export class TrackComponent {
	track!: Track;
	subscription!: Subscription;
	interval!: number;

	constructor(private trackService: TrackService, activeroute: ActivatedRoute, private router: Router) {
		const matchTrack: Track | undefined = trackService.tracks.find((t) => t.id === Number(activeroute.snapshot.params["id"]));
		if (!matchTrack) {
			router.navigate(["/tracks"]);
			return;
		}
		this.track = matchTrack;
		this.subscription = this.trackService.getTracks().subscribe((v) => {
			this.track = v.find((t: any) => t.id === Number(activeroute.snapshot.params["id"]));
		});
	}

	moveToVideo(videoId: string) {
		const videoIndex: number | undefined = this.track.videos.findIndex((v: any) => v.id === videoId);
		if (videoIndex === undefined) return;
		this.track = {...this.track, currentVideoIndex: videoIndex};
		this.trackService.updateTrack(this.track);
	}

	onVideoStateChange(e: any) {
		const videoIndex: number | undefined = this.track.videos.findIndex((v: any) => v.id === e.target.videoId);
		if (videoIndex === undefined) return;

		switch (e.data) {
			case 0: {
				//video finished
				this.track.videos[videoIndex] = {...this.track.videos[videoIndex], isDone: true, currentTime: 0};
				if (this.track.videos[videoIndex + 1]) this.track = {...this.track, currentVideoIndex: videoIndex + 1};
				this.trackService.updateTrack(this.track);
				this.trackService.calcTrackProgress(this.track.id);
				break;
			}
			case 1: {
				//video started
				if (this.interval) clearInterval(this.interval);
				this.interval = window.setInterval(() => {
					this.track.videos[videoIndex] = {...this.track.videos[videoIndex], currentTime: e.target.getCurrentTime()};
					this.trackService.updateTrack(this.track);
				}, 5000);
				break;
			}
			case 2: {
				//video stoped
				if (this.interval) clearInterval(this.interval);
				this.track.videos[videoIndex] = {...this.track.videos[videoIndex], currentTime: e.target.getCurrentTime()};
				this.trackService.updateTrack(this.track);
				break;
			}

			default:
				return;
		}
	}
}
