if ( ! Detector.webgl ) Detector.addGetWebGLMessage();


var container, scene, camera, renderer;

function render() {
  renderer.render( scene, camera );
  $('body').trigger( "loaded");
}

function threePointLight() {

  var directionalLight = new THREE.DirectionalLight( 0xb8b8b8 );
  directionalLight.position.set(1, 1, 1).normalize();
  directionalLight.intensity = 1.0;
  scene.add( directionalLight );

  directionalLight = new THREE.DirectionalLight( 0xFFFFFF );
  directionalLight.position.set(-1, 0.6, 0.5).normalize();
  directionalLight.intensity = 0.5;
  scene.add(directionalLight);

  directionalLight = new THREE.DirectionalLight();
  directionalLight.position.set(-0.3, 0.6, -0.8).normalize( 0xE91111 );
  directionalLight.intensity = 0.45;
  scene.add(directionalLight);

}

function setupScene( result ) {
  scene = result;
  scene.add( new THREE.GridHelper( 10, 2.5 ) );
  threePointLight();
  render();
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
  scene.add( new THREE.GridHelper( 3000, 200 ) );
  container = document.getElementById('container');

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true	} );
  renderer.setClearColor( 0x000000, 0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  var aspect = container.offsetWidth / container.offsetHeight;
  camera = new THREE.PerspectiveCamera( 60, aspect, 0.01, 17500 );
  orbit = new THREE.OrbitControls( camera, container );
  orbit.addEventListener( 'change', render );
  camera.position.z = -4000;
  camera.position.x = 4000;
  camera.position.y = 4000;
  var target = new THREE.Vector3( 0, 1, 0 );
  camera.lookAt( target );
  orbit.target = target;
  camera.updateProjectionMatrix();

  window.addEventListener( 'resize', onWindowResize, false );
  threePointLight();

  var loader = new THREE.OBJMTLLoader();
  loader.load( 'src/boat.obj', 'src/boat.mtl', function ( object ) {
    object.position.y = 400;
//    object.scale.x = 0.3
//    object.scale.y = 0.3
//    object.scale.z = 0.3
    scene.add(object);
    render();
  });
  loader.load( 'src/boat.obj', 'src/boat.mtl', function ( object ) {
    object.position.y = 100;
    object.position.x = 800;
    object.position.z = 400;
    magicObj = object
//    render();
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