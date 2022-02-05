<script lang="ts">
import { Fireworks } from 'fireworks-js';
import { onMount } from 'svelte';

let container: HTMLElement;
let fireworks: Fireworks;
onMount(() => {
	container = document.getElementById('container');
	fireworks = new Fireworks(container, {
		rocketsPoint: 50,
		hue: { min: 0, max: 360 },
		delay: { min: 5, max: 30 },
		speed: 2,
		acceleration: 1.05,
		friction: 0.95,
		gravity: 1.5,
		particles: 100,
		trace: 3,
		explosion: 10,
		autoresize: true,
		brightness: { 
		min: 50, 
		max: 80,
			decay: { min: 0.015, max: 0.03 }
		},
		mouse: { 
			click: false, 
			move: false, 
			max: 3 
		},
		boundaries: { 
			x: 50, 
			y: 50, 
			width: container.clientWidth, 
			height: container.clientHeight 
		}
	});
});
export function fire(): void {
	fireworks.start();
}
export function stop(): void {
	fireworks.stop();
}
</script>

<div id="container"/>

<style>
#container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}
</style>