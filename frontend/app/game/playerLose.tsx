import { Graphics, Text, Stage } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useCallback } from "react";
import { useLineStore } from "../zustand/linestore";
import { useGameStore } from "../zustand/gameStore";

export default function PlayerLose() {
	const setLinePosition = useLineStore((state) => state.setLinePosition);
	const setCollision = useGameStore((state) => state.setCollision);

	// Reset the game position when button is clicked
	const startOverGame = useCallback(() => {
		setLinePosition({
			x: 100,
			y: 100,
		});
		setCollision(false);
	}, [setLinePosition, setCollision]);

	// Draw the button using Graphics
	const drawButton = useCallback((g: PIXI.Graphics) => {
		g.clear();
		g.beginFill(0x0000ff); // Blue color
		g.drawRoundedRect(0, 0, 200, 60, 10); // x, y, width, height, borderRadius
		g.endFill();
		g.lineStyle(4, 0xffffff); // White border
		g.drawRoundedRect(0, 0, 200, 60, 10);
	}, []);

	return (
		<>
			{/* Button shape */}
			<Graphics
				draw={drawButton}
				interactive={true}
				buttonMode={true}
				x={300} // Position x
				y={250} // Position y
				pointerdown={startOverGame} // Event listener for click
			/>

			{/* Button text */}
			<Text
				text="Start Over"
				x={340} // Position text inside the button
				y={270}
				style={
					new PIXI.TextStyle({
						fill: "white",
						fontSize: 24,
						fontWeight: "bold",
					})
				}
			/>
		</>
	);
}
