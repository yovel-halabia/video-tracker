export default function (): number {
	return Number(new Date().getTime().toString().slice(5));
}
