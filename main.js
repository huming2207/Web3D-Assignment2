"use strict";

var mainMaterial;
var torsoMaterial;
var eyeMaterial;

var scene;

// Register key stroke event handlers
document.onkeyup = onKeyUp;
document.onkeydown = onKeyDown;
  
// returns square bipyramid (octahedron) object
function createLegArmNode(material)
{
    var geometry = new THREE.Geometry();

    // Vectors, equals to "Coordinate" node in x3dom
    geometry.vertices.push(new THREE.Vector3(0, 0.25, 0));
    geometry.vertices.push(new THREE.Vector3(-0.5, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.25));
    geometry.vertices.push(new THREE.Vector3(0.5, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0.25));
    geometry.vertices.push(new THREE.Vector3(0, -0.25, 0));

    // Faces, equals to "IndexedFaceSet" node in x3dom
    geometry.faces.push(new THREE.Face3(1, 4, 0));
    geometry.faces.push(new THREE.Face3(1, 0, 2));
    geometry.faces.push(new THREE.Face3(2, 0, 3));
    geometry.faces.push(new THREE.Face3(3, 0, 4));
    geometry.faces.push(new THREE.Face3(4, 1, 5));
    geometry.faces.push(new THREE.Face3(1, 2, 5));
    geometry.faces.push(new THREE.Face3(2, 3, 5));
    geometry.faces.push(new THREE.Face3(3, 4, 5));

    geometry.computeFaceNormals();

    // Create the mesh with geometry set above and material passed in before
    var arm = new THREE.Mesh(geometry, material); 
    arm.add(createAxes(3));
    return arm;
}

function createEyeBall()
{
    var geometry = new THREE.Geometry();

    // Vectors, equals to "Coordinate" node in x3dom
    geometry.vertices.push(new THREE.Vector3(0, 0.15, 0));
    geometry.vertices.push(new THREE.Vector3(-0.15, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.15));
    geometry.vertices.push(new THREE.Vector3(0.15, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0.15));
    geometry.vertices.push(new THREE.Vector3(0, -0.15, 0));

    // Faces, equals to "IndexedFaceSet" node in x3dom
    geometry.faces.push(new THREE.Face3(1, 4, 0));
    geometry.faces.push(new THREE.Face3(1, 0, 2));
    geometry.faces.push(new THREE.Face3(2, 0, 3));
    geometry.faces.push(new THREE.Face3(3, 0, 4));
    geometry.faces.push(new THREE.Face3(4, 1, 5));
    geometry.faces.push(new THREE.Face3(1, 5, 5));
    geometry.faces.push(new THREE.Face3(2, 3, 5));
    geometry.faces.push(new THREE.Face3(3, 4, 5));

    geometry.computeFaceNormals();

    // Create the mesh with geometry set above and material passed in before
    var eye = new THREE.Mesh(geometry, eyeMaterial);
    eye.add(createAxes(1));
    return eye;
}

// returns a half head ("slice" the head at x/z axis) object
function createHalfHead(material)
{
    var geometry = new THREE.Geometry();

    // Vectors
    geometry.vertices.push(new THREE.Vector3(0, 0.25, 0));
    geometry.vertices.push(new THREE.Vector3(-0.5, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.25));
    geometry.vertices.push(new THREE.Vector3(0.5, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0.25));

    // Faces
    geometry.faces.push(new THREE.Face3(1, 4, 0));
    geometry.faces.push(new THREE.Face3(1, 0, 2));
    geometry.faces.push(new THREE.Face3(2, 0, 3));
    geometry.faces.push(new THREE.Face3(3, 0, 4));
    geometry.faces.push(new THREE.Face3(1, 2, 3));
    geometry.faces.push(new THREE.Face3(1, 3, 4));

    geometry.computeFaceNormals();

    var halfHeadNode = new THREE.Mesh(geometry, material);
    halfHeadNode.add(createAxes(2));
    return halfHeadNode;
}

// returns pentagonal bipyramid (decahedron) object
function createTorso(material)
{
    var geometry = new THREE.Geometry();

    // Vectors, equals to "Coordinate" node in x3dom
    geometry.vertices.push(new THREE.Vector3(0, 0.5, 0));
    geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(-0.309, 0, 0.951));
    geometry.vertices.push(new THREE.Vector3(0.809, 0, 0.588));
    geometry.vertices.push(new THREE.Vector3(0.809, 0, -0.588));
    geometry.vertices.push(new THREE.Vector3(-0.309, 0, -0.951));
    geometry.vertices.push(new THREE.Vector3(0, -0.5, 0));
    
    // Faces, equals to "IndexedFaceSet" node in x3dom
    geometry.faces.push(new THREE.Face3(1, 0, 5));
    geometry.faces.push(new THREE.Face3(1, 2, 0));
    geometry.faces.push(new THREE.Face3(2, 3, 0));
    geometry.faces.push(new THREE.Face3(3, 4, 0));
    geometry.faces.push(new THREE.Face3(4, 5, 0));
    geometry.faces.push(new THREE.Face3(5, 6, 1));
    geometry.faces.push(new THREE.Face3(6, 2, 1));
    geometry.faces.push(new THREE.Face3(6, 3, 2));
    geometry.faces.push(new THREE.Face3(6, 4, 3));
    geometry.faces.push(new THREE.Face3(6, 5, 4));
    geometry.computeFaceNormals();

    // Create the mesh with geometry set above and material passed in before
    var body = new THREE.Mesh(geometry, material);

    // Map the texture
    // Apply UV for mapping

    // Array of vectors to map
    var uvList = [
        new THREE.Vector2(0.5, 0.5),
        new THREE.Vector2(0, 0.5),
        new THREE.Vector2(0.345, 0.975),
        new THREE.Vector2(0.905, 0.795),
        new THREE.Vector2(0.905, 0.205),
        new THREE.Vector2(0.345, 0.025),
        new THREE.Vector2(0.5, 0.5)
    ];

    // Add mapping to face at (x, y, z)
    geometry.faceVertexUvs[0].push([uvList[1], uvList[0], uvList[5]]);
    geometry.faceVertexUvs[0].push([uvList[1], uvList[2], uvList[0]]);
    geometry.faceVertexUvs[0].push([uvList[2], uvList[3], uvList[0]]);
    geometry.faceVertexUvs[0].push([uvList[3], uvList[4], uvList[0]]);
    geometry.faceVertexUvs[0].push([uvList[4], uvList[5], uvList[0]]);
    geometry.faceVertexUvs[0].push([uvList[5], uvList[6], uvList[1]]);
    geometry.faceVertexUvs[0].push([uvList[6], uvList[2], uvList[1]]);
    geometry.faceVertexUvs[0].push([uvList[6], uvList[3], uvList[2]]);
    geometry.faceVertexUvs[0].push([uvList[6], uvList[4], uvList[3]]);
    geometry.faceVertexUvs[0].push([uvList[6], uvList[5], uvList[4]]);

    // Initialise the texture loader
    var textureLoader = new THREE.TextureLoader();

    // Load the texture
    body.material.map = textureLoader.load("./penta.png");
    body.add(createAxes(3));
    return body;
}

function createPaw(material)
{
    var geometry = new THREE.Geometry();
    
    // Vectors again, equals to "Coordinate" node in x3dom
    geometry.vertices.push(new THREE.Vector3(0, 0, 0.25));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.25));
    geometry.vertices.push(new THREE.Vector3(-0.5, 0, 0));

    // Faces, equals to IndexedFaceSet node in x3dom
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(2, 1, 0));
    geometry.computeFaceNormals();

    // Create the mesh with geometry set above and material pssed in before
    var paw = new THREE.Mesh(geometry, material);
    paw.add(createAxes(3));
    scene.add(paw);
    return paw;
}

// Create pond
function createPond(material)
{
    var geometry = new THREE.BoxGeometry(20, 20, 0.1);
    var pond = new THREE.Mesh(geometry, material);
    pond.add(createAxes(5));
    return pond;
}

// Create leg, which is a map with 3 items
function createLeg(material)
{
    var legMap = new Map();

    // Hip node: the one near torso
    var hipNode = createLegArmNode(material);
    hipNode.position.set(0, 0, 0);
    legMap.set("hip" ,hipNode);

    // Knee node: the one in the middle
    var kneeNode = createLegArmNode(material);
    kneeNode.position.set(1, 0, 0);
    legMap.set("knee", kneeNode);
    hipNode.add(kneeNode);

    // Ankle Node: the one near the foot/paw/whatever
    var ankleNode = createLegArmNode(material);
    ankleNode.position.set(1, 0, 0);
    legMap.set("ankle", ankleNode);
    kneeNode.add(ankleNode);
    
    // Paw node: the hand for the toad
    var pawNode = createPaw(material);
    pawNode.position.set(1, 0, 0);
    legMap.set("paw", pawNode);
    ankleNode.add(pawNode);

    return legMap;
}

// Create leg, which is a map with 3 items
// To-do: add translation
function createArm(material)
{
    var armMap = new Map();

    // Hip node: the one near torso
    var hipNode = createLegArmNode(material);
    hipNode.position.set(0, 0, 0);
    armMap.set("hip" ,hipNode);

    // Ankle Node: the one near the foot/paw/whatever
    var ankleNode = createLegArmNode(material);
    ankleNode.position.set(1, 0, 0);
    hipNode.add(ankleNode);
    armMap.set("ankle", ankleNode);    

    // Paw node: the hand for the toad
    var pawNode = createPaw(material);
    pawNode.position.set(1, 0, 0);
    ankleNode.add(pawNode);
    armMap.set("paw", pawNode);

    return armMap;
}

// Merge components to body
function createBody(torsoNode)
{
    var bodyMap = new Map();

    // Torso
    bodyMap.set("torso", torsoNode);

    // Left leg
    var leftLeg = createLeg(mainMaterial);
    var leftLegHipNode = leftLeg.get("hip");
    leftLegHipNode.position.set(-1.2, 0, -0.45);
    leftLegHipNode.rotateY(2.5);
    torsoNode.add(leftLegHipNode);
    bodyMap.set("leftLeg", leftLeg);

    // Right leg
    var rightLeg = createLeg(mainMaterial);
    var rightLegHipNode = rightLeg.get("hip");
    rightLegHipNode.position.set(-1.2, 0, 0.45);
    rightLegHipNode.rotateY(-2.5);
    torsoNode.add(rightLegHipNode);
    bodyMap.set("rightLeg", rightLeg);

    // Left arm
    var leftArm = createArm(mainMaterial);
    var leftArmHipNode = leftArm.get("hip");
    leftArmHipNode.position.set(1.309, 0, -0.588);
    torsoNode.add(leftArmHipNode);
    bodyMap.set("leftArm", leftArm);

    // Right arm
    var rightArm = createArm(mainMaterial);
    var rightArmHipNode = rightArm.get("hip");
    rightArmHipNode.position.set(1.309, 0, 0.588);
    torsoNode.add(rightArmHipNode);
    bodyMap.set("rightArm", rightArm);

    // Upper head
    var upperHeadNode = createHalfHead(mainMaterial);
    upperHeadNode.translateX(1.309); // Center of torso
    torsoNode.add(upperHeadNode);

    // Eyes
    // Left eye
    var leftEyeNode = createEyeBall();
    leftEyeNode.position.set(0.1, 0.15, -0.15);
    upperHeadNode.add(leftEyeNode);

    // Right eye
    var rightEyeNode = createEyeBall();
    rightEyeNode.position.set(0.1, 0.15, 0.15);
    upperHeadNode.add(rightEyeNode);
    bodyMap.set("upperHead", upperHeadNode);

    // Lower head
    var lowerHeadNode = createHalfHead(mainMaterial);
    lowerHeadNode.rotateX(3.14159); // Turns around to be lower part
    lowerHeadNode.position.set(1.309, -0.1, 0);
    bodyMap.set("lowerHead", lowerHeadNode);
    torsoNode.add(lowerHeadNode);

    return bodyMap;
}

// Create axes for each component
function createAxes(length)
{
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
function init()
{
    console.log("Initializing...");

    // Create scene and camera
    scene = new THREE.Scene();
    scene.add(createAxes(5));
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 
    camera.position.z = 5;

    // Create material with color 0xff9966 as required
    mainMaterial = new THREE.MeshLambertMaterial({color: 0x378015});
    torsoMaterial = new THREE.MeshLambertMaterial();
    eyeMaterial = new THREE.MeshLambertMaterial({color: 0x000000});

    // Add body
    var torsoNode = createTorso(torsoMaterial);
    var body = createBody(torsoNode);
    // Create light here
    var light = new THREE.AmbientLight(0xffffff);  
    scene.add(body.get("torso"));
    scene.add(light);

    // Create trackball (mouse) control
    var controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
    controls.staticMoving = true;
    controls.addEventListener('change', render);

    // Start to render something...
    // Create renderer
    var renderer = new THREE.WebGLRenderer(3);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x404040, 1);
    renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    requestAnimationFrame(animate);
    controls.update();

    function render() 
    {
        renderer.render(scene, camera);
    }

    function animate()
    {
        render();
        requestAnimationFrame(animate);
        controls.update();
    }
}

// Handle key up event (restore status)
function onKeyUp(event)
{
    switch(event.keyCode) {

        // #77, key M, wire frame mode
        case 77: {
            mainMaterial.wireframe = false;
            torsoMaterial.wireframe = false;
            eyeMaterial.wireframe = false;
            break;
        }

        // #76, key L, basic debug mode
        case 76: {
            mainMaterial.color.setHex(0x378015); // Set back to white
            break;
        }
    }

}

// Handle key down event (apply status)
// Key code reference from MDN: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
function onKeyDown(event)
{
    switch(event.keyCode) {

        // #77, key M, wire frame mode
        case 77: {
            mainMaterial.wireframe = true;
            torsoMaterial.wireframe = true;
            eyeMaterial.wireframe = true;
            break;
        }

        // #76, key L, basic debug mode
        case 76: {
            mainMaterial.color.setHex(0xff9966);
            break;
        }
    }
}

