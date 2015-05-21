if ( ! Detector.webgl ) Detector.addGetWebGLMessage();


var container, scene, camera, renderer;

function render() {
  renderer.render( scene, camera );
  $('body').trigger( "loaded");
}

function threePointLight() {
  var HemisphereLight = new THREE.HemisphereLight( 0x444444, 0xFEFFEA, 0.5 );
  scene.add( HemisphereLight );
  var directionalLight = new THREE.DirectionalLight( 0xAAAAAA );
  directionalLight.intensity = 1.2;
  camera.add(directionalLight)
  scene.add(camera);
}

function onWindowResize() {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  render();
}

function init() {

  scene = new THREE.Scene();

  // Change steps on grid
//  scene.add( new THREE.GridHelper( 200, 10 ) );
  container = document.getElementById('container');

  renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true	} );
  renderer.setClearColor( 0x000000, 0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  var aspect = container.offsetWidth / container.offsetHeight;
  camera = new THREE.PerspectiveCamera( 60, aspect, 0.01, 17500 );
  orbit = new THREE.OrbitControls( camera, container );
  orbit.addEventListener( 'change', render );
  camera.position.z = 200;
  camera.position.x = -200;
  camera.position.y = 200;
  var target = new THREE.Vector3( 0, 1, 0 );
  camera.lookAt( target );
  orbit.target = target;
  camera.updateProjectionMatrix();

  window.addEventListener( 'resize', onWindowResize, false );
  threePointLight();

//  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

  var OBJMTLLoader = new THREE.OBJMTLLoader();
  OBJMTLLoader.load( 'src/boat.obj', 'src/boat.mtl', function ( object ) {
    scene.add(object);
    object.position.z = 30;
    render();
  });
}

var magicObj = null;
init();

function toggleObj(show) {
  if(show) {
    scene.add(magicObj)
  } else {
    scene.remove(magicObj)
  }
  render();
}

$("body").on( "custom", function( event, param1, param2 ) {
  toggleObj(param1)
});