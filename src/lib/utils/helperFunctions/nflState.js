import { get } from 'svelte/store';
import {nbaState} from '$lib/stores';

export const getNflState = async () => {
	if(get(nbaState).season) {
		return get(nbaState);
	}
    const res = await fetch(`https://api.sleeper.app/v1/state/nba`, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok) {
		nbaState.update(() => data);
		return data;
	} else {
		throw new Error(data);
	}
}