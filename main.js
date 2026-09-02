import * as THREE from 'three';
import { DragControls, OrbitControls } from 'three/examples/jsm/Addons.js';

let draggedObject = null;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080b24);

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// const starsGeometry = new THREE.BufferGeometry();

// // Create 1000 stars.
// const starsCount = 3000;

// // Every star needs three coordinates: x,y,z. It's an efficient way to store lots of numbers for the GPU.
// const starsPositions = new Float32Array(starsCount * 3); 

// // Randomly position them - distributed throughout 3D space.
// for (let i = 0; i < starsCount * 3; i++) {
//     starsPositions[i] = (Math.random() - 0.5) * 100;
// }

// starsGeometry.setAttribute(
//     'position',
//     new THREE.BufferAttribute(starsPositions, 3)
// );

// const starsMaterial = new THREE.PointsMaterial({
//     color: 0xffffff,
//     size: 0.1
// });

// const stars = new THREE.Points(
//     starsGeometry,
//     starsMaterial
// );



const smallStarsCount = 1400;
const mediumStarsCount = 500;
const bigStarsCount = 100;

const smallStarsGeometry = new THREE.BufferGeometry();
const mediumStarsGeometry = new THREE.BufferGeometry();
const bigStarsGeometry = new THREE.BufferGeometry();

const smallStarsPositions = new Float32Array(smallStarsCount * 3);
const mediumStarsPositions = new Float32Array(mediumStarsCount * 3);
const bigStarsPositions = new Float32Array(bigStarsCount * 3);

for (let i = 0; i < smallStarsCount * 3; i++) {
    smallStarsPositions[i] = (Math.random() - 0.5) * 100;
}

for (let i = 0; i < mediumStarsCount * 3; i++) {
    mediumStarsPositions[i] = (Math.random() - 0.5) * 100;
}

for (let i = 0; i < bigStarsCount * 3; i++) {
    bigStarsPositions[i] = (Math.random() - 0.5) * 100;
}

smallStarsGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(smallStarsPositions, 3)
);

mediumStarsGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(mediumStarsPositions, 3)
);

bigStarsGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(bigStarsPositions, 3)
);


// Create a soft glowing texture for the stars
const canvas = document.createElement('canvas');
canvas.width = 64;
canvas.height = 64;

const context = canvas.getContext('2d');

const gradient = context.createRadialGradient(
    32, 32, 0,
    32, 32, 32
);

gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
gradient.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

context.fillStyle = gradient;
context.fillRect(0, 0, 64, 64);

const starTexture = new THREE.CanvasTexture(canvas);


const smallStarsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    map: starTexture,
    transparent: true,
    depthWrite: false
});

const mediumStarsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.15,
    map: starTexture,
    transparent: true,
    depthWrite: false
});

const bigStarsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.3,
    map: starTexture,
    transparent: true,
    depthWrite: false
});

const smallStars = new THREE.Points(
    smallStarsGeometry,
    smallStarsMaterial
);

const mediumStars = new THREE.Points(
    mediumStarsGeometry,
    mediumStarsMaterial
);

const bigStars = new THREE.Points(
    bigStarsGeometry,
    bigStarsMaterial
);


// Twinkling settings
const smallStarsBaseOpacity = 0.7;
const mediumStarsBaseOpacity = 0.8;
const bigStarsBaseOpacity = 1;

const starMovementSpeed = 0.00002;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let hoveredObject = null;

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
})

// cube.position.set(2, 0, 0);   // right
// cube.position.set(-2, 0, 0);  // left
// cube.position.set(0, 2, 0);   // up
// cube.position.set(0, -2, 0);  // down
// cube.position.set(0, 0, -2);  // farther from camera
// cube.position.set(0, 0, 2);   // closer to camera

//cube1
const geometry1 = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({color: 0xff00aa}); // Pink
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = 3;
cube1.position.y = 2;
cube1.position.z = 0;   // cube1.position.set(2, 1, 0);
cube1.name = 'The Pink Cube';

//cube2
const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial({color: 0x8000ff}); // Purple
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(1, -1, 1);
cube2.name = 'The Purple Cube';

//cube3
const geometry3 = new THREE.BoxGeometry();
const material3 = new THREE.MeshBasicMaterial({color: 0xf9f99});
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.set(-3, 0, -2);
cube3.name = "The Veraman Cube"


const cubes = [cube1, cube2, cube3];
// cubes.forEach((cube) => {
//     cube.userData.targetScale =1;
// })

cube1.userData.hoverScale = 1.5;
cube2.userData.hoverScale = 1.8;
cube3.userData.hoverScale = 1.3;

cube1.userData.targetScale = 1;
cube2.userData.targetScale = 1;
cube3.userData.targetScale = 1;

cube1.userData.originalColor = cube1.material.color.getHex();
cube2.userData.originalColor = cube2.material.color.getHex();
cube3.userData.originalColor = cube3.material.color.getHex();

cube1.userData.hoverColor = 0xff6600;
cube2.userData.hoverColor = 0x66ccff;
cube3.userData.hoverColor = 0x90ee90;

cube1.userData.targetColor = cube1.userData.originalColor;
cube2.userData.targetColor = cube2.userData.originalColor;
cube3.userData.targetColor = cube3.userData.originalColor;

cube1.userData.startY = cube1.position.y;
cube2.userData.startY = cube2.position.y;
cube3.userData.startY = cube3.position.y;

cube1.userData.floatSpeed = 0.001;
cube2.userData.floatSpeed = 0.0015;
cube3.userData.floatSpeed = 0.002;

scene.add(cube1, cube2, cube3, smallStars, mediumStars, bigStars);


const controls = new DragControls (
    [cube1, cube2, cube3],
    camera,
    renderer.domElement
);

const orbitControls = new OrbitControls(
    camera,
    renderer.domElement
);


orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;

orbitControls.minDistance = 3;
orbitControls.maxDistance = 15;

controls.addEventListener('dragstart', (event) => {
    draggedObject = event.object;
    orbitControls.enabled = false;
    console.log('Started dragging: ', event.object.name);
});

controls.addEventListener('dragend', (event) => {
    event.object.userData.startY = event.object.position.y;
    draggedObject = null;
    orbitControls.enabled = true;
    console.log('Stopped dragging: ', event.object.name);
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    orbitControls.update();

    // Twinkle effect
    const time = Date.now() * 0.002;

    smallStarsMaterial.opacity =
        smallStarsBaseOpacity + Math.sin(time) * 0.3;

    mediumStarsMaterial.opacity =
        mediumStarsBaseOpacity + Math.sin(time * 1.3) * 0.3;

    bigStarsMaterial.opacity =
        bigStarsBaseOpacity + Math.sin(time * 0.7) * 0.3;


    // Subtle star movement
    smallStars.rotation.y += starMovementSpeed;
    mediumStars.rotation.y += starMovementSpeed * 0.8;
    bigStars.rotation.y += starMovementSpeed * 0.5;


    if (draggedObject !== cube1) {
        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
    }
    if (draggedObject !== cube2) {
        cube2.rotation.x += 0.02;
        cube2.rotation.y += 0.02;
    }
    if (draggedObject !== cube3) {
        cube3.rotation.x += 0.03;
        cube3.rotation.y += 0.03;
    }


    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([cube1, cube2, cube3]);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        console.log('Hovering:', object.name);
        
        if (hoveredObject !== object) {
            if (hoveredObject) {
                hoveredObject.userData.targetScale = 1;
                hoveredObject.userData.targetColor =
                    hoveredObject.userData.originalColor;
            }

            hoveredObject = object;
            hoveredObject.userData.targetScale =
                hoveredObject.userData.hoverScale;

            hoveredObject.userData.targetColor =
                hoveredObject.userData.hoverColor;
        }
    } else {
        if (hoveredObject) {
            hoveredObject.userData.targetScale = 1;
            hoveredObject.userData.targetColor =
                hoveredObject.userData.originalColor;

            hoveredObject = null;
        } 
    }

    cubes.forEach((cube) => {
        const target = cube.userData.targetScale;

        cube.scale.x += (target - cube.scale.x) * 0.1;
        cube.scale.y += (target - cube.scale.y) * 0.1;
        cube.scale.z += (target - cube.scale.z) * 0.1;
    })

    cubes.forEach((cube) => {
        const targetColor = new THREE.Color(cube.userData.targetColor);

        cube.material.color.lerp(targetColor, 0.1);
    });


    if (draggedObject !== cube1) {
        cube1.position.y = cube1.userData.startY + Math.sin(Date.now() * cube1.userData.floatSpeed) * 0.3;
    }
    if (draggedObject !== cube2) {
        cube2.position.y = cube2.userData.startY + Math.sin(Date.now() * cube2.userData.floatSpeed) * 0.3;
    }
    if (draggedObject !== cube3) {
        cube3.position.y = cube3.userData.startY + Math.sin(Date.now() * cube3.userData.floatSpeed) * 0.3;
    }

    renderer.render(scene, camera);
}

animate();