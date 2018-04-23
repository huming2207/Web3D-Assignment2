"use strict";
  
// returns square bipyramid (octahedron) object
function createSquareBipyramid(material)
{

}

// returns pentagonal bipyramid (decahedron) object
function createPentagonalBipyramid(material)
{
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0.5, 0));
    geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(-0.309, 0, 0.951));
    geometry.vertices.push(new THREE.Vector3(0.809, 0, 0.588));
    geometry.vertices.push(new THREE.Vector3(0.809, 0, -0.588));
    geometry.vertices.push(new THREE.Vector3(-0.309, 0, -0.951));
    geometry.vertices.push(new THREE.Vector3(0, -0.5, 0));
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
    body.add(createAxes(3));
    body.translateX(1);
    return body;
}

// returns joint axes object
function createJoint(name)
{

}

// returns a whole leg
function createLeg(end, side, material)
{

}

// returns the torso object
function createTorso(material)
{

}

// returns the head object
function createHead(material)
{

}

// Uses the other functions to create the frog
function createFrog(material)
{

}

// Create material
function createMaterial()
{
    var material = new THREE.LineBasicMaterial();
    material.vertexColors = THREE.VertexColors;
    return material;
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
    var scene = new THREE.Scene();
    scene.add(createAxes(5));
    
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 
    camera.position.z = 5;

    // Create material with color 0xff9966 as required
    var material = new THREE.MeshLambertMaterial({color: 0xff9966}); 

    // Add body
    var body = createPentagonalBipyramid(material);

    // Create light here
    var light = new THREE.AmbientLight(0xffffff);  
    scene.add(body); 
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
    document.body.appendChild(renderer.domElement); 
    renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio)
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


