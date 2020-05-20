class Viewer {
  constructor() {
    this.scene;
    this.camera;
    this.render;
    this.y;
    this.x;
    const viewer = this;
    this.container = document.querySelector('#scene-container')
    this.clock = new THREE.Clock();

    this.init();

  }

  init()
  {
    const viewer = this;
    this.camera = new THREE.PerspectiveCamera(75,this.container.clientWidth/this.container.clientHeight,1,2000);
    //this.camera.position.set(0,100,700);
    this.camera.position.x=0;
    this.camera.position.y=0;
    this.scene = new THREE.Scene();
    this.scene.background= new THREE.Color('#abf0e9');

		let light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		light.position.set( 0, 200, 0 );
		this.scene.add( light );

		light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 200, 100 );
		light.castShadow = true;
		light.shadow.camera.top = 180;
		light.shadow.camera.bottom = -100;
		light.shadow.camera.left = -120;
		light.shadow.camera.right = 120;
		this.scene.add( light );

    this.renderCam();
    this.sphereShow();
    this.animate();
  }
  renderCam()
  {
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
		this.renderer.shadowMap.enabled = true;
    this.container.appendChild( this.renderer.domElement );
    this.controls= new THREE.OrbitControls(this.camera,this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;
    //this.controls.minDistance=10;
    //this.controls.maxDistance = 700;
    this.controls.update();
  }
  sphereShow()
  {
    const viewer = this;
    this.geometry = new THREE.SphereBufferGeometry( 100, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('summer.jpg')} );
    this.sphere = new THREE.Mesh( this.geometry, this.material );
    this.sphere.x=-1;
    this.scene.add( this.sphere )
  }
  animate()
  {
    const game = this;
    const dt = this.clock.getDelta();
    requestAnimationFrame(function(){game.animate();});
    this.renderer.render(this.scene,this.camera);
  }
}
