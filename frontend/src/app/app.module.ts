import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./pages/login/login.component";
import {InputComponent} from "./components/input/input.component";
import {TracksComponent} from "./pages/tracks/tracks.component";
import {ButtonComponent} from "./components/button/button.component";
import {FontAwesomeModule, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faPlus, faTrashCan, faGripLines} from "@fortawesome/free-solid-svg-icons";
import {NewTrackComponent} from "./pages/new-track/new-track.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';

@NgModule({
	declarations: [AppComponent, LoginComponent, InputComponent, TracksComponent, ButtonComponent, NewTrackComponent, ClickedOutsideDirective],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FontAwesomeModule, DragDropModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(libary: FaIconLibrary) {
		libary.addIcons(faPlus, faTrashCan, faGripLines);
	}
}
