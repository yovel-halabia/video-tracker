import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {TrackService} from "src/app/services/track.service";
import Track from "src/assets/Interfaces/Track";

@Component({
	selector: "app-track",
	templateUrl: "./track.component.html",
})
export class TrackComponent {
	track!: Track;
	interval!: number;

	constructor(private trackService: TrackService, private activeroute: ActivatedRoute, private router: Router) {
		const id = Number(this.activeroute.snapshot.params["id"]);
		const matchTrack = trackService.tracks.find((t) => t.id === id);
		if (!matchTrack) {
			this.router.navigate(["/tracks"]);
			return;
		}
		this.track = matchTrack;
		this.trackService.subject.subscribe((v) => {
			const matchTrack = v.find((t) => t.id === this.track.id);
			if (!matchTrack) return;
			this.track = matchTrack;
		});
	}

	moveToVideo(videoUrl: string) {
		const currentVideoIndex = this.track.videos.findIndex((v) => v.videoUrl === videoUrl);
		if (currentVideoIndex === this.track.currentVideoIndex) return;
		this.trackService.updateTrack({id: this.track.id, currentVideoIndex}).subscribe();
	}

	onVideoStateChange(e: any) {
		const videoUrl = e.target.videoId;
		const videoIndex = this.track.videos.findIndex((v) => v.videoUrl === videoUrl);
		if (videoIndex === undefined) return;

		switch (e.data) {
			case 0: {
				//video finished
				if (this.interval) clearInterval(this.interval);
				this.trackService.updateVideo({trackId: this.track.id, videoUrl, isDone: true, currentTime: 0}).subscribe();
				if (this.track.videos[videoIndex + 1]) this.trackService.updateTrack({id: this.track.id, currentVideoIndex: videoIndex + 1}).subscribe();
				break;
			}
			case 1: {
				//video started
				if (this.interval) clearInterval(this.interval);
				this.interval = window.setInterval(() => {
					this.trackService.updateVideo({trackId: this.track.id, videoUrl, currentTime: Math.ceil(e.target.getCurrentTime())}).subscribe();
				}, 5000);
				break;
			}
			case 2: {
				//video stoped
				if (this.interval) clearInterval(this.interval);
				this.trackService.updateVideo({trackId: this.track.id, videoUrl, currentTime: Math.ceil(e.target.getCurrentTime())}).subscribe();
				break;
			}

			default:
				return;
		}
	}
}
