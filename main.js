"use strict";

// Materials are set to global variables to as there are multiple usages across different functions
var mainMaterial;
var torsoMaterial;
var eyeMaterial;

// ThreeJS objects
var scene; // general scene
var camera;
var trackballControls;
var renderer;
var clock;

// Key binding
var selectedNodes; // e.g. hip or knee
var selectedArmLeg = "";
var selectedLeftRight = "";

// Animation
var timeCount = 0;
var enableAnimation = false;
var bodyXOffset = 0.01;
var bodyZOffset = 0;

// Toad count
var toadCount = 5;


// Merge components to body
function createBody(torsoNode) {
    // Torso
    torsoNode.name = "torso";

    // Left leg
    var leftLeg = createLeg(mainMaterial, "leftLeg");
    leftLeg.position.set(-1, 0, 0);
    leftLeg.rotation.y = 2.5;
    torsoNode.add(leftLeg);

    // Right leg
    var rightLeg = createLeg(mainMaterial, "rightLeg");
    rightLeg.position.set(-1, 0, 0);
    rightLeg.rotation.y = -2.5;
    torsoNode.add(rightLeg);

    // Left arm
    var leftArm = createArm(mainMaterial, "leftArm");
    leftArm.position.set(0.809, 0, -0.588);
    torsoNode.add(leftArm);

    // Right arm
    var rightArm = createArm(mainMaterial, "rightArm");
    rightArm.position.set(0.809, 0, 0.588);
    torsoNode.add(rightArm);

    // Upper head
    var upperHeadNode = createAxes(1);
    var upperHeadMesh = createHalfHead(mainMaterial);
    upperHeadNode.translateX(1.309); // Center of torso
    upperHeadNode.name = "upperHead";
    upperHeadNode.add(upperHeadMesh);
    torsoNode.add(upperHeadNode);

    // Eyes
    // Left eye
    var leftEyeNode = createEyeBall();
    leftEyeNode.position.set(0.1, 0.15, -0.15);
    leftEyeNode.name = "leftEye";
    upperHeadMesh.add(leftEyeNode);

    // Right eye
    var rightEyeNode = createEyeBall();
    rightEyeNode.position.set(0.1, 0.15, 0.15);
    rightEyeNode.name = "rightEye";
    upperHeadMesh.add(rightEyeNode);

    // Lower head
    var lowerHeadNode = createAxes(1);
    var lowerHeadMesh = createHalfHead(mainMaterial);
    lowerHeadNode.rotateX(3.14159); // Turns around to be lower part
    lowerHeadNode.position.set(1.309, -0.05, 0);
    lowerHeadNode.name = "lowerHead";
    lowerHeadNode.add(lowerHeadMesh);
    torsoNode.add(lowerHeadNode);

    return torsoNode;
}

// Create axes for each component
function createAxes(length) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(length, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, length, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, length));
    geometry.colors.push(new THREE.Color(0xff0000));
    geometry.colors.push(new THREE.Color(0xff0000));
    geometry.colors.push(new THREE.Color(0x00ff00));
    geometry.colors.push(new THREE.Color(0x00ff00));
    geometry.colors.push(new THREE.Color(0x0000ff));
    geometry.colors.push(new THREE.Color(0x0000ff));

    var material = new THREE.LineBasicMaterial();
    material.vertexColors = THREE.VertexColors;

    var axes = new THREE.LineSegments(geometry, material);
    axes.name = "axes";

    return axes;
}

// "Main" function
function init() {
    console.log("Initializing...");

    // Create scene and camera
    scene = new THREE.Scene();
    scene.add(createAxes(5));
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create material with color 0xff9966 as required
    mainMaterial = new THREE.MeshLambertMaterial({color: 0x378015});
    torsoMaterial = new THREE.MeshLambertMaterial();
    eyeMaterial = new THREE.MeshLambertMaterial({color: 0x000000});

    // Create multiple frogs with random positions
    for(var toadIndex = 0; toadIndex < toadCount; toadIndex += 1) {
        var randomX = Math.round(Math.random() * 20); // Random X axis
        var randomZ = Math.round(Math.random() * 20); // Random Z axis
        var torsoNode = createTorso(torsoMaterial);
        var body = createBody(torsoNode);
        body.position.set(randomX, 0, randomZ);
        scene.add(body);
    }


    // Add pond
    var pond = createPond();
    pond.position.set(0, -1.5, 0);

    // Create light here
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    scene.add(pond);

    // Log out all body stuff for debugging
    console.log(body);

    // Start clock
    clock = new THREE.Clock();
    clock.start();

    // Create trackball (mouse) control
    trackballControls = new THREE.TrackballControls(camera);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.0;
    trackballControls.panSpeed = 1.0;
    trackballControls.staticMoving = true;
    trackballControls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    // Start to render something...
    // Create renderer
    renderer = new THREE.WebGLRenderer(3);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x404040, 1);
    renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    requestAnimationFrame(animate);
    trackballControls.update();
}

function animate() {

    if(enableAnimation) {
        // Reset time counter every 1.5 seconds
        if(timeCount > 1.5) {
            timeCount = 0;
        }

        timeCount += clock.getDelta();

        // Rotate ankles
        ankleRotater(timeCount);

        //  Rotate hips
        leftLegRotater(timeCount);
        rightLegRotater(timeCount);
        armHipRotater(timeCount);

        // Move paws
        anklePawMover(timeCount);

        // Move body
        bodyMover(timeCount);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    trackballControls.update();
}




function increaseJointZ() {
    // Default minimum rotation is 0 rad (0 deg)
    var maximum = 0;

    // Knees and ankles are 3.14 rad (180 deg)
    if (selectedNodes === "knee" || selectedNodes === "ankle") {
        maximum = 3.14;
    }

    scene.traverse(function (object) {
        if (object.name.includes(selectedNodes)
            && object.name.includes(selectedArmLeg)
            && object.name.includes(selectedLeftRight)
            && object.rotation.z < maximum)
        {
            object.rotation.z = object.rotation.z + 0.1; // Press once for +0.1 rad increase
            console.log("Rotating z-axis for " + object.name + ", radian value " + String(object.rotation.z));
        }
    });
}

function decreaseJointZ() {
    // Default minimum rotation is -1.57 rad (-90 deg)
    var minimum = -1.57;

    // Default minimum rotation is -3.14 rad (-180 deg)
    if (selectedNodes === "knee" || selectedNodes === "ankle") {
        minimum = -3.14;
    }

    scene.traverse(function (object) {
        if (object.name.includes(selectedNodes)
            && object.name.includes(selectedArmLeg)
            && object.name.includes(selectedLeftRight)
            && object.rotation.z > minimum)
        {
            object.rotation.z = object.rotation.z - 0.1; // Press once for -0.1 rad decrease
            console.log("Rotating z-axis f or " + object.name + ", radian value " + String(object.rotation.z));
        }
    });
}



