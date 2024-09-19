<script setup>
import { useRoute, RouterView, useRouter} from 'vue-router'
import {onMounted, onBeforeMount, ref} from "vue"
//Three Js
import * as Three from "three";
import {MapControls} from 'three/addons/controls/MapControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {CSS2DRenderer, CSS2DObject} from 'three/addons/renderers/CSS2DRenderer.js';

import plantsToday from "../plantTodayData.json";
import landmarksToday from "../landmarkTodayData.json";
import landmarkHomeLinks from "../landmarkHomeLinks.json";

const route = useRoute();
const router = useRouter();

let plantLink = ref(null);
let landmarkLink = ref(null);
let landmarkHome = ref(null);

onBeforeMount(function(){
    plantLink.value = plantsToday.find(plant => plant.plant_id === parseInt(1));
    landmarkLink.value = landmarksToday.find(landmark => landmark.landmark_id === parseInt(1));
    landmarkHome.value = landmarkHomeLinks;
});

//Import Models
const map = new URL('/models/minimizedModel.gltf', import.meta.url);

let modal1Status = 0;
let modal2Status = 0;

//After the Page Loads
onMounted(function(){

//Modal Pop Ups!
let modal1 = document.getElementById("modal1");
let modal1Button = document.getElementById("modal1Button");
let modalBack = document.getElementById("modalBack");

function toggleModal1(){
        modal1.classList.toggle("modalEnable");
        modalBack.classList.toggle("sidebarEnable");

        if (modal1Status > 0){
            modal1Status = 0;
        } else {
            modal1Status = 1;
        }
}

function toggleModal1Path(href){
        modal1.classList.toggle("modalEnable");
        modalBack.classList.toggle("sidebarEnable");
        router.push(href);

        if (modal1Status > 0){
            modal1Status = 0;
        } else {
            modal1Status = 1;
        }
}

modal1Button.addEventListener("click", function () {
    toggleModal1Path(`/landmarks/` + landmarkHome.value[0].landmark_id);
});

modal1.addEventListener("mouseleave", function () {
    modal1.classList.toggle("modalEnable");
    modalBack.classList.toggle("sidebarEnable");
});

let modal2 = document.getElementById("modal2");
let modal2Button = document.getElementById("modal2Button");

function toggleModal2(){
        modal2.classList.toggle("modalEnable");
        modalBack.classList.toggle("sidebarEnable");

        if (modal2Status > 0){
            modal2Status = 0;
        } else {
            modal2Status = 1;
        }
}

function toggleModal2Path(href){
        modal2.classList.toggle("modalEnable");
        modalBack.classList.toggle("sidebarEnable");
        router.push(href);

        if (modal2Status > 0){
            modal2Status = 0;
        } else {
            modal2Status = 1;
        }
}

modal2Button.addEventListener("click", function () {
    toggleModal2Path(`/landmarks/` + landmarkHome.value[1].landmark_id);
});

modal2.addEventListener("mouseleave", function () {
    modal2.classList.toggle("modalEnable");
    modalBack.classList.toggle("sidebarEnable");
});


modalBack.addEventListener("click", function () {
    if (modal1Status > 0){
        modal1.classList.toggle("modalEnable");
        modalBack.classList.toggle("sidebarEnable");
        modal1Status = 0;
    } else if (modal2Status > 0) {
        modal2.classList.toggle("modalEnable");
        modalBack.classList.toggle("sidebarEnable");
        modal2Status = 0;
    }
});

const renderer = new Three.WebGLRenderer({canvas: document.querySelector("canvas")});
const labelGroup = new Three.Group();

//Setup Three
renderer.shadowMap.enabled = true;
renderer.setClearColor(0xA3A3A3);

const scene = new Three.Scene();

//2 Aspect Ratio has a Reason! //Credit: https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
const camera = new Three.PerspectiveCamera(
    40, 2,
    0.1,
    100,
);

const hemiLight = new Three.HemisphereLight(0xffffff, 0x8d8d8d, 2);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new Three.DirectionalLight(0xffffff, 2);
dirLight.position.set(- 3, 10, - 10);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = - 2;
dirLight.shadow.camera.left = - 2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
scene.add(dirLight);

//Credit: https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // you must pass false here or three.js sadly fights the browser
  renderer.setSize(width, height, false);
  labelRenderer.setSize(width, height, false);
  camera.aspect = width / height;
  //console.log(width + "+" + height);
  camera.updateProjectionMatrix();

  // update any render target sizes here
}

const mapControls = new MapControls( camera, renderer.domElement );
mapControls.enableDamping = true;

camera.position.set(0, 5, - 5);

//Credit: https://threejs.org/examples/misc_controls_map.html

mapControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
mapControls.dampingFactor = 0.05;

mapControls.screenSpacePanning = false;

mapControls.minDistance = 0;
mapControls.maxDistance = 100;

mapControls.minPolarAngle = Math.PI/4;
mapControls.maxPolarAngle = Math.PI/2;

/*const axesHelper = new Three.AxesHelper(5);
scene.add(axesHelper); */

//Setup the Models
const loadingManager = new Three.LoadingManager();

loadingManager.onStart = function(url, item, total){
    //console.log("Loading Start");
};

loadingManager.onProgress = function(url, item, total){
    //console.log(`Loading In progress ${url}`);
};

loadingManager.onLoad = function(url, item, total){
    //console.log("Loading Finish");
};

loadingManager.onError = function(url, item, total){
    //console.log(`Error! ${url}`);
};

const assetLoader = new GLTFLoader(loadingManager);

assetLoader.load(map.href, function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);

}, undefined, function (error) {
    console.log(error);
});

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(renderer.domElement.clientHeight, renderer.domElement.clientWidth)
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";

document.getElementById('modelViewer').appendChild(labelRenderer.domElement);

//labelGroup.renderOrder = Infinity;

//Great Palm House
const greatPalmHouse = document.createElement("div");
greatPalmHouse.className = "pointLabel";
greatPalmHouse.id = "greatPalmHouse";
greatPalmHouse.textContent = "The Great Palm House";
greatPalmHouse.addEventListener('pointerdown', () => { toggleModal2(); });

const greatPalmHouseLabel = new CSS2DObject(greatPalmHouse);
labelGroup.add(greatPalmHouseLabel);
greatPalmHouseLabel.position.set(1.5, 0, 2);

//The Curvilinear Range
const curvilinear = document.createElement("div");
curvilinear.className = "pointLabel";
curvilinear.id = "curvilinearRange";
curvilinear.textContent = "The Curvilinear Range";
curvilinear.addEventListener('pointerdown', () => { toggleModal1(); });

const curvilinearLabel = new CSS2DObject(curvilinear);
labelGroup.add(curvilinearLabel);
curvilinearLabel.position.set(-8, 0, 2);

//Entrance
const entrance = document.createElement("div");
entrance.className = "pointLabelUnselect";
entrance.id = "entrance";
entrance.textContent = "Entrance";

const entranceLabel = new CSS2DObject(entrance);
scene.add(entranceLabel);
entranceLabel.position.set(-8.4, 0, -7.5);

//Teak House
const teakHouse = document.createElement("div");
teakHouse.className = "pointLabelUnselect";
teakHouse.id = "teakHouse";
teakHouse.textContent = "The Teak House";

const teakHouseLabel = new CSS2DObject(teakHouse);
scene.add(teakHouseLabel);
teakHouseLabel.position.set(0.2, 0, -6.2);

//Visitor Center
const visitor = document.createElement("div");
visitor.className = "pointLabelUnselect";
visitor.id = "visitor";
visitor.textContent = "Visitor Center";

const visitorLabel = new CSS2DObject(visitor);
scene.add(visitorLabel);
visitorLabel.position.set(-4.7, 0, -4.7);

//Director's Residence
const director = document.createElement("div");
director.className = "pointLabelUnselect";
director.id = "director";
director.textContent = "Director's Residence";

const directorLabel = new CSS2DObject(director);
scene.add(directorLabel);
directorLabel.position.set(-14.1, 0, -2.5);

//Functions
function createPointMesh(name, x, y, z) {
    const geo = new Three.SphereGeometry(0.1, 10, 10);
    const mat = new Three.MeshBasicMaterial({color: 0xFF0000});
    const mesh = new Three.Mesh(geo, mat);

    mesh.position.set(x, y, z);
    mesh.name = name;
    return mesh;
}

/*Add Selectors!
const spherePoint1 = createPointMesh('sphereMesh1', 1.5, 2, 2);
labelGroup.add(spherePoint1);

const spherePoint2 = createPointMesh('sphereMesh2', -8, 2, 2);
labelGroup.add(spherePoint2);
*/
scene.add(labelGroup);

const rayCaster = new Three.Raycaster();

const mousePosition = new Three.Vector2();

/*
function mapToggle(e) {
    const rect = renderer.domElement.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	mousePosition.x = (x / renderer.domElement.clientWidth) * 2 - 1;
	mousePosition.y = (y / renderer.domElement.clientHeight) * -2 + 1;

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(labelGroup.children);
    if (intersects.length > 0){
        switch(intersects[0].object.name){
            case "spherePoint1":
                //console.log("spherePoint1");
                toggleModal1();
                break;
            case "spherePoint2":
                //console.log("spherePoint2");
                toggleModal2();
                break;
            default: 
                //Toggle off modal
                break;
        }
    }

    console.log(intersects);
}

window.addEventListener('click', mapToggle);
*/

var observer = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) {
        //console.log("Hit!");
        renderer.setAnimationLoop(null);
    }
    else {
        //console.log("ContinueAnimation");
    }
});

observer.observe(document.querySelector("#modelViewer"));

function animate(time) {
    mapControls.update();
    labelRenderer.render(scene, camera);    
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
resizeObserver.observe(renderer.domElement, {box: 'content-box'});
});

</script>

<template>
    <div class="mapModal" id="modal1" v-if="landmarkHome">
        <div class="mapModalContainer">
            <div class="mapModalTitle">
                <h2>{{landmarkHome[0].landmark_name}}</h2>
                <hr>
            </div>
            <div class="mapModalDescription">
                <p>{{landmarkHome[0].landmark_header_description}}</p>
            </div>
            <div class="mapModalLink">
                <button class="mapModalButton" id="modal1Button">
                    <p>Read More</p>
                    <img src="/images/arrowBlack.svg" alt="arrow">
                </button>
            </div>
        </div>
    </div>

    <div class="mapModal" id="modal2" v-if="landmarkHome">
        <div class="mapModalContainer">
            <div class="mapModalTitle">
                <h2>{{landmarkHome[1].landmark_name}}</h2>
                <hr>
            </div>
            <div class="mapModalDescription">
                <p>{{landmarkHome[1].landmark_header_description}}</p>
            </div>
            <div class="mapModalLink">
                <button class="mapModalButton" id="modal2Button">
                    <p>Read More</p>
                    <img src="/images/arrowBlack.svg" alt="arrow">
                </button>
            </div>
        </div>
    </div>

    <div class="sidebarFull" id="modalBack">
        <p>&nbsp;</p>
    </div>


    <div>
        <div class="modelViewer" id="modelViewer">
            <canvas></canvas>
        </div>
    </div>
</template>

<style scoped>

canvas {
    width: 100%; 
    height: 100%; 

    display: block;
    position: relative;
    top: 0px;
    left: 0px;
}

</style>