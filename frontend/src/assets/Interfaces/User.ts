import Track from "./Track";

export default interface User {
	id: number;
	userName: string;
	tracks: Track[];
}
