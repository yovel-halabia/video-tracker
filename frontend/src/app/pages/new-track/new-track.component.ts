import {Component} from "@angular/core";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import Video from "src/assets/Interfaces/Video";
import Track from "src/assets/Interfaces/Track";
import {SearchVideoService} from "src/app/services/searchVideo.service";
import {TrackService} from "src/app/services/track.service";

@Component({
	selector: "app-new-track",
	templateUrl: "./new-track.component.html",
})
export class NewTrackComponent {
	videos: Video[] = [];
	isTypingTimeout!: number;
	resultsVideos: Video[] = [];
	submitted: boolean = false;
	editTrack!: Track;

	formGroup = new FormGroup({
		label: new FormControl("", [
			Validators.required,
			(control) => {
				const forbidden = this.trackService.tracks.filter((t) => t.label === control.value)[0]?.label;
				return forbidden && forbidden !== this.editTrack?.label ? {nameExist: forbidden} : null;
			},
		]),
		search: new FormControl("", () => (this.videos && !this.videos.length ? {noVideos: true} : null)),
	});

	constructor(
		private searchVideoService: SearchVideoService,
		private trackService: TrackService,
		activeroute: ActivatedRoute,
		private router: Router,
	) {
		if (activeroute.routeConfig?.path?.includes("edit-track")) {
			const matchTrack: Track | undefined = trackService.tracks.find((t) => t.id === Number(activeroute.snapshot.params["id"]));
			if (!matchTrack) {
				router.navigate(["/tracks"]);
				return;
			}

			this.editTrack = matchTrack;
			this.formGroup.controls["label"].setValue(matchTrack.label);
			this.videos = matchTrack.videos;
		}

		this.formGroup.controls["search"].valueChanges.subscribe((value) => {
			clearTimeout(this.isTypingTimeout);
			this.isTypingTimeout = window.setTimeout(() => {
				if (!value) {
					this.resultsVideos = [];
					return;
				}
				this.searchVideoService.searchForVideo(value || "").subscribe((videos) => {
					let existingVideos = [...this.videos].map((v) => v.videoUrl);
					videos = videos.filter((v) => !existingVideos.includes(v.videoUrl));
					this.resultsVideos = videos;
				});
			}, 300);
		});

		this.formGroup.valueChanges.subscribe(() => {
			this.submitted && (this.submitted = false);
		});
	}

	onClickOutsideSearch() {
		this.resultsVideos = [];
	}

	addVideo(video: Video) {
		this.videos.push(video);
		this.formGroup.controls["search"].setValue("");
	}

	deleteVideo(videoUrl: string) {
		this.formGroup.controls["search"].setValue(this.formGroup.controls["search"].value);
	}

	onSubmit() {
		this.submitted = true;
		if (!this.formGroup.valid) return;
		if (this.editTrack) {
			this.trackService.updateTrack({id: this.editTrack.id, label: this.formGroup.controls.label.value!, videos: this.videos}).subscribe();
			this.router.navigate(["/track/" + this.editTrack.id]);
			return;
		}
		this.trackService
			.addTrack({
				label: this.formGroup.controls.label.value!,
				imgUrl: this.videos[0].imgUrl,
				videos: this.videos,
			})
			.subscribe(() => {
				this.router.navigate(["/tracks"]);
			});
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
	}
}
