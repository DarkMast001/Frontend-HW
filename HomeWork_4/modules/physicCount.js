export function calculateFallDistance(fallingTime) {
	const g = 9.8;
	return 0.5 * g * fallingTime * fallingTime;
}