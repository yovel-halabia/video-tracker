import {Injectable} from "@angular/core";
import {Observable, tap, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import Track, {TrackToEdit} from "../../assets/Interfaces/Track";
import Video, {VideoToEdit} from "src/assets/Interfaces/Video";
import {environment} from "src/environments/environment";
import HttpOptions from "src/assets/utils/HttpOptions";
import {AlertService} from "./alert.service";

@Injectable({
	providedIn: "root",
})
export class TrackService {
	private baseUrl = environment.baseUrl + "/track";
	public tracks: Track[] = [];
	public subject = new Subject<Track[]>();

	constructor(private userService: UserService, private http: HttpClient, private alertService: AlertService) {
		this.tracks = userService.user?.tracks;
		this.userService.subject.subscribe((user) => {
			this.tracks = user.tracks;
			this.subject.next(this.tracks);
		});
	}

	private calcProgress(track: Track): number | null {
		const progress = Math.ceil(track.videos.length ? (track.videos.filter((v) => v.isDone).length / track.videos.length) * 100 || 0 : 0);
		if (progress !== track.progress) return progress;
		return null;
	}

	deleteTrack(trackId: number): Observable<any> {
		const prevTracks = this.tracks;
		this.tracks = this.tracks.filter((t) => t.id !== trackId);
		this.subject.next(this.tracks);
		return this.http.get(`${this.baseUrl}/delete/${trackId}`, HttpOptions()).pipe(
			tap({
				error: (err) => {
					this.alertService.show(err.error);
					this.tracks = prevTracks;
					this.subject.next(this.tracks);
				},
			}),
		);
	}

	updateTrack(updates: TrackToEdit): Observable<any> {
		const prevTracks = this.tracks;
		const index = this.tracks.findIndex((t) => t.id === updates.id);
		this.tracks[index] = {...this.tracks[index], ...updates, progress: this.calcProgress(this.tracks[index]) || this.tracks[index].progress};
		this.subject.next(this.tracks);

		return this.http.post(`${this.baseUrl}/edit`, updates, HttpOptions()).pipe(
			tap({
				error: (err) => {
					this.alertService.show(err.error);
					this.tracks = prevTracks;
					this.subject.next(this.tracks);
				},
			}),
		);
	}

	updateVideo(updates: VideoToEdit): Observable<any> {
		const prevTracks = this.tracks;
		const trackIndex = this.tracks.findIndex((t) => t.id === updates.trackId);
		const videoIndex = this.tracks[trackIndex].videos.findIndex((v) => v.videoUrl === updates.videoUrl);
		this.tracks[trackIndex].videos[videoIndex] = {...this.tracks[trackIndex].videos[videoIndex], ...updates};
		this.subject.next(this.tracks);

		const progress = this.calcProgress(this.tracks[trackIndex]);
		if (progress !== null) this.updateTrack({id: this.tracks[trackIndex].id, progress}).subscribe();

		return this.http.post(`${this.baseUrl}/edit-video`, updates, HttpOptions()).pipe(
			tap({
				error: (err) => {
					this.alertService.show(err.error);
					this.tracks = prevTracks;
					this.subject.next(this.tracks);
				},
			}),
		);
	}

	addTrack(body: {label: string; imgUrl: string; videos: Video[]}): Observable<number> {
		return this.http.post<number>(`${this.baseUrl}/add`, body, HttpOptions()).pipe(
			tap({
				next: (trackId) => {
					const track: Track = {
						id: trackId,
						label: body.label,
						imgUrl: body.imgUrl,
						videos: body.videos,
						progress: 0,
						currentVideoIndex: 0,
					};
					this.tracks.push(track);
					this.subject.next(this.tracks);
				},
				error: (err) => {
					this.alertService.show(err.error);
				},
			}),
		);
	}
}
