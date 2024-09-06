import type * as PIXI from "pixi.js";
import { Graphics } from "@pixi/react";

export function DrawBoundingBox({ rect }: { rect: PIXI.Rectangle }) {
	return (
		<Graphics
			draw={(g) => {
				g.clear();
				g.lineStyle(2, 0xff0000, 1); // Red outline for the bounding box
				g.drawRect(rect.x, rect.y, rect.width, rect.height);
			}}
		/>
	);
}
