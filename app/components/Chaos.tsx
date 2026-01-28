"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// --- Physics Constants ---
const GRAVITY = -15; // Strong gravity
const FLOOR_Y = -4;
const RESTITUTION = 0.6; // Bounciness
const FRICTION = 0.98; // Air resistance
const REPULSION_RADIUS = 3;
const REPULSION_FORCE = 20;

// --- Types ---
type BodyType = 'SPHERE' | 'CUBE' | 'CYLINDER';
interface BodyData {
    id: number;
    type: BodyType;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    rotation: THREE.Euler;
    angularVelocity: THREE.Vector3;
    radius: number; // Approximation for collision
    color: string;
    materialType: 'GLASS' | 'CHROME' | 'MATTE';
}

const BODY_COUNT = 30;

const generateBodies = (): BodyData[] => {
    const bodies: BodyData[] = [];
    for (let i = 0; i < BODY_COUNT; i++) {
        const typeRand = Math.random();
        let type: BodyType = 'SPHERE';
        let materialType: BodyData['materialType'] = 'CHROME';
        let radius = Math.random() * 0.4 + 0.3; // 0.3 to 0.7

        if (typeRand < 0.33) {
            type = 'CUBE';
            materialType = 'GLASS';
            radius = 0.5; // Fixed size for cubes mostly
        } else if (typeRand < 0.66) {
            type = 'CYLINDER';
            materialType = 'MATTE';
            radius = 0.4;
        }

        bodies.push({
            id: i,
            type,
            materialType,
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 10, // Spread X
                Math.random() * 10 + 5,      // Start high Y
                (Math.random() - 0.5) * 5    // Spread Z
            ),
            velocity: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
            angularVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1
            ),
            radius,
            color: '#ffffff',
        });
    }
    return bodies;
};

// --- Single Body Component ---
const RigidBody = ({ data, mousePos }: { data: BodyData, mousePos: THREE.Vector3 }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    // Use refs for mutable physics state to avoid re-renders
    const position = useRef(data.position.clone());
    const velocity = useRef(data.velocity.clone());
    const rotation = useRef(data.rotation.clone());
    const angularVel = useRef(data.angularVelocity.clone());

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // 1. Apply Gravity
        velocity.current.y += GRAVITY * delta;

        // 2. Apply Repulsion (Mouse Interaction)
        // Convert mousePos (screen-ish) to world repulsion
        // We actually pass a world-space adjusted mouse target from parent
        const distToMouse = position.current.distanceTo(mousePos);
        if (distToMouse < REPULSION_RADIUS) {
            const repelDir = new THREE.Vector3().subVectors(position.current, mousePos).normalize();
            // Force depends on distance
            const force = (REPULSION_RADIUS - distToMouse) * REPULSION_FORCE * delta;
            velocity.current.add(repelDir.multiplyScalar(force));

            // Add some spin
            angularVel.current.x += (Math.random() - 0.5) * force;
            angularVel.current.y += (Math.random() - 0.5) * force;
        }

        // 3. Integrate Velocity
        velocity.current.multiplyScalar(FRICTION);
        position.current.add(velocity.current.clone().multiplyScalar(delta));

        // 4. Update Rotation
        rotation.current.x += angularVel.current.x;
        rotation.current.y += angularVel.current.y;
        rotation.current.z += angularVel.current.z;
        angularVel.current.multiplyScalar(0.95); // Angular drag

        // 5. Floor Collision
        if (position.current.y - data.radius < FLOOR_Y) {
            position.current.y = FLOOR_Y + data.radius;
            velocity.current.y *= -RESTITUTION;

            // Friction on floor
            velocity.current.x *= 0.9;
            velocity.current.z *= 0.9;
        }

        // 6. Wall Collision (Simple Box)
        const WALL_X = 8;
        if (Math.abs(position.current.x) > WALL_X) {
            position.current.x = Math.sign(position.current.x) * WALL_X;
            velocity.current.x *= -RESTITUTION;
        }

        // 7. Update Mesh
        meshRef.current.position.copy(position.current);
        meshRef.current.rotation.copy(rotation.current);
    });

    // Materials
    const Material = useMemo(() => {
        if (data.materialType === 'GLASS') {
            return (
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={1}
                    thickness={0.5}
                    chromaticAberration={0.05}
                    anisotropy={0.1}
                    roughness={0.1}
                    clearcoat={1}
                    color="#eef2ff" // Very slight blue tint for glass
                />
            );
        }
        if (data.materialType === 'CHROME') {
            return <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />;
        }
        // MATTE
        return <meshStandardMaterial color="#f8fafc" roughness={0.8} />;
    }, [data.materialType]);

    // Geometry
    let geometry;
    if (data.type === 'CUBE') geometry = <boxGeometry args={[data.radius * 2, data.radius * 2, data.radius * 2]} />;
    else if (data.type === 'CYLINDER') geometry = <cylinderGeometry args={[data.radius, data.radius, data.radius * 2, 32]} />;
    else geometry = <sphereGeometry args={[data.radius, 32, 32]} />;

    return (
        <mesh ref={meshRef} castShadow receiveShadow>
            {geometry}
            {Material}
        </mesh>
    );
};

// --- Main Simulation Scene ---
const PhysicsScene = () => {
    const bodies = useMemo(() => generateBodies(), []);
    const { viewport, mouse } = useThree();

    // Track mouse in approx world space at z=0
    const mouseRef = useRef(new THREE.Vector3(0, -100, 0)); // Start far away

    useFrame((state) => {
        // Map normalized mouse (-1 to 1) to viewport dimensions
        // Note: Viewport width at z=0
        const x = (state.mouse.x * viewport.width) / 2;
        const y = (state.mouse.y * viewport.height) / 2;

        // Only active if mouse is moving/present? 
        // We'll keep it active.
        mouseRef.current.set(x, y, 0);
    });

    return (
        <>
            {bodies.map(body => (
                <RigidBody key={body.id} data={body} mousePos={mouseRef.current} />
            ))}
        </>
    );
};

export default function Chaos() {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
                {/* --- Apple Studio Lighting --- */}
                {/* Clean White Background (can be transparent to let Hero bg show) */}
                {/* <color attach="background" args={['#ffffff']} /> */}

                <ambientLight intensity={1.5} />

                {/* Key Light */}
                <spotLight
                    position={[10, 15, 10]}
                    angle={0.5}
                    penumbra={1}
                    intensity={1.5}
                    castShadow
                    shadow-bias={-0.0001}
                />
                {/* Fill Light */}
                <pointLight position={[-10, 5, 10]} intensity={1} color="#eef2ff" />

                {/* Environment for Reflections (Chrome/Glass) */}
                <Environment preset="studio">
                    <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
                    <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
                    <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
                </Environment>

                <PhysicsScene />

                {/* Floor Shadow Catcher */}
                <mesh position={[0, FLOOR_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#f8fafc" roughness={1} opacity={0.5} transparent />
                    {/* ShadowMaterial is better for invisible floor shadows */}
                    <shadowMaterial transparent opacity={0.1} />
                </mesh>

            </Canvas>
        </div>
    );
}
