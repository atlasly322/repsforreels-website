import { WebHaptics } from 'web-haptics';
import type { HapticInput } from 'web-haptics';

let instance: WebHaptics | null = null;

function getHaptics() {
	if (!instance) {
		instance = new WebHaptics();
	}
	return instance;
}

export function haptic(node: HTMLElement, pattern: HapticInput = 'success') {
	const handler = () => {
		getHaptics().trigger(pattern);
	};
	node.addEventListener('click', handler);
	return {
		destroy() {
			node.removeEventListener('click', handler);
		}
	};
}
