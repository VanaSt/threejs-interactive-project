import * as THREE from 'three';
import { DragControls, OrbitControls } from 'three/examples/jsm/Addons.js';

let draggedObject = null;

let isTraveling = false;
let journeyProgress = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080b24);

// SYSTEM GROUPS

const educationGroup = new THREE.Group();
educationGroup.name = 'Education System';

const customerServiceGroup = new THREE.Group();
customerServiceGroup.name = 'Customer & Service System';

const technologyGroup = new THREE.Group();
technologyGroup.name = 'Technology System';

const beyondCVGroup = new THREE.Group();
beyondCVGroup.name = 'Beyond the CV System';

// Add all system groups to the main scene
scene.add(
    educationGroup,
    customerServiceGroup,
    technologyGroup,
    beyondCVGroup
);

const destinations = [
    {
        id: "the-why",
        title: "THE WHY",
        position: new THREE.Vector3(0, 0, 0),
        color: 0xffcc66,
        experiences: []
    },

    {
        id: "education",
        title: "EDUCATION",
        position: new THREE.Vector3(-5, 5, 4),
        color: 0xffcc66,
        experiences: []
    },

    {
        id: "customer-service",
        title: "CUSTOMER & SERVICE",
        position: new THREE.Vector3(2, 3.5, 4),
        color: 0xff9966,
        experiences: []
    },

    {
        id: "technology",
        title: "TECHNOLOGY",
        position: new THREE.Vector3(-4.5, -4, 2),
        color: 0x9966ff,
        experiences: []
    },

    {
        id: "beyond-cv",
        title: "BEYOND THE CV",
        position: new THREE.Vector3(8.5, -2, 3),
        color: 0x66ffcc,
        experiences: []
    }
];



// THE WHY - our Sun
const why = destinations.find(
    destination => destination.id === "the-why"
);

const whyGeometry = new THREE.SphereGeometry(1.4, 32, 32);

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

// MAIN UNIVERSE - Additional gateway planets

const gatewaySystems = [
    {
        id: "customer-service",
        title: "CUSTOMER & SERVICE",
        color: 0xff9966,
        size: 0.85,
        glowSize: 2.5
    },
    {
        id: "technology",
        title: "TECHNOLOGY",
        color: 0x9966ff,
        size: 0.85,
        glowSize: 2.5
    },
    {
        id: "beyond-cv",
        title: "BEYOND THE CV",
        color: 0x66ffcc,
        size: 0.85,
        glowSize: 2.5
    }
];

const gatewayPlanets = [];

gatewaySystems.forEach((system) => {

    const destination = destinations.find(
        item => item.id === system.id
    );

    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(system.size, 32, 32),
        new THREE.MeshBasicMaterial({
            color: system.color
        })
    );

    planet.position.copy(destination.position);

    planet.userData.systemId = system.id;
    planet.userData.title = system.title;

    const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: glowTexture,
            color: system.color,
            transparent: true,
            opacity: 0.65,
            depthWrite: false
        })
    );

    glow.position.copy(destination.position);
    glow.scale.set(system.glowSize, system.glowSize, 1);

    scene.add(planet);
    scene.add(glow);

    gatewayPlanets.push(planet);
});

// EDUCATION destination
const education = destinations.find(
    destination => destination.id === "education"
);

const educationGeometry = new THREE.SphereGeometry(0.55, 32, 32);

const educationMaterial = new THREE.MeshBasicMaterial({
    color: education.color
});

const educationPlanet = new THREE.Mesh(
    educationGeometry,
    educationMaterial
);

educationPlanet.position.copy(education.position);

educationGroup.add(educationPlanet);

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

educationGroup.add(educationNebula);

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

educationGroup.add(educationGlow);



// Education orbit ring
const educationRingGeometry = new THREE.RingGeometry(0.45, 0.50, 64);

const educationRingMaterial = new THREE.MeshBasicMaterial({
    // color: education.color,
    color: 0x66ddff,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide
});

const educationRing = new THREE.Mesh(
    educationRingGeometry,
    educationRingMaterial
);

educationRing.position.copy(education.position);

educationRing.rotation.x = Math.PI / 3;

// Second Education orbit ring
const educationRing2Geometry = new THREE.RingGeometry(0.55, 0.59, 64);

const educationRing2Material = new THREE.MeshBasicMaterial({
    color: 0x66ddff,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide
});

const educationRing2 = new THREE.Mesh(
    educationRing2Geometry,
    educationRing2Material
);

educationRing2.position.copy(education.position);

educationRing2.rotation.x = Math.PI / 3;
educationRing2.rotation.z = Math.PI / 3;

educationGroup.add(educationRing, educationRing2);



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
    star.userData.systemId = "education";

    star.position.set(
        education.position.x + starData.x,
        education.position.y + starData.y,
        education.position.z + starData.z
    );

    educationGroup.add(star);
    educationStars.push(star);
});



educationStars.forEach((star, index) => {
    star.userData.basePosition = star.position.clone();
    star.userData.floatOffset = index * 2;
    star.userData.floatSpeed = 0.8 + index * 0.2;
});

// CUSTOMER & SERVICE - Small planets

const customerService = destinations.find(
    destination => destination.id === "customer-service"
);

const customerServicePlanetsData = [
    {
        title: "CUSTOMER / RETAIL",
        offset: new THREE.Vector3(-1.3, 1.2, 0),
        color: 0xffcc66
    },
    {
        title: "VIDEO CLUB",
        offset: new THREE.Vector3(1.4, 1.5, -0.3),
        color: 0xff6699
    },
    {
        title: "SERVICE DELIVERY",
        offset: new THREE.Vector3(1.1, -1.2, 0.2),
        color: 0xff9966
    }
];

const customerServicePlanets = [];

customerServicePlanetsData.forEach((planetData) => {

    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 24, 24),
        new THREE.MeshBasicMaterial({
            color: planetData.color
        })
    );

    planet.position.copy(
        customerService.position
    ).add(planetData.offset);

    planet.userData.title = planetData.title;
    planet.userData.systemId = "customer-service";

    customerServiceGroup.add(planet);

    customerServicePlanets.push(planet);
});


// CUSTOMER & SERVICE - Planet glows

customerServicePlanets.forEach((planet) => {

    const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: glowTexture,
            color: planet.material.color,
            transparent: true,
            opacity: 0.55,
            depthWrite: false
        })
    );

    glow.position.copy(planet.position);
    glow.scale.set(0.65, 0.65, 1);

    customerServiceGroup.add(glow);
});

// TECHNOLOGY - Small planets

const technology = destinations.find(
    destination => destination.id === "technology"
);

const technologyPlanetsData = [
    {
        title: "WEB DEVELOPMENT",
        offset: new THREE.Vector3(-1.4, 1.2, 0),
        color: 0x66ccff
    },
    {
        title: "IAM",
        offset: new THREE.Vector3(1.3, 1.5, -0.3),
        color: 0xcc99ff
    },
    {
        title: "QA",
        offset: new THREE.Vector3(0.8, -1.3, 0.2),
        color: 0x66ffcc
    }
];

const technologyPlanets = [];

technologyPlanetsData.forEach((planetData) => {

    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 24, 24),
        new THREE.MeshBasicMaterial({
            color: planetData.color
        })
    );

    planet.position.copy(
        technology.position
    ).add(planetData.offset);

    planet.userData.title = planetData.title;
    planet.userData.systemId = "technology";

    technologyGroup.add(planet);
    technologyPlanets.push(planet);
});

// TECHNOLOGY - Planet glows

technologyPlanets.forEach((planet) => {

    const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: glowTexture,
            color: planet.material.color,
            transparent: true,
            opacity: 0.55,
            depthWrite: false
        })
    );

    glow.position.copy(planet.position);
    glow.scale.set(0.65, 0.65, 1);

    technologyGroup.add(glow);
});

// BEYOND THE CV - Small planets

const beyondCV = destinations.find(
    destination => destination.id === "beyond-cv"
);

const beyondCVPlanetsData = [
    {
        title: "DREAMS & ASPIRATIONS",
        offset: new THREE.Vector3(-1.8, 1.5, 0),
        color: 0xffcc66
    },
    {
        title: "HOBBIES & CREATIVITY",
        offset: new THREE.Vector3(0, 2, -0.3),
        color: 0xff66cc
    },
    {
        title: "LIKES & DISLIKES",
        offset: new THREE.Vector3(1.8, 1.2, 0.2),
        color: 0x66ccff
    },
    {
        title: "PERSONAL INTERESTS",
        offset: new THREE.Vector3(-1.5, -1.2, -0.2),
        color: 0x99ff99
    },
    {
        title: "WHAT DIDN'T WORK",
        offset: new THREE.Vector3(0.5, -1.8, 0.3),
        color: 0xff9966
    },
    {
        title: "FUTURE",
        offset: new THREE.Vector3(2, -1, -0.3),
        color: 0xcc99ff
    }
];

const beyondCVPlanets = [];

beyondCVPlanetsData.forEach((planetData) => {

    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 24, 24),
        new THREE.MeshBasicMaterial({
            color: planetData.color
        })
    );

    planet.position.copy(
        beyondCV.position
    ).add(planetData.offset);

    planet.userData.title = planetData.title;
    planet.userData.systemId = "beyond-cv";

    beyondCVGroup.add(planet);
    beyondCVPlanets.push(planet);
});

// BEYOND THE CV - Planet glows

beyondCVPlanets.forEach((planet) => {

    const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: glowTexture,
            color: planet.material.color,
            transparent: true,
            opacity: 0.6,
            depthWrite: false
        })
    );

    glow.position.copy(planet.position);
    glow.scale.set(0.7, 0.7, 1);

    beyondCVGroup.add(glow);
});

// All small planets that support hover labels
const allHoverablePlanets = [
    ...educationStars,
    ...customerServicePlanets,
    ...technologyPlanets,
    ...beyondCVPlanets
];


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

scene.add(smallStars, mediumStars, bigStars);

// Twinkling settings
const smallStarsBaseOpacity = 0.7;
const mediumStarsBaseOpacity = 0.8;
const bigStarsBaseOpacity = 1;

const starMovementSpeed = 0.00002;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const hoverRaycaster = new THREE.Raycaster();
const hoverMouse = new THREE.Vector2();

let hoveredObject = null;

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
})

window.addEventListener('mousemove', (event) => {
    hoverMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    hoverMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

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
orbitControls.maxDistance = 40;

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

camera.position.set(0, -1, 20);

orbitControls.target.set(0, -1, 0);
orbitControls.update();


let cameraMoveTarget = null;
let lookAtTarget = null;

let activeSystemId = null;
let isSystemEntered = false;

// Click on any gateway planet
renderer.domElement.addEventListener('click', (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const allGatewayPlanets = [
        educationPlanet,
        ...gatewayPlanets
    ];

    const intersects = raycaster.intersectObjects(allGatewayPlanets);

    if (intersects.length > 0) {

        const selectedPlanet = intersects[0].object;

        const selectedSystemId =
            selectedPlanet === educationPlanet
                ? "education"
                : selectedPlanet.userData.systemId;

        const destination = destinations.find(
            item => item.id === selectedSystemId
        );

        if (destination) {

            activeSystemId = selectedSystemId;
            isSystemEntered = false;

            // Close any previously open information card
            educationInfo.style.display = 'none';
            selectedInfoPlanet = null;

            cameraMoveTarget = new THREE.Vector3(
                destination.position.x,
                destination.position.y,
                destination.position.z + 7
            );

            lookAtTarget = destination.position.clone();

            console.log("Entering system:", destination.title);
        }
    }
});


const educationInfo = document.getElementById('education-info');
const planetTooltip = document.getElementById('planet-tooltip');
const educationTitle = document.getElementById('education-title');
const educationDescription = document.getElementById('education-description');
const closeEducationInfo = document.getElementById('close-education-info');
let selectedInfoPlanet = null;

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


// Click on all small planets
renderer.domElement.addEventListener('click', (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const allSmallPlanets = [
        ...educationStars,
        ...customerServicePlanets,
        ...technologyPlanets,
        ...beyondCVPlanets
    ];

    const intersects = raycaster.intersectObjects(allSmallPlanets);

    if (intersects.length > 0) {

        const selectedPlanet = intersects[0].object;

        // Small planets are clickable only inside their own system
        if (!isSystemEntered ||
            selectedPlanet.userData.systemId !== activeSystemId) {
            return;
        }

        let details;

        // Education planets use the existing educationDetails array
        if (educationStars.includes(selectedPlanet)) {

            const selectedIndex = educationStars.indexOf(selectedPlanet);

            details = educationDetails[selectedIndex];

        } else {

            details = {
                title: selectedPlanet.userData.title,
                description: 'More information about this chapter will be added soon.'
            };
        }

        if (details) {
            selectedInfoPlanet = selectedPlanet;
            educationTitle.textContent = details.title;
            educationDescription.textContent = details.description;
            educationInfo.style.display = 'block';

            console.log('Selected planet:', details.title);
        }
    }
});


closeEducationInfo.addEventListener('click', () => {
    educationInfo.style.display = 'none';
    selectedInfoPlanet = null;
});


// Click on the small Education stars
renderer.domElement.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const starIntersects = raycaster.intersectObjects(educationStars);

    if (
        isSystemEntered &&
        activeSystemId === "education" &&
        starIntersects.length > 0
    ) {
        const selectedStar = educationStars.indexOf(
            starIntersects[0].object
        );

        console.log('Selected Education star:', selectedStar);
    }
});


window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        cameraMoveTarget = new THREE.Vector3(0, -1, 20);
        lookAtTarget = new THREE.Vector3(0, -1, 0);

        activeSystemId = null;
        isSystemEntered = false;

        // Close information card
        educationInfo.style.display = 'none';
        educationInfo.style.visibility = 'visible';
        selectedInfoPlanet = null;
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

            isSystemEntered = true;

            cameraMoveTarget = null;
            lookAtTarget = null;
        }
    }

    orbitControls.update();

    // HOVER LABELS FOR SMALL PLANETS

    if (cameraMoveTarget || isSystemEntered) {

        planetTooltip.style.opacity = '0';

    } else {

        hoverRaycaster.setFromCamera(hoverMouse, camera);

        const hoverIntersects = hoverRaycaster.intersectObjects(
            allHoverablePlanets
        );

        if (hoverIntersects.length > 0) {

            const planet = hoverIntersects[0].object;

            if (planet.userData.title) {

                planetTooltip.textContent = planet.userData.title;

                const screenPosition = planet.getWorldPosition(
                    new THREE.Vector3()
                );

                screenPosition.project(camera);

                const canvasRect = renderer.domElement.getBoundingClientRect();

                const x = canvasRect.left +
                    (screenPosition.x * 0.5 + 0.5) * canvasRect.width;

                const y = canvasRect.top +
                    (-screenPosition.y * 0.5 + 0.5) * canvasRect.height;

                planetTooltip.style.left = `${x + 15}px`;
                planetTooltip.style.top = `${y - 15}px`;

                planetTooltip.style.opacity = '1';
            }

        } else {

            planetTooltip.style.opacity = '0';
        }
    }

    // FOLLOW SELECTED PLANET WITH INFO CARD
    if (selectedInfoPlanet && educationInfo.style.display !== 'none') {

        const screenPosition = selectedInfoPlanet.getWorldPosition(new THREE.Vector3());
        screenPosition.project(camera);

        const isInFrontOfCamera = screenPosition.z > -1 && screenPosition.z < 1;

        const isInsideScreen =
            screenPosition.x >= -1 &&
            screenPosition.x <= 1 &&
            screenPosition.y >= -1 &&
            screenPosition.y <= 1;

        if (isInFrontOfCamera && isInsideScreen) {

            educationInfo.style.visibility = 'visible';

            const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-screenPosition.y * 0.5 + 0.5) * window.innerHeight;

            const cardWidth = educationInfo.offsetWidth;
            const cardHeight = educationInfo.offsetHeight;
            const gap = 25;

            let cardX = x + gap;
            let cardY = y - cardHeight / 2;

            if (cardX + cardWidth > window.innerWidth - 15) {
                cardX = x - cardWidth - gap;
            }

            cardX = Math.max(15, Math.min(cardX, window.innerWidth - cardWidth - 15));
            cardY = Math.max(15, Math.min(cardY, window.innerHeight - cardHeight - 15));

            educationInfo.style.left = `${cardX}px`;
            educationInfo.style.top = `${cardY}px`;

        } else {
            educationInfo.style.visibility = 'hidden';
        }
    }

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

