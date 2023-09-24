import chroma from 'chroma-js';
import gsap from 'gsap';
import random from 'math-random'
import { useState, useRef, useEffect, ReactElement } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, useTexture } from '@react-three/drei'
import { Material, NearestFilter, Texture, Points as ThreePoints } from 'three';
import './App.css';

const star_frame1 = [
	'/animation/anim1_frame1.png',
	'/animation/anim1_frame2.png',
	'/animation/anim1_frame3.png',
	'/animation/anim1_frame4.png',
	'/animation/anim1_frame3.png',
	'/animation/anim1_frame2.png',
];
const star_frame2 = [
	'/animation/anim2_frame1.png',
	'/animation/anim2_frame2.png',
	'/animation/anim2_frame3.png',
	'/animation/anim2_frame4.png',
	'/animation/anim2_frame3.png',
	'/animation/anim2_frame2.png',
];
const star_frame3 = [
	'/animation/anim3_frame1.png',
	'/animation/anim3_frame2.png',
	'/animation/anim3_frame3.png',
	'/animation/anim3_frame4.png',
];


function App() {
	useEffect(() => {
		let startColor = document.body.style.backgroundColor || 'white';
		const endColor = '#353540';
		let t = 0;
		const increment = 0.01;
		const scale = chroma.scale([startColor, endColor]);

		const animateBackgroundColor = () => {
			if (t <= 1) {
				document.body.style.backgroundColor = scale(t).hex();
				t += increment;
				requestAnimationFrame(animateBackgroundColor);
			}
		};
		animateBackgroundColor();

		return () => { document.body.style.backgroundColor = startColor; };
	}, []);

	return (
		<Canvas
			camera={{ position: [0, 0, 1] }}
			className="canvas"
			style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
		>
			<BackGroundAnimation />
		</Canvas>
	);
}

function BackGroundAnimation(): ReactElement {
	const star1: Texture[] = star_frame1.map(f => {
		const t = useTexture(f);
		t.minFilter = NearestFilter;
		t.magFilter = NearestFilter;
		t.needsUpdate = true;
		return t;
	});
	const star2: Texture[] = star_frame2.map(f => {
		const t = useTexture(f);
		t.minFilter = NearestFilter;
		t.magFilter = NearestFilter;
		t.needsUpdate = true;
		return t;
	});
	const star3: Texture[] = star_frame3.map(f => {
		const t = useTexture(f);
		t.minFilter = NearestFilter;
		t.magFilter = NearestFilter;
		t.needsUpdate = true;
		return t;
	});

	return (
		<>
			<Stars quantity={75} maps={star1} color="#2245e2" size={0.01} duration={0.5} />
			<Stars quantity={60} maps={star1} color="#d92fe6" size={0.02} delay={1} duration={0.375} />
			<Stars quantity={25} maps={star1} color="#ffffff" size={0.03} delay={2} duration={0.2} />
			<Stars quantity={75} maps={star2} color="#2245e2" size={0.01} duration={0.5} />
			<Stars quantity={5} maps={star2} color="#2245e2" size={0.07} duration={0.25} />
			<Stars quantity={25} maps={star2} color="#d92fe6" size={0.02} delay={1} duration={0.375} />
			<Stars quantity={60} maps={star2} color="#f0e51c" size={0.03} delay={2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#1cf030" size={0.05} delay={0.5} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#f0e51c" size={0.12} delay={1} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color="#1cf030" size={0.09} delay={2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#f0e51c" size={0.03} delay={1.5} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color="#1cf030" size={0.03} delay={0.7} duration={0.2} />
			<ShootingStars quantity={1} maps={star3} color="#f0e51c" size={0.05} delay={0.2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#1cf030" size={0.09} delay={0.5} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color="#f0e51c" size={0.05} delay={3} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#1cf030" size={0.09} delay={1.2} duration={0.2} />
		</>
	);
}

function randomInSphere(n: number, radius: number): Float32Array {
	const points = new Float32Array(n * 3);
	for (let i = 0; i < n; i++) {
		const r = radius * Math.cbrt(random());
		const theta = random() * 2 * Math.PI;
		const phi = Math.acos(2 * random() - 1);
		const x = r * Math.sin(phi) * Math.cos(theta);
		const y = r * Math.sin(phi) * Math.sin(theta);
		const z = r * Math.cos(phi);
		points[i * 3] = x;
		points[i * 3 + 1] = y;
		points[i * 3 + 2] = z;
	}
	return points;
}

interface StarsProps {
	color: string,
	delay?: number,
	duration: number,
	maps: Texture[],
	quantity: number,
	size: number
};

function Stars({ color, delay = 0, duration, maps, quantity, size }: StarsProps): ReactElement {
	const [sphere] = useState<Float32Array>(() => randomInSphere(quantity, 1.5));
	const [map, setMap] = useState<Texture>(maps[0]);
	const pointsRef = useRef<ThreePoints>(null);
	const textureIndex = useRef({ value: 0 });

	useEffect(() => {
		const updateTexture = () => {
			setMap(maps[Math.floor(textureIndex.current.value)]);
		};
		const tl = gsap.timeline({
			repeat: -1,
			delay: delay,
		});

		for (let i = 0; i < maps.length; i++) {
			tl.to(textureIndex.current, {
				value: i,
				duration: duration,
				onUpdate: updateTexture,
				roundProps: "value"
			});
		}

		return () => {
			tl.kill();
		};
	}, [maps]);

	useFrame((_, delta) => {
		pointsRef.current && (pointsRef.current.rotation.x -= delta / 10);
		pointsRef.current && (pointsRef.current.rotation.y -= delta / 15);
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false} >
				<PointMaterial transparent color={color} map={map} size={size} sizeAttenuation={true} depthWrite={false} />
			</Points>
		</group>
	);
}

function ShootingStars({ color, delay = 0, duration, maps, quantity, size }: StarsProps): ReactElement {
	const [sphere] = useState<Float32Array>(() => randomInSphere(quantity, 1.5));
	const [map, setMap] = useState<Texture>(maps[0]);
	const pointsRef = useRef<ThreePoints>(null);
	const opacityRef = useRef<{ value: number }>({ value: 0 });
	const textureIndex = useRef<{ value: number }>({ value: 0 });

	useEffect(() => {
		const updateTexture = () => {
			setMap(maps[Math.floor(textureIndex.current.value)]);
		};
		const tl = gsap.timeline({
			repeat: -1,
			delay: delay,

		});

		tl.to(textureIndex.current, {
			onStart: () => { opacityRef.current.value = 1 },
			onComplete: () => { opacityRef.current.value = 0 },
			value: maps.length - 1,
			duration: duration * 4,
			onUpdate: updateTexture,
			roundProps: "value",
		}, `+=${delay * 2}`);

		return () => {
			tl.kill();
		};
	}, [maps]);

	useFrame((_, delta) => {
		pointsRef.current && ((pointsRef.current.material as Material).opacity = opacityRef.current.value);
		pointsRef.current && (pointsRef.current.rotation.x -= delta / 10);
		pointsRef.current && (pointsRef.current.rotation.y -= delta / 15);
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false} >
				<PointMaterial transparent color={color} map={map} size={size} sizeAttenuation={true} depthWrite={false} />
			</Points>
		</group>
	);
}

export default App;