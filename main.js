import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/Addons.js';

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

scene.add(cube1, cube2, cube3);

const controls = new DragControls (
    [cube1, cube2, cube3],
    camera,
    renderer.domElement
);

controls.addEventListener('dragstart', (event) => {
    draggedObject = event.object;
    console.log('Started dragging: ', event.object.name);
});

controls.addEventListener('dragend', (event) => {
    draggedObject = null;
    console.log('Stopped dragging: ', event.object.name);
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);


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

    renderer.render(scene, camera);
}

animate();