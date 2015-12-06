(function() {

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }

  var container;
  var camera, control, renderer;
  var water;
  var interval;

  var parameters = {
    containerId: 'container',
    width: 2000,
    height: 2000
  };

  var events = {
    loaded: {
      main: function () {
        $('body').trigger("loaded");
      },
      sidebar: null
    },
    progress: function (value) {
      gauge.set(value);
    }
  };

  init();

  function init() {

    initObjects();

    initRenderer();

    initContainer();

    initScene();

    initCamera();

    initControl();

    initLight();

    events.progress(40);

    initWater();

    events.progress(50);

    initSkybox();

    events.progress(70);

    var i = 70;
    interval = setInterval(function() {
      i++;
      events.progress(i);
    }, 1000);

    window.addEventListener('resize', onWindowResize, false);

  }

  function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function initContainer() {
    container = document.getElementById(parameters.containerId);
    container.appendChild(renderer.domElement);
  }

  function initScene() {
    scene = new THREE.Scene();
  }

  function initCamera() {
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 3000000);
    camera.position.set(290.1359517358557, 74.26827728358354, 167.37488610797544);
    scene.add(camera);
  }

  function initControl() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
    control.userPan = false;
    control.userPanSpeed = 0;
    control.maxDistance = 5000;
    control.maxPolarAngle = Math.PI * 0.495;
  }

  function initLight() {

    var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    light.position.set(-1, 1, -1);
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xAAAAAA);
    directionalLight.intensity = 1.2;
    camera.add(directionalLight);

  }

  function initWater() {
    var waterNormals = new THREE.ImageUtils.loadTexture('src/background/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    water = new THREE.Water(renderer, camera, scene, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 1.0,
      // sunDirection: light.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 50.0
    });

    var mirrorMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(parameters.width * 500, parameters.height * 500),
      water.material
    );

    mirrorMesh.add(water);
    mirrorMesh.rotation.x = -Math.PI * 0.5;
    scene.add(mirrorMesh);
  }

  function initSkybox() {
    var cubeMap = new THREE.CubeTexture([]);
    cubeMap.format = THREE.RGBFormat;
    cubeMap.flipY = false;

    var loader = new THREE.ImageLoader();
    loader.load('src/background/skyboxsun25degtest.png', function (image) {

      var getSide = function (x, y) {

        var size = 1024;

        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        var context = canvas.getContext('2d');
        context.drawImage(image, -x * size, -y * size);

        return canvas;

      };

      cubeMap.images[ 0 ] = getSide(2, 1); // px
      cubeMap.images[ 1 ] = getSide(0, 1); // nx
      cubeMap.images[ 2 ] = getSide(1, 0); // py
      cubeMap.images[ 3 ] = getSide(1, 2); // ny
      cubeMap.images[ 4 ] = getSide(1, 1); // pz
      cubeMap.images[ 5 ] = getSide(3, 1); // nz
      cubeMap.needsUpdate = true;

    });

    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = cubeMap;

    var skyBoxMaterial = new THREE.ShaderMaterial({
      fragmentShader: cubeShader.fragmentShader,
      vertexShader: cubeShader.vertexShader,
      uniforms: cubeShader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    var skyBox = new THREE.Mesh(
      new THREE.BoxGeometry(1000000, 1000000, 1000000),
      skyBoxMaterial
    );

    scene.add(skyBox);
  }

  function initObjects() {
    OBJMTLLoader.load('src/420.obj?1', 'src/420.mtl?1', function (object) {
      object.position.y = 10;
      scene.add(object);
    });

    //Уключины
    // OBJMTLLoader.load('src/details/veslo.obj', 'src/details/veslo.mtl', function(object) {
    //   object.position.y = 19;
    //   object.position.x = 0;
    //   object.position.z = -24;
    //   object.rotation.x = -0.5;
    //   scene.add(object);
    // });
    //
    // OBJMTLLoader.load('src/details/veslo.obj', 'src/details/veslo.mtl', function(object) {
    //   object.position.y = 19;
    //   object.position.x = 0;
    //   object.position.z = 24;
    //   object.rotation.x = 0.5;
    //   scene.add(object);
    // });

    //Уключины
    OBJMTLLoader.load('src/details/uklyuchina.obj', 'src/details/uklyuchina.mtl', function(object) {
      object.position.y = 18.2;
      object.position.x = -3;
      object.position.z = -24;
      object.rotation.x = -0.6;
      scene.add(object);
    });

    OBJMTLLoader.load('src/details/uklyuchina.obj', 'src/details/uklyuchina.mtl', function(object) {
      object.position.y = 18.2;
      object.position.x = -3;
      object.position.z = 24;
      object.rotation.x = 0.6;
      scene.add(object);
    });

    //Ручки
    //Передние ручки
    OBJMTLLoader.load('src/details/ruchka.obj', 'src/details/ruchka.mtl', function(object) {
      var ry = new THREE.Vector3(0, 1, 0),
          rx = new THREE.Vector3(1, 0, 0);
      object.position.y = 10;
      object.position.x = -55;
      object.position.z = 10;
      object.rotateOnAxis(ry, 1.5708);
      object.rotateOnAxis(rx, -2);
      scene.add(object);
    });

    OBJMTLLoader.load('src/details/ruchka.obj', 'src/details/ruchka.mtl', function(object) {
      var ry = new THREE.Vector3(0, 1, 0),
          rx = new THREE.Vector3(1, 0, 0);
      events.progress(33);
      object.position.y = 10;
      object.position.x = -55;
      object.position.z = -10;
      object.rotateOnAxis(ry, 1.5708);
      object.rotateOnAxis(rx, -2);
       scene.add(object);
    });

    //Центральные ручки
    OBJMTLLoader.load('src/details/ruchka.obj', 'src/details/ruchka.mtl', function(object) {
      object.position.y = 18.3;
      object.position.x = 10;
      object.position.z = -21;
      scene.add(object);
    });

    OBJMTLLoader.load('src/details/ruchka.obj', 'src/details/ruchka.mtl', function(object) {
      object.position.y = 18.3;
      object.position.x = 10;
      object.position.z = 21;
      scene.add(object);
    });

    //Задние ручки
    OBJMTLLoader.load('src/details/ruchka.obj', 'src/details/ruchka.mtl', function(object) {
      object.position.y = 13.5;
      object.position.x = 52;
      object.position.z = -18.2;
      object.rotation.x = 1.57;
      object.rotation.z = -0.55;
      object.scale.x = 0.9;
      object.scale.y = 0.9;
      object.scale.z = 0.9;
      scene.add(object);
    });

    OBJMTLLoader.load('src/details/ruchka.obj', 'src/details/ruchka.mtl', function(object) {
      object.position.y = 13.5;
      object.position.x = 52;
      object.position.z = 18.2;
      object.rotation.x = -1.57;
      object.rotation.z = -0.55;
      object.scale.x = 0.9;
      object.scale.y = 0.9;
      object.scale.z = 0.9;
      scene.add(object);
    });

    //Веревки
    OBJMTLLoader.load('src/details/ver.obj', 'src/details/ver.mtl', function(object) {
      object.position.y = 17.8;
      object.position.x = -35;
      object.position.z = -21;
      object.rotation.x = -0.5;
      object.rotation.z = 0.02;
      scene.add(object);
    });

    OBJMTLLoader.load('src/details/ver.obj', 'src/details/ver.mtl', function(object) {
      object.position.y = 17.8;
      object.position.x = -35;
      object.position.z = 21;
      object.rotation.x = -0.5;
      object.rotation.y = -0.03;
      object.rotation.z = 0.02;
      scene.add(object);
    });

    //Клапаны
    OBJMTLLoader.load('src/details/klapan.obj', 'src/details/klapan.mtl', function(object) {
      object.position.y = 12;
      object.position.x = -38;
      object.position.z = 8.2;
      scene.add(object);
    });

    OBJMTLLoader.load('src/details/klapan.obj', 'src/details/klapan.mtl', function(object) {
      object.position.y = 13;
      object.position.x = 35;
      object.position.z = 11;
      scene.add(object);
    });

    OBJMTLLoader.load('src/details/klapan.obj', 'src/details/klapan.mtl', function(object) {
      clearInterval(interval);
      events.progress(100);
      object.position.y = 15;
      object.position.x = 34;
      object.position.z = 15.5;
      object.rotation.x = -1.5708;
      scene.add(object);

      animate();

      setTimeout(function () {
        events.loaded.main();
        cameraAnimation();
      }, 500);
    });

  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    water.material.uniforms.time.value += 1 / 60;
    control.update();
    water.render();
    renderer.render(scene, camera);
  }

  function cameraAnimation() {

    var time = 0;
    var intervalID;
    intervalID = setInterval(function () {
      if (time > 3000) {
        clearInterval(intervalID)
      } else {
        frame(time);
        time = time + 15;
      }
    }, 4);

    function frame(time) {
      var x = (-288 - 290) / 3000;
      var y = (122 - 74) / 3000;
      var z = (141 - 167) / 3000;
      camera.position.set(290 + (x * time), 74 + (y * time), 167 + (z * time));
    }

  }

  function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

}());
