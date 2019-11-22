var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//setup camera
var cameraTarget = {x:0, y:0, z:0};
camera.position.y = 70;
camera.position.z = 1000;
camera.rotation.x = -15 * Math.PI / 180;
//Setup Light
var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
//
var geometry = new THREE.SphereGeometry( 2, 10, 10);
var material = new THREE.MeshBasicMaterial({color:'red'});
var sphere = new THREE.Mesh(geometry,material);

// scene.add(sphere);

var plGeometry = new THREE.PlaneBufferGeometry( 2000,2000 , 50, 50);
var plMaterial = new THREE.MeshBasicMaterial( {color: 0x3c3951, side: THREE.DoubleSide} );
var terrain = new THREE.Mesh( plGeometry, plMaterial );
terrain.rotation.x = -Math.PI / 2;

scene.add(terrain);


var rectGeometry = new THREE.BoxGeometry(2.5,2.5,2.5);
var rectMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(rectGeometry,rectMaterial);
//
// scene.add( cube );

var peak = 60;
var vertices = terrain.geometry.attributes.position.array;
for (var i = 0; i <= vertices.length; i += 3) {
    vertices[i+2] = peak * Math.random();
}
terrain.geometry.attributes.position.needsUpdate = true;
terrain.geometry.computeVertexNormals();


function render() {
    renderer.render(scene,camera);
}


render();
// animate();

function  animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.02;

    cube.rotation.z += 0.01;
    cube.rotation.y += 0.03;

    terrain.rotation.x += 0.01;

    renderer.render(scene,camera)
}

// var animate = function () {
//     requestAnimationFrame( animate );
//     //
//     sphere.rotation.x += 0.01;
//     sphere.rotation.y += 0.01;
//
//     // sphere.rotation.x += 0.01;
//     // sphere.rotation.y += 0.01;
//
//     renderer.render( scene, camera );
// };
//
// animate();