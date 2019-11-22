var camera, scene, renderer;

var mesh;
var shaderValue = {rate: 0};

var g_dt = 1/30;
var time = 0;

init();

animate();

function init() {
    THREE.ImageUtils.crossOrigin = "Anonymous";
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
    // reset camera
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
    camera.lookAt( new THREE.Vector3( 0, 0, -1 ) );

    scene = new THREE.Scene();

    /*
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 20;
    */
    //camera.position.y = 12;

    //camera.lookAt(scene.position);

    var geometry = new THREE.BufferGeometry();
    var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

    var positions = [];
    var colors = [];
    var indices_array = [];

    var numPtsX = 96;
    var numPtsY = 96;
    var numVerts = numPtsX * numPtsY;
    var deltaStep = 0.2;

    // generate verts
    var posXOffset = -numPtsX * deltaStep * 0.5;
    var posYOffset = -numPtsY * deltaStep * 0.5;

    for ( var y = 0; y < numPtsY; y++ )
    {
        for ( var x = 0; x < numPtsX; x++ )
        {
            var posX = posXOffset + x * deltaStep;
            var posY = posYOffset + y * deltaStep;
            var posZ = 0.0;

            positions.push(posX, posY,posZ);
            //colors.push(Math.random()*0.5+0.5, Math.random()*0.5+0.5, 1);
            colors.push(0.65,0.65,0.65);
            //colors.push(1.0,0.0,1.0);
        }
    }

    // generate indices
    for ( var y = 0; y < numPtsY-1; y++ )
    {
        var rowIndexOffset = y * numPtsX;

        for ( var x = 0; x < numPtsX-1; x++ )
        {
            var indexCurr = rowIndexOffset + x;
            var indexRight = indexCurr + 1;
            var indexTop = indexCurr + numPtsX;
            var indexTopRight = indexTop + 1;

            indices_array.push(indexCurr, indexRight);
            indices_array.push(indexCurr, indexTop);
            indices_array.push(indexCurr, indexTopRight);
        }
    }

    // top row - needs to stitch together
    for ( var x = 0; x < numPtsX-1; x++ )
    {
        var index0 = (numPtsY-1)*numPtsX + x;
        var index1 = index0 + 1;
        indices_array.push(index0, index1);
    }

    // right col - needs to stitch together
    for ( var y = 0; y < numPtsY-1; y++ )
    {
        var index0 = y*numPtsX + numPtsX-1;
        var index1 = index0 + numPtsX;
        indices_array.push(index0, index1);
    }

    // vert attrib
    geometry.addAttribute( 'index', new THREE.BufferAttribute( new Uint16Array( indices_array ), 1 ) );
    geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( positions ), 3 ) );
    geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( colors ), 3 ) );
    geometry.computeBoundingSphere();

    var attributes = {
        position: {	type: 'f', value: null },
        color: { type: 'f', value: null },
        //data: { type: 'f', value: null }
    };

    uniforms = {
        time: {type: 'f', value: 2.0},
        texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/ballon.jpg" ) },
        texture2:   { type: "t", value: THREE.ImageUtils.loadTexture( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/town-texture.jpg" ) },
        rate : {type: 'f', value: 0.0}
    };

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms: 		uniforms,
        attributes:     attributes,
        vertexShader:   document.getElementById( 'vertexShaderLines' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShaderLines' ).textContent,


        //blending: 		THREE.AdditiveBlending,
        depthTest: 		true,
        transparent:	false,
    });

    mesh = new THREE.Line( geometry, shaderMaterial, THREE.LinePieces );
    scene.add(mesh);


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame(animate);

    time += g_dt;

    var rate = (Math.cos(time/2) + 1) / 2;
    mesh.material.uniforms.time.value = time;
    mesh.material.uniforms.rate.value = rate;

    renderer.render(scene, camera);

}
