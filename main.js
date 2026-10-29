import * as THREE from 'three';
import { DragControls, OrbitControls } from 'three/examples/jsm/Addons.js';

let draggedObject = null;

let isTraveling = false;
let journeyProgress = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080b24);


const destinations = [
    {
        id: "the-why",
        title: "THE WHY",
        position: new THREE.Vector3(0, -2, 0),
        color: 0xffcc66,
        experiences: []
    },

    {
        id: "education",
        title: "EDUCATION",
        position: new THREE.Vector3(0.4, 1, 0),
        color: 0xffcc66,
        experiences: []
    },

    {
        id: "retail",
        title: "CUSTOMER / RETAIL",
        position: new THREE.Vector3(0, 3, 0),
        color: 0xff9966,
        experiences: []
    },

    {
        id: "video-club",
        title: "VIDEO CLUB",
        position: new THREE.Vector3(-0.5, 5, 0),
        color: 0xff6699,
        experiences: []
    },

    {
        id: "web-development",
        title: "WEB DEVELOPMENT",
        position: new THREE.Vector3(0.5, 7, 0),
        color: 0x66ccff,
        experiences: []
    },

    {
        id: "service-delivery",
        title: "SERVICE DELIVERY",
        position: new THREE.Vector3(-0.3, 9, 0),
        color: 0x66ffcc,
        experiences: []
    },

    {
        id: "iam",
        title: "IAM",
        position: new THREE.Vector3(0.4, 11, 0),
        color: 0x9966ff,
        experiences: []
    },

    {
        id: "qa",
        title: "QA",
        position: new THREE.Vector3(-0.4, 13, 0),
        color: 0xff6699,
        experiences: []
    },

    {
        id: "what-didnt-work",
        title: "WHAT DIDN'T WORK",
        position: new THREE.Vector3(0.2, 15, 0),
        color: 0x888888,
        experiences: []
    },

    {
        id: "future",
        title: "FUTURE",
        position: new THREE.Vector3(0, 17, 0),
        color: 0xffffff,
        experiences: []
    }
];


// THE WHY - our Sun
const why = destinations.find(
    destination => destination.id === "the-why"
);

const whyGeometry = new THREE.SphereGeometry(0.5, 32, 32);

const whyMaterial = new THREE.MeshBasicMaterial({
    color: why.color
});

const whyPlanet = new THREE.Mesh(
    whyGeometry,
    whyMaterial
);

whyPlanet.position.copy(why.position);

scene.add(whyPlanet);



// Soft glow around THE WHY
const glowCanvas = document.createElement('canvas');
glowCanvas.width = 128;
glowCanvas.height = 128;

const glowContext = glowCanvas.getContext('2d');

const glowGradient = glowContext.createRadialGradient(
    64, 64, 0,
    64, 64, 64
);

glowGradient.addColorStop(0, 'rgba(255, 204, 102, 0.8)');
glowGradient.addColorStop(0.3, 'rgba(255, 204, 102, 0.35)');
glowGradient.addColorStop(0.7, 'rgba(255, 204, 102, 0.08)');
glowGradient.addColorStop(1, 'rgba(255, 204, 102, 0)');

glowContext.fillStyle = glowGradient;
glowContext.fillRect(0, 0, 128, 128);

const glowTexture = new THREE.CanvasTexture(glowCanvas);


const nebulaCanvas = document.createElement('canvas');
nebulaCanvas.width = 256;
nebulaCanvas.height = 256;

const nebulaContext = nebulaCanvas.getContext('2d');

const nebulaGradient = nebulaContext.createRadialGradient(
    128, 128, 0,
    128, 128, 128
);

nebulaGradient.addColorStop(0, 'rgba(102, 100, 255, 0.28)');
nebulaGradient.addColorStop(0.35, 'rgba(130, 80, 220, 0.18)');
nebulaGradient.addColorStop(0.7, 'rgba(70, 100, 200, 0.06)');
nebulaGradient.addColorStop(1, 'rgba(70, 100, 200, 0)');

nebulaContext.fillStyle = nebulaGradient;
nebulaContext.fillRect(0, 0, 256, 256);

const nebulaTexture = new THREE.CanvasTexture(nebulaCanvas);





const glowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    transparent: true,
    depthWrite: false
});

const whyGlow = new THREE.Sprite(glowMaterial);

whyGlow.position.copy(why.position);
whyGlow.scale.set(1.8, 1.8, 1);

scene.add(whyGlow);


// EDUCATION destination
const education = destinations.find(
    destination => destination.id === "education"
);

const educationGeometry = new THREE.SphereGeometry(0.35, 32, 32);

const educationMaterial = new THREE.MeshBasicMaterial({
    color: education.color
});

const educationPlanet = new THREE.Mesh(
    educationGeometry,
    educationMaterial
);

educationPlanet.position.copy(education.position);

scene.add(educationPlanet);

const nebulaMaterial = new THREE.SpriteMaterial({
    map: nebulaTexture,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const educationNebula = new THREE.Sprite(nebulaMaterial);
educationNebula.position.set(
    education.position.x,
    education.position.y + 0.7,
    education.position.z - 0.8
);
educationNebula.scale.set(4.5, 4.5, 1);

scene.add(educationNebula);

// Soft glow around the Education planet
const educationGlowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: education.color,
    transparent: true,
    opacity: 0.55,
    depthWrite: false
});

const educationGlow = new THREE.Sprite(educationGlowMaterial);

educationGlow.position.copy(education.position);
educationGlow.scale.set(1.5, 1.5, 1);

scene.add(educationGlow);



// Education orbit ring
const educationRingGeometry = new THREE.RingGeometry(0.45, 0.50, 64);

const educationRingMaterial = new THREE.MeshBasicMaterial({
    color: education.color,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide
});

const educationRing = new THREE.Mesh(
    educationRingGeometry,
    educationRingMaterial
);

educationRing.position.copy(education.position);

educationRing.rotation.x = Math.PI / 2;

// Second Education orbit ring
const educationRing2Geometry = new THREE.RingGeometry(0.55, 0.59, 64);

const educationRing2Material = new THREE.MeshBasicMaterial({
    color: education.color,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
});

const educationRing2 = new THREE.Mesh(
    educationRing2Geometry,
    educationRing2Material
);

educationRing2.position.copy(education.position);

educationRing2.rotation.x = Math.PI / 2;
educationRing2.rotation.z = Math.PI / 3;

scene.add(educationRing, educationRing2);



// Small celestial bodies around the Education planet
const educationStars = [];

const educationStarData = [
    { x: -1.1, y: 1.7, z: 0.1, size: 0.09, color: 0x66ccff },
    { x: 1.2, y: 1.5, z: 0.2, size: 0.12, color: 0xffcc66 },
    { x: 0.9, y: 0.1, z: -0.2, size: 0.08, color: 0xcc99ff }
];


educationStarData.forEach((starData) => {
    const starGeometry = new THREE.SphereGeometry(
        starData.size,
        16,
        16
    );

    const starMaterial = new THREE.MeshBasicMaterial({
        color: starData.color
    });

    const star = new THREE.Mesh(starGeometry, starMaterial);

    star.position.set(
        education.position.x + starData.x,
        education.position.y + starData.y,
        education.position.z + starData.z
    );

    scene.add(star);
    educationStars.push(star);
});



educationStars.forEach((star, index) => {
    star.userData.basePosition = star.position.clone();
    star.userData.floatOffset = index * 2;
    star.userData.floatSpeed = 0.8 + index * 0.2;
});

// Education ring rotation
educationRing.rotation.z += 0.005;


// Cosmic journey path
const journeyCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -2, 0),   // THE WHY
    new THREE.Vector3(0.5, -1, 0),
    new THREE.Vector3(-0.3, 0, 0),
    new THREE.Vector3(0.4, 1, 0),  // EDUCATION
    new THREE.Vector3(0, 2, 0)
]);

const journeyGeometry = new THREE.TubeGeometry(
    journeyCurve,
    100,
    0.015,
    8,
    false
);

const journeyMaterial = new THREE.MeshBasicMaterial({
    color: 0x8888ff,
    transparent: true,
    opacity: 0.35
});

const journeyTrail = new THREE.Mesh(
    journeyGeometry,
    journeyMaterial
);

// scene.add(journeyTrail);

function travelToEducation() {
    if (isTraveling) return;

    isTraveling = true;
    journeyProgress = 0;
}

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
const material1 = new THREE.MeshBasicMaterial({ color: 0xff00aa }); // Pink
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = 3;
cube1.position.y = 2;
cube1.position.z = 0;   // cube1.position.set(2, 1, 0);
cube1.name = 'The Pink Cube';

//cube2
const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial({ color: 0x8000ff }); // Purple
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(1, -1, 1);
cube2.name = 'The Purple Cube';

//cube3
const geometry3 = new THREE.BoxGeometry();
const material3 = new THREE.MeshBasicMaterial({ color: 0xf9f99 });
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

// 

const controls = new DragControls(
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

camera.position.set(0, -0.5, 5);

orbitControls.target.set(0, -0.5, 0);
orbitControls.update();


let cameraMoveTarget = null;
let lookAtTarget = null;


// Click on the Education planet
renderer.domElement.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(educationPlanet);

    if (intersects.length > 0) {
        cameraMoveTarget = new THREE.Vector3(
            education.position.x,
            education.position.y,
            3
        );

        lookAtTarget = education.position.clone();
    }
});


const educationInfo = document.getElementById('education-info');
const educationTitle = document.getElementById('education-title');
const educationDescription = document.getElementById('education-description');
const closeEducationInfo = document.getElementById('close-education-info');

const educationDetails = [
    {
        title: 'COMPUTER GRAPHICS',
        description: 'Master’s degree in Computing, Image Synthesis and Computer Graphics.'
    },
    {
        title: 'WEB DEVELOPMENT',
        description: 'Studies in Informatics Applications, with a foundation in web technologies and development.'
    },
    {
        title: 'NATURE & ENVIRONMENT',
        description: 'Studies in Forestry and Natural Environment Management, connecting technology with the natural world.'
    }
];

// Click on the small Education stars
renderer.domElement.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const starIntersects = raycaster.intersectObjects(educationStars);

    if (starIntersects.length > 0) {
        const selectedStar = educationStars.indexOf(
            starIntersects[0].object
        );

        const details = educationDetails[selectedStar];

        if (details) {
            educationTitle.textContent = details.title;
            educationDescription.textContent = details.description;
            educationInfo.style.display = 'block';
        }
    }
});

closeEducationInfo.addEventListener('click', () => {
    educationInfo.style.display = 'none';
});


// Click on the small Education stars
renderer.domElement.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const starIntersects = raycaster.intersectObjects(educationStars);

    if (starIntersects.length > 0) {
        const selectedStar = educationStars.indexOf(
            starIntersects[0].object
        );

        console.log('Selected Education star:', selectedStar);
    }
});


window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        cameraMoveTarget = new THREE.Vector3(0, -0.5, 5);
        lookAtTarget = new THREE.Vector3(0, -0.5, 0);
    }
});


const educationLabel = document.createElement('div');

educationLabel.textContent = 'EDUCATION';

educationLabel.style.position = 'fixed';
educationLabel.style.display = 'none';
educationLabel.style.color = '#ffcc66';
educationLabel.style.fontFamily = 'Arial, sans-serif';
educationLabel.style.fontSize = '14px';
educationLabel.style.fontWeight = 'bold';
educationLabel.style.letterSpacing = '3px';
educationLabel.style.pointerEvents = 'none';
educationLabel.style.transform = 'translate(-50%, -100%)';
educationLabel.style.textShadow = '0 0 12px #ffcc66';
educationLabel.style.zIndex = '10';

document.body.appendChild(educationLabel);




function animate() {
    requestAnimationFrame(animate);



    // THE WHY breathing animation
    const whyPulse = 1 + Math.sin(Date.now() * 0.002) * 0.08;

    whyPlanet.scale.set(
        whyPulse,
        whyPulse,
        whyPulse
    );

    // Education ring rotation

    educationRing.rotation.y += 0.005;
    educationRing2.rotation.y -= 0.006;


    // Gentle floating motion around Education
    const educationTime = Date.now() * 0.001;

    educationStars.forEach((star) => {
        star.position.y =
            star.userData.basePosition.y +
            Math.sin(
                educationTime * star.userData.floatSpeed +
                star.userData.floatOffset
            ) * 0.08;
    });

    // Education planet hover effect
    raycaster.setFromCamera(mouse, camera);

    const educationIntersects = raycaster.intersectObject(educationPlanet);

    const educationTargetScale = educationIntersects.length > 0 ? 1.2 : 1;

    // Hover effect for Education stars
    const starIntersects = raycaster.intersectObjects(educationStars);

    educationStars.forEach((star) => {
        const isHovered = starIntersects.some(
            (intersect) => intersect.object === star
        );

        const targetScale = isHovered ? 1.5 : 1;

        star.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.1
        );
    });

    if (educationIntersects.length > 0) {
        const screenPosition = educationPlanet.position.clone();
        screenPosition.project(camera);

        const canvasRect = renderer.domElement.getBoundingClientRect();

        educationLabel.style.left =
            `${canvasRect.left + (screenPosition.x + 1) * canvasRect.width / 2}px`;

        educationLabel.style.top =
            `${canvasRect.top + (1 - screenPosition.y) * canvasRect.height / 2 - 25}px`;

        educationLabel.style.display = 'block';
    } else {
        educationLabel.style.display = 'none';
    }


    educationPlanet.scale.lerp(
        new THREE.Vector3(
            educationTargetScale,
            educationTargetScale,
            educationTargetScale
        ),
        0.1
    );

    educationGlow.material.opacity =
        educationIntersects.length > 0 ? 0.85 : 0.55;


    // Smooth camera movement toward Education
    if (cameraMoveTarget && lookAtTarget) {
        camera.position.lerp(cameraMoveTarget, 0.04);
        orbitControls.target.lerp(lookAtTarget, 0.04);

        if (camera.position.distanceTo(cameraMoveTarget) < 0.01) {
            camera.position.copy(cameraMoveTarget);
            orbitControls.target.copy(lookAtTarget);

            cameraMoveTarget = null;
            lookAtTarget = null;
        }
    }

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

    if (isTraveling) {
        journeyProgress += 0.002;

        const point = journeyCurve.getPointAt(journeyProgress);

        // Look slightly ahead on the journey
        const lookAheadProgress = Math.min(
            journeyProgress + 0.08,
            1
        );

        const lookAheadPoint = journeyCurve.getPointAt(
            lookAheadProgress
        );

        // Move camera along the journey
        camera.position.x = point.x;
        camera.position.y = point.y;
        camera.position.z = point.z + 5;

        // Look toward where we're going
        orbitControls.target.copy(lookAheadPoint);

        if (journeyProgress >= 1) {
            journeyProgress = 1;
            isTraveling = false;
        }
    }


    renderer.render(scene, camera);
}

animate();

