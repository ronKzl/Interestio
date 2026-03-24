import { useState } from 'react'
import { useRef } from 'react';

import gsap from 'gsap'; 
import { useGSAP } from '@gsap/react'; 

gsap.registerPlugin(useGSAP);

function splitWord(word: String) {
	return word.split("").map((character, index) => <span key = {index} className='gradient'>{character}</span>)
}

export default function App() {
	const container = useRef(null);
	
	let make = splitWord("Make")
	let anything = splitWord("Anything")
	let interesting = splitWord("Interesting")
	useGSAP(() => {
   
		//gsap.to('.box', { rotation: 360 }); 
    gsap.fromTo('.gradient', { color: "black"},{color: "yellow", duration: 1, stagger: 0.02, repeat: -1, ease:'none'}); 
    
	},{ scope: container }); 

	return (
		<div ref={container} id="center" className="app">
			<div className="box">{make} {anything} {interesting}</div>
		</div>
	);
}
