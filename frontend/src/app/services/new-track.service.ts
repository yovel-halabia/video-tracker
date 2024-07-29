import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import Video from "src/assets/Interfaces/Video";
import {videos} from "src/assets/mock";

@Injectable({
	providedIn: "root",
})
export class NewTrackService {
	public videos: Video[] = [];
	public videosSubject = new Subject();

	public resultsVideos: Video[] = [];
	public resultsVideosSubject = new Subject();

	constructor() {}

	init() {
		this.videos = [];
		this.resultsVideos = [];
		this.videosSubject.next([]);
		this.resultsVideosSubject.next([]);
	}

	getVideos(): Observable<any> {
		return this.videosSubject.asObservable();
	}

	getResultsVideos(): Observable<any> {
		return this.resultsVideosSubject.asObservable();
	}

	searchForVideo(v: string = "") {
		this.resultsVideos = v ? videos : [];
		this.resultsVideosSubject.next(this.resultsVideos);
	}

	addVideo(video: Video) {
		this.videos.push(video);
		this.videosSubject.next(this.videos);
		this.searchForVideo();
	}

	deleteVideo(id: string) {
		this.videos = this.videos.filter((v) => v.id !== id);
		this.videosSubject.next(this.videos);
	}
}
