import Timer from './Timer.js';
import {loadItemManager} from './loaders.js';
import EEjs from './EE.js';

window.focus();

async function main() {
    const itemManager = await loadItemManager();
    const ee = new EEjs(document.getElementById('screen'));
    const timer = new Timer();
	timer.update = ee.update.bind(ee);
    timer.play();
}
main();