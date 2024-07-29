import {Component} from "@angular/core";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from "@angular/forms";
import {Subscription} from "rxjs";
import Video from "src/assets/Interfaces/Video";
import {NewTrackService} from "src/app/services/new-track.service";
import {TrackService} from "src/app/services/track.service";

@Component({
	selector: "app-new-track",
	templateUrl: "./new-track.component.html",
	styleUrls: ["./new-track.component.css"],
})
export class NewTrackComponent {
	videos: Video[];
	videosSubscription: Subscription;
	resultsVideos: Video[] = [];
	resultsVideosSubscription: Subscription;
	submitted: boolean = false;

	newTrackFormGroup = new FormGroup({
		label: new FormControl("", [Validators.required, this.validateLabel()]),
		search: new FormControl("", this.validateSearch()),
	});

	constructor(private newTrackService: NewTrackService, private trackService: TrackService, private router: Router) {
		this.videos = newTrackService.videos;
		this.videosSubscription = this.newTrackService.getVideos().subscribe((v) => (this.videos = v));
		this.resultsVideos = newTrackService.resultsVideos;
		this.resultsVideosSubscription = this.newTrackService.getResultsVideos().subscribe((v) => (this.resultsVideos = v));

		this.newTrackFormGroup.controls["search"].valueChanges.subscribe((value) => {
			newTrackService.searchForVideo(value || "");
		});

		this.newTrackFormGroup.valueChanges.subscribe(() => {
			this.submitted && (this.submitted = false);
		});
	}

	validateLabel(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const forbidden = this.trackService.tracks.filter((t) => t.label === control.value);
			return forbidden.length ? {nameExist: forbidden[0].label} : null;
		};
	}

	validateSearch(): ValidatorFn {
		return (): ValidationErrors | null => {
			return this.videos && !this.videos.length ? {noVideos: true} : null;
		};
	}

	onClickOutsideSearch() {
		this.newTrackService.searchForVideo();
	}

	addVideo(video: Video) {
		this.newTrackService.addVideo(video);
		this.newTrackFormGroup.controls["search"].setValue("");
	}

	deleteVideo(id: string) {
		this.newTrackService.deleteVideo(id);
		this.newTrackFormGroup.controls["search"].setValue(this.newTrackFormGroup.controls["search"].value);
	}

	onSubmit() {
		this.submitted = true;
		if (!this.newTrackFormGroup.valid) return;
		this.trackService.addTrack({
			label: this.newTrackFormGroup.controls.label.value || "",
			videos: this.videos,
		});
		this.newTrackService.init();
		this.router.navigate(["/tracks"]);
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
	}
}
