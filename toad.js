"use strict";

// returns square bipyramid (octahedron) object
function createLegArmNode(material) {
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
    return new THREE.Mesh(geometry, material);
}

function createEyeBall() {
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
function createHalfHead(material) {
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

    return new THREE.Mesh(geometry, material);
}

// returns pentagonal bipyramid (decahedron) object
function createTorso(material) {
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

    // Map the texture, apply UV for mapping
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

    // Add mapping to face at (UV[faceId], UV[faceId], UV[faceId])
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

function createPaw(material) {
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
    scene.add(paw);
    return paw;
}

// Create pond
function createPond() {
    var geometry = new THREE.CylinderGeometry(35, 35, 0.5, 128, 128, false, 0);
    var material = new THREE.MeshLambertMaterial({color: 0x33aaaa});
    return new THREE.Mesh(geometry, material);
}

// Create leg, which is a map with 3 items
function createLeg(material, name) {
    // Hip node: the one near torso
    var hipNode = createAxes(1);
    var hipMesh = createLegArmNode(material);
    hipNode.position.set(0, 0, 0);
    hipMesh.position.set(0.5, 0, 0);
    hipNode.name = name + "_hip";
    hipNode.add(hipMesh);

    // Knee node: the one in the middle
    var kneeNode = createAxes(1);
    var kneeMesh = createLegArmNode(material);
    kneeNode.position.set(1, 0, 0);
    kneeMesh.position.set(0.5, 0, 0);
    kneeNode.name = name + "_knee";
    kneeNode.add(kneeMesh);
    hipNode.add(kneeNode);

    // Ankle Node: the one near the foot/paw/whatever
    var ankleNode = createAxes(1);
    var ankleMesh = createLegArmNode(material);
    ankleNode.position.set(1, 0, 0);
    ankleMesh.position.set(0.5, 0, 0);
    ankleNode.name = name + "_ankle";
    ankleNode.add(ankleMesh);
    kneeNode.add(ankleNode);

    // Paw node: the hand for the toad
    var pawNode = createAxes(1);
    var pawMesh = createPaw(material);
    pawNode.position.set(1, 0, 0);
    pawMesh.position.set(0.5, 0, 0);
    pawNode.name = name + "_paw";
    pawNode.add(pawMesh);
    ankleNode.add(pawNode);

    return hipNode;
}

// Create leg, which is a map with 3 items
function createArm(material, name) {
    // Hip node: the one near torso
    var hipNode = createAxes(1);
    var hipMesh = createLegArmNode(material);
    hipNode.position.set(0, 0, 0);
    hipMesh.position.set(0.5, 0, 0);
    hipNode.name = name + "_hip";
    hipNode.add(hipMesh);

    // Ankle Node: the one near the foot/paw/whatever
    var ankleNode = createAxes(1);
    var ankleMesh = createLegArmNode(material);
    ankleNode.position.set(1, 0, 0);
    ankleMesh.position.set(0.5, 0, 0);
    ankleNode.name = name + "_ankle";
    ankleNode.add(ankleMesh);
    hipNode.add(ankleNode);

    // Paw node: the hand for the toad
    var pawNode = createAxes(1);
    var pawMesh = createPaw(material);
    pawNode.position.set(1, 0, 0);
    pawMesh.position.set(0.5, 0, 0);
    pawNode.name = name + "_paw";
    pawNode.add(pawMesh);
    ankleNode.add(pawNode);

    return hipNode;
}
