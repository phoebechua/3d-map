var container, stats;
var camera, scene, renderer, overRenderer;
var group;

var vector, mesh, atmosphere, point;
var mouse = {
    x: 0,
    y: 0
  },
  mouseOnDown = {
    x: 0,
    y: 0
  };
var rotation = {
    x: 0,
    y: 0
  },
  target = {
    x: Math.PI * 3 / 2,
    y: Math.PI / 6.0
  },
  targetOnDown = {
    x: 0,
    y: 0
  };
//var mouseX = 0, mouseY = 0;

var curZoomSpeed = 0;
var zoomSpeed = 50;

var distance = 100000,
  distanceTarget = 100000;
var padding = 40;
var PI_HALF = Math.PI / 2;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

  container = document.getElementById('container');
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 500;
  scene = new THREE.Scene();
  group = new THREE.Group();
  scene.add(group);


  // earth
  var loader = new THREE.TextureLoader();
  loader.load('map33.jpg', function(texture) {
    var geometry = new THREE.SphereGeometry(200, 40, 40);
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    var earth = new THREE.Mesh(geometry, material);
    group.add(earth);

  });

  var dir = new THREE.Vector3(50, 0, -100);
  var origin = new THREE.Vector3(0, -48, 0);
  var length = 230;
  var hex = 0xffff00;
  var headLength = 10;
  var headWidth = 10;
  var chr = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
  scene.add(chr);

  var dir = new THREE.Vector3(50, 0, -100);
  var origin = new THREE.Vector3(0, -43, 0);
  var length = 250;
  var hex = 0xffff00;
  var headLength = 10;
  var headWidth = 10;
  var mckl = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
  scene.add(mckl);

  var dir = new THREE.Vector3(30, 0, 100);
  var origin = new THREE.Vector3(-1, 30, 0);
  var length = 230;
  var hex = 0xffff00;
  var headLength = 10;
  var headWidth = 10;
  var mc = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
  scene.add(mc);

  var dir = new THREE.Vector3(30, 0, 100);
  var origin = new THREE.Vector3(-5, 30, 20);
  var length = 230;
  var hex = 0xffff00;
  var headLength = 10;
  var headWidth = 10;
  var psu = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
  scene.add(psu);

  var dir = new THREE.Vector3(30, 0, 100);
  var origin = new THREE.Vector3(-20, 30, 20);
  var length = 230;
  var hex = 0xffff00;
  var headLength = 10;
  var headWidth = 10;
  var wsu = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
  scene.add(wsu);

  var dir = new THREE.Vector3(210, 0, 50);
  var origin = new THREE.Vector3(0, -40, 0);
  var length = 230;
  var hex = 0xffff00;
  var headLength = 10;
  var headWidth = 10;
  var accra = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
  scene.add(accra);

  var dir = new THREE.Vector3(200, 0, 50);
  var origin = new THREE.Vector3(0, 60, 0);
  var length = 230;
  var hex = 0xffff00;
  var headLength = 10;
  var headWidth = 10;
  var uo = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
  scene.add(uo);

  // shadow
  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var context = canvas.getContext('2d');
  context.textAlign = 'center';
  context.font = '10px Arial';
  context.fillStyle = '#ffff00';
  context.fillText("PENN STATE UNIVERSITY", 65, 60);

  var mat = new THREE.SpriteMaterial({
    transparent: false,
    useScreenCoordinates: false,
    color: 0xffffff
  });
  var sp = new THREE.Sprite(mat);
  scene.add(mat);
  //shadow
  var texture = new THREE.CanvasTexture(canvas);
  var geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: 0.5
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 10;
  mesh.position.x = 70;
  mesh.position.z = 250;
  scene.add(mesh);

  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var context = canvas.getContext('2d');
  context.textAlign = 'center';
  context.font = '10px Arial';
  context.fillStyle = '#ffff00';
  context.fillText("WASHINGTON", 35, 35);
  var mat1 = new THREE.SpriteMaterial({
    transparent: false,
    useScreenCoordinates: true,
    color: 0xffffff
  });
  var sp = new THREE.Sprite(mat1);
  scene.add(mat1);
  //shadow
  var texture = new THREE.CanvasTexture(canvas);
  var geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: 0.5
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 25;
  mesh.position.x = 40;
  mesh.position.z = 250;
  scene.add(mesh);

  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var context = canvas.getContext('2d');
  context.textAlign = 'center';
  context.font = '10px Arial';
  context.fillStyle = '#ffff00';
  context.fillText("MESSIAH COLLEGE", 50, 50);
  var mat1 = new THREE.SpriteMaterial({
    transparent: false,
    useScreenCoordinates: true,
    color: 0xffffff
  });
  var sp = new THREE.Sprite(mat1);
  scene.add(mat1);
  //shadow
  var texture = new THREE.CanvasTexture(canvas);
  var geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: 0.5
  });
  var mesh1 = new THREE.Mesh(geometry, material);
  mesh1.position.y = 28;
  mesh1.position.x = 100;
  mesh1.position.z = 250;
  scene.add(mesh1);

  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var context = canvas.getContext('2d');
  context.textAlign = 'center';
  context.font = '10px Arial';
  context.fillStyle = '#ffff00';
  context.fillText("OXFORD UNIVERSITY", 60, 60);
  var mat1 = new THREE.SpriteMaterial({
    transparent: false,
    useScreenCoordinates: false,
    color: 0xffffff
  });
  var sp = new THREE.Sprite(mat1);
  scene.add(mat1);
  //shadow
  var texture = new THREE.CanvasTexture(canvas);
  var geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: 0.5
  });
  var mesh1 = new THREE.Mesh(geometry, material);
  mesh1.position.y = 70;
  mesh1.position.z = 40;
  mesh1.position.x = 250;
  mesh1.rotation.y = Math.PI / 2;
  scene.add(mesh1);

  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var context = canvas.getContext('2d');
  context.textAlign = 'center';
  context.font = '10px Arial';
  context.fillStyle = '#ffff00';
  context.fillText("ACCRA", 30, 30);
  var mat1 = new THREE.SpriteMaterial({
    transparent: false,
    useScreenCoordinates: false,
    color: 0xffffff
  });
  var sp = new THREE.Sprite(mat1);
  scene.add(mat1);
  //shadow
  var texture = new THREE.CanvasTexture(canvas);
  var geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: 0.5
  });
  var mesh1 = new THREE.Mesh(geometry, material);
  mesh1.position.y = -50;
  mesh1.position.z = 30;
  mesh1.position.x = 250;
  mesh1.rotation.y = Math.PI / 2;
  scene.add(mesh1);

  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var context = canvas.getContext('2d');
  context.textAlign = 'center';
  context.font = '10px Arial';
  context.fillStyle = '#ffff00';
  context.fillText("CHERAS", 30, 30);
  var mat1 = new THREE.SpriteMaterial({
    transparent: false,
    useScreenCoordinates: false,
    color: 0xffffff
  });
  var sp = new THREE.Sprite(mat1);
  scene.add(mat1);
  //shadow
  var texture = new THREE.CanvasTexture(canvas);
  var geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: 0.5
  });
  var mesh1 = new THREE.Mesh(geometry, material);
  mesh1.position.y = -40;
  mesh1.position.z = -250;
  mesh1.position.x = 80;
  mesh1.rotation.y = -2.3 * Math.PI / 2;
  scene.add(mesh1);

  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var context = canvas.getContext('2d');
  context.textAlign = 'center';
  context.font = '10px Arial';
  context.fillStyle = '#ffff00';
  context.fillText("MCKL", 30, 30);
  var mat1 = new THREE.SpriteMaterial({
    transparent: false,
    useScreenCoordinates: false,
    color: 0xffffff
  });
  var sp = new THREE.Sprite(mat1);
  scene.add(mat1);
  //shadow
  var texture = new THREE.CanvasTexture(canvas);
  var geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: 0.5
  });
  var mesh1 = new THREE.Mesh(geometry, material);
  mesh1.position.y = -90;
  mesh1.position.z = -250;
  mesh1.position.x = 100;
  mesh1.rotation.y = -2.3 * Math.PI / 2;
  scene.add(mesh1);


  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor(0xa9b9c1);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild(stats.domElement);
  // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  // window.addEventListener( 'resize', onWindowResize, false );
  container.appendChild(renderer.domElement);
  container.addEventListener('mousedown', onMouseDown, false);
  container.addEventListener('mousewheel', onMouseWheel, false);
  document.addEventListener('keydown', onDocumentKeyDown, false);
  window.addEventListener('resize', onWindowResize, false);
  container.addEventListener('mouseover', function() {
    overRenderer = true;
  }, false);
  container.addEventListener('mouseout', function() {
    overRenderer = false;
  }, false);
}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onMouseDown(event) {
  event.preventDefault();
  container.addEventListener('mousemove', onMouseMove, false);
  container.addEventListener('mouseup', onMouseUp, false);
  container.addEventListener('mouseout', onMouseOut, false);

  mouseOnDown.x = -event.clientX;
  mouseOnDown.y = event.clientY;

  targetOnDown.x = target.x;
  targetOnDown.y = target.y;

  console.log(mouseOnDown.x);
  console.log(mouseOnDown.y);
  console.log(mouseOnDown.z);


  container.style.cursor = 'move';
}

function onMouseMove(event) {
  mouse.x = -event.clientX;
  mouse.y = event.clientY;

  var zoomDamp = distance / 1000;

  target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
  target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

  target.y = target.y > PI_HALF ? PI_HALF : target.y;
  target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
}

function onMouseUp(event) {
  container.removeEventListener('mousemove', onMouseMove, false);
  container.removeEventListener('mouseup', onMouseUp, false);
  container.removeEventListener('mouseout', onMouseOut, false);
  container.style.cursor = 'auto';
}

function onMouseOut(event) {
  container.removeEventListener('mousemove', onMouseMove, false);
  container.removeEventListener('mouseup', onMouseUp, false);
  container.removeEventListener('mouseout', onMouseOut, false);
}


function onMouseWheel(event) {
  event.preventDefault();
  if (overRenderer) {
    zoom(event.wheelDeltaY * 0.3);
  }
  return false;
}

function onDocumentKeyDown(event) {
  switch (event.keyCode) {
    case 38:
      zoom(100);
      event.preventDefault();
      break;
    case 40:
      zoom(-100);
      event.preventDefault();
      break;
  }
}

function zoom(delta) {
  distanceTarget -= delta;
  distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
  distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
}


function animate() {

  requestAnimationFrame(animate);

  render();
  stats.update();

}

function render() {

  zoom(curZoomSpeed);

  rotation.x += (target.x - rotation.x) * 0.1;
  rotation.y += (target.y - rotation.y) * 0.1;
  distance += (distanceTarget - distance) * 0.3;

  camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
  camera.position.y = distance * Math.sin(rotation.y);
  camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);

  camera.lookAt(scene.position);
  // vector.copy(camera.position);

  renderer.clear();
  renderer.render(scene, camera);
  //  renderer.render(sceneAtmosphere, camera);

  // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  // camera.lookAt( scene.position );
  //
  // group.rotation.y -= 0.005;
  //
  // renderer.render( scene, camera );

}
