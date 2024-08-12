import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faPlus, faTrashCan, faGripLines, faCheck, faPen} from "@fortawesome/free-solid-svg-icons";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./pages/login/login.component";
import {InputComponent} from "./components/input/input.component";
import {TracksComponent} from "./pages/tracks/tracks.component";
import {ButtonComponent} from "./components/button/button.component";
import {NewTrackComponent} from "./pages/new-track/new-track.component";
import {ClickedOutsideDirective} from "./directives/clicked-outside.directive";
import {TrackComponent} from "./pages/track/track.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		InputComponent,
		TracksComponent,
		ButtonComponent,
		NewTrackComponent,
		ClickedOutsideDirective,
		TrackComponent,
	],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FontAwesomeModule, DragDropModule, YouTubePlayerModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(libary: FaIconLibrary) {
		libary.addIcons(faPlus, faTrashCan, faGripLines, faCheck, faPen);
	}
}
