import Game from "./game/clientComponent";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-accent">
			<div className="mt-10">
				<Game />
			</div>
		</main>
	);
}
