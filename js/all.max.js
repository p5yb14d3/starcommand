/**
 * Copyright 2018 p5yb14d3. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 *   3. Audio and sound files cannot be redistributed.
 *
 * https://github.com/p5yb14d3/starcommand
 */
 
var ui;
var sound_init = false;

$(document).ready(function() { 
	ui = new classUI();
	ui.init();
	ui.space.drawObject();
	$("html").click(function(){
		if (sound_init == false) {
			sound_init = true;
			ui.toggleSound();
		}
	});
});

function classSpace(ui) {
	hide3DCssSolarSystem();
	var space = this;
	var front = {};
	var hover = {};
	var objects = {};
	var object = "";
	var object_name = "";
	this.ui = ui;
	this.wireframe = false;
	this.force_controls = true; // ALLOWS FOR MANUAL POSITIONING OF PLANETS
	this.allow_controls_affect_camera = true; 
	this.object_name = "earth";
	
	var container = document.getElementById('container');
	var sunflareColor = new THREE.Color( 0xffffff );

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(container);
		return;
	}

	// PLANET PARAMS
	front["sun"] = {'name':'sun', 'radius':30, 'scale':8, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0, 'directional_light': true, 'directional_position': [5, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 10, 'ambient_color':0x111111, 'ambient_intensity':1, 'texture':'textures/sunmap.jpg'};
	front["mercury"] = {'name':'mercury', 'radius':30, 'scale':3, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.0005, 'directional_light': true, 'directional_position': [5, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 5, 'ambient_color':0xffffff, 'ambient_intensity':1, 'texture':'textures/mercurymap.jpg'};
	front["venus"] = {'name':'venus', 'radius':30, 'scale':5, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.0001, 'directional_light': false, 'directional_position': [5, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 10, 'ambient_color':0xffffff, 'ambient_intensity':1, 'texture':'textures/venusmap.jpg'};
	front["earth"] = {'name':'earth', 'radius':30, 'scale':5, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.001, 'directional_light': false, 'directional_position': [5, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 10, 'ambient_color':0xffffff, 'ambient_intensity':1, 'texture':'textures/land_ocean_ice_cloud_2048.jpg'};
	front["moon"] = {'name':'moon', 'radius':30, 'scale':3.32, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0, 'directional_light': true, 'directional_position': [0, 0, 10], 'directional_color': 0x333333, 'directional_intensity': 10, 'ambient_color':0x333333, 'ambient_intensity':1, 'texture':'textures/moonmap1k.jpg'};
	front["mars"] = {'name':'mars', 'radius':30, 'scale':4.66, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.001, 'directional_light': false, 'directional_position': [5, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 10, 'ambient_color':0xffffff, 'ambient_intensity':1, 'texture':'textures/marsmap1k.jpg'};
	front["jupiter"] = {'name':'jupiter', 'radius':30, 'scale':10.66, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.001, 'directional_light': true, 'directional_position': [5, 3, 5], 'directional_color': 0x0f0f0f, 'directional_intensity': 13, 'ambient_color':0x111111, 'ambient_intensity':1, 'texture':'textures/jupitermap.jpg'};
	front["saturn"] = {'name':'saturn', 'radius':30, 'scale':9.33, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.002, 'directional_light': true, 'directional_position': [-7, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':1, 'texture':'textures/saturnmap.jpg'};
	front["uranus"] = {'name':'uranus', 'radius':30, 'scale':6.66, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.001, 'directional_light': true, 'directional_position': [5, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 10, 'ambient_color':0x1a1a1a, 'ambient_intensity':1, 'texture':'textures/uranusmap.jpg'};
	front["neptune"] = {'name':'neptune', 'radius':30, 'scale':6.66, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.001, 'directional_light': true, 'directional_position': [5, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 10, 'ambient_color':0x1a1a1a, 'ambient_intensity':1, 'texture':'textures/neptunemap.jpg'};
	front["pluto"] = {'name':'pluto', 'radius':30, 'scale':2, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.0008, 'directional_light': true, 'directional_position': [5, 3, 5], 'directional_color': 0x111111, 'directional_intensity': 10, 'ambient_color':0x1a1a1a, 'ambient_intensity':1, 'texture':'textures/plutomap1k.jpg'};
	front["asteroids"] = {'name':'asteroids', 'radius':30, 'scale':0.1, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.001, 'directional_light': true, 'directional_position': [5, 3, 5], 'directional_color': 0xff7f24, 'directional_intensity': 5, 'ambient_color':0xffffff, 'ambient_intensity':10, 'texture':'textures/sunmap.jpg'};
	
	// PLANET HOVER PARAMS
	hover["sun"] = {'name':'sun', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':'off', 'rotation': 0, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/sunmap.jpg'};
	hover["mercury"] = {'name':'mercury', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/mercurymap.jpg'};
	hover["venus"] = {'name':'venus', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/venusmap.jpg'};
	hover["earth"] = {'name':'earth', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/land_ocean_ice_cloud_2048.jpg'};
	hover["moon"] = {'name':'moon', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/moonmap1k.jpg'};
	hover["mars"] = {'name':'mars', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/marsmap1k.jpg'};
	hover["jupiter"] = {'name':'jupiter', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/jupitermap.jpg'};
	hover["saturn"] = {'name':'saturn', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/saturnmap.jpg'};
	hover["uranus"] = {'name':'uranus', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/uranusmap.jpg'};
	hover["neptune"] = {'name':'neptune', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/neptunemap.jpg'};
	hover["pluto"] = {'name':'pluto', 'radius':30, 'scale':1, 'segments': 100, 'position':[0,-32,740], 'rotate':[0, 0, 90], 'rotation': 0.00015, 'directional_light': true, 'directional_position': [0,120,-150], 'directional_color': 0xcccccc, 'directional_intensity': 10, 'ambient_color':0x222222, 'ambient_intensity':0, 'texture':'textures/plutomap1k.jpg'};
	hover["asteroids"] = {'name':'asteroids', 'radius':30, 'scale':0.1, 'segments': 100, 'position':[0,0,0], 'rotate':[0, 0, 90], 'rotation': 0.001, 'directional_light': true, 'directional_position': [5, 3, 5], 'directional_color': 0xff7f24, 'directional_intensity': 5, 'ambient_color':0xffffff, 'ambient_intensity':10, 'texture':'textures/sunmap.jpg'};
	
	var objects = {"front":front, "hover":hover};
	var view_previous = "";
	var view = "front";
	
	var default_radius = 200;
	var default_segments = 100
	
	var scene = new THREE.Scene();
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	// FOR ASTEROIDS
	renderer.setClearColor(0x000000);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		
	var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
	
	var ambient = new THREE.AmbientLight();
	scene.add(ambient);
	
	var light = new THREE.DirectionalLight();
	scene.add(light);
	
	var controls = new THREE.TrackballControls(camera);
	controls.minDistance = 500;
	controls.maxDistance = 1000;
	controls.rotateSpeed = 0.005;
	controls.noPan = true;
	
	// SET UP SHADER
	var oldTime = new Date().getTime();
	
	var uniforms1 = {
		time: 	{ value: 1.0 },
		scale: 	{ value: 1.5 }
	};

	if (view == "hover") var vertexShader = "vertexShader_hover"; else var vertexShader = "vertexShader1";
	var material = new THREE.ShaderMaterial( {
		uniforms: uniforms1,
		fragmentShader: document.getElementById('fragmentShader1').textContent,
		vertexShader: document.getElementById(vertexShader).textContent,
	});
	var material_sun_hover = new THREE.ShaderMaterial( {
		uniforms: uniforms1,
		fragmentShader: document.getElementById('fragmentShader1').textContent,
		vertexShader: document.getElementById(vertexShader).textContent,
	});
	var material_glow = new THREE.ShaderMaterial({
		fragmentShader: document.getElementById('fragmentShaderGlow').textContent,
		vertexShader: document.getElementById('vertexShaderGlow').textContent,
	});
	
	var default_radius = 30;
	var sphere = createSphere(default_radius, default_segments, "");
	scene.add(sphere);
	var material_original = sphere.material;
	
	var stars = createStars(1000, 100);
	scene.add(stars);
	var ring = createFlatTorus();
	ring.rotation.x = Math.PI / 2;
	ring.name = "ring";
	
	var asteroids = createAsteroids();
	
	container.appendChild(renderer.domElement);
	animate();
	
	// SET UP SUN BEGIN
	scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
	scene.fog.color.setHSL( 0.51, 0.4, 0.01 );
	
	// lensflares
	var textureLoader = new THREE.TextureLoader();
	var textureFlare0 = textureLoader.load( 'textures/lensflare/lensflare0.png' );
	var lensFlare = new THREE.Lensflare();
	lensFlare.addElement( new THREE.LensflareElement( textureFlare0, window.innerWidth, 0, sunflareColor) );
	lensFlare.addElement( new THREE.LensflareElement( textureFlare0, window.innerWidth, 0, sunflareColor) ); // TWO TIMES TO MAKE SUN BRIGHTER
	lensFlare.name = "lensFlare";

	
	this.drawObject = function(iobject_name) {	
		if (typeof iobject_name !== "undefined") this.object_name = iobject_name; 
		// LOAD INFO AND STATS
		object_name = this.object_name;
		ui.hud.loadInfoAndStats(this.object_name);
		
		// SPHERE POSITION PRESETS
		object = objects[view][this.object_name];

		if (object.position != "off") {
			sphere.position.z = object.position[2];
			sphere.position.y = object.position[1];
			sphere.position.x = object.position[0];
		}
		
		// SET CAMERA
		if ((object.name == "saturn") && (view == "front")) {
			camera.position.z = 750
			camera.position.y = 100
			camera.position.x = 100
			camera.up = new THREE.Vector3(0,0.05,-0.2); // for saturn
		} else if (this.object_name == "asteroids") {
			camera.position.z = 0;
			camera.position.y = 0;
			camera.position.x = 1000;
			camera.up = new THREE.Vector3(-90,90,0); // for saturn
		} else if (this.object_name == "sun") {
			camera.position.z = 750;
			camera.position.y = 0;
			camera.position.x = 0;
		} else {
			camera.position.z = 750;
			camera.position.y = 0;
			camera.position.x = 0;
		}

		// SET AMBIENT LIGHT
		ambient.color.setHex(object.ambient_color, object.ambient_intensity);

		// SET DIRECTIONAL LIGHT
		if (object.directional_light) { // if light is on
			light.color.setHex(object.directional_color);
			light.intensity = object.directional_intensity;
			light.position.set(object.directional_position[0], object.directional_position[1], object.directional_position[2],);
			light.target = sphere;
		} else { // if light is off
			light.intensity = 0; // turns off lights
		}
			
		// SET RING MESH
		if ((object.name == "saturn") && (view == "front"))  {
			scene.add(ring);
		}
		else { // REMOVE RING MESH
			scene.remove(ring);
		}
		
		// ADD/REMOVE ASTEROIDS
		if (object.name == "asteroids") {
			this.showAsteroids();
		} else {
			this.hideAsteroids();
		}
		
		// SET SUN
		if (object.name == "sun") {
			scene.add( lensFlare );
			scene.remove(lensFlare);
		}
		else {
			scene.remove(lensFlare);
		}
		
		// SET SPHERE 
		if (object.name == "sun") {
			scene.add(sphere);
		} else if (object.name == "asteroids") {
			scene.remove(sphere);
		} else {
			scene.add(sphere);
		}

		// SET RADIUS (THE 150, AND 200 VALUE HERE ARE ARBITARY
		var scale = 1;
		sphere.scale.x = object.scale;
		sphere.scale.y = object.scale;
		sphere.scale.z = object.scale;

		// SET MATERIAL MAP AND ROTATION MATRIX
		if (this.object_name == "sun") {
			// HERE WE RESET THE ROTATION TO ORIGINAL SO THAT WE CAN MAP THE SUN MATERIAL
			sphere.rotation.set(0,0,0);
			sphere.updateMatrix();
			
			// MAP MATERIAL
			sphere.material = material;
			// AND AFTER MAPPING THE MATERIAL, AND IF THE VIEW IS HOVER, THEN WE ROTATE THE OBJECT
			if (view == "hover") rotateObject(sphere, object.rotate[0],object.rotate[1],object.rotate[2]);	
		}
		else if (this.object_name == "asteroid") {
			
		}
		else {
			// HERE WE RESET THE ROTATION TO ORIGINAL BEFORE WE CHANGE THE MATERIAL
			// IF NOT, THE MATERIAL WILL BE MAP UPRIGHT ON A NON-UPRIGHT ROTATION MATRIX
			sphere.rotation.set(0,0,0);
			sphere.updateMatrix();
			// MAP MATERIAL
			sphere.material = material_original
			sphere.material.map = THREE.ImageUtils.loadTexture(object.texture);
			sphere.material.shininess = 1;
			// AND AFTER MAPPING THE MATERIAL, AND IF THE VIEW IS HOVER, THEN WE ROTATE THE OBJECT
			if (view == "hover") rotateObject(sphere, object.rotate[0],object.rotate[1],object.rotate[2]);	
		}
		
		if (this.wireframe) {
			// WIREFRAME
			sphere.material = new THREE.MeshPhongMaterial({
			color: 0xBD9779,
			wireframe: true,
			side: THREE.DoubleSide});
		}
			
		// SET ROTATION
		if (view == "front") {
			sphere.rotation.x = object.rotation; // VERY IMPORTANT. OTHERWISE OBJECT WONT APPEAR. NOT SURE WHY YET
			sphere.rotation.y = object.rotation; 
		}
		else {
			sphere.rotation.y = object.rotation; 
			sphere.rotation.x = object.rotation;
		}
	}
	

	function updateRotations() {
		if (object_name == "sun") {
			var time = new Date().getTime();
			var delta = 0.005 * ( time - oldTime );
			oldTime = time;

			uniforms1.time.value += 0.1 * delta; // original:0.275 
		}
		if (view == "front") {
			sphere.rotation.y += object.rotation;
		}
		else {
			sphere.rotation.x += object.rotation;
		}
		stars.rotation.y += 0.00005;
		if (object_name == "asteroids") {
			asteroids.forEach(function(obj){
				  obj.rotation.x -= obj.r.x;
				  obj.rotation.y -= obj.r.y;
				  obj.rotation.z -= obj.r.z;
			})
		}
	}
	
	function animate() {
		updateRotations();
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		controls.update();
	}
	
	function createFlatTorus() {
		return new THREE.Mesh(
			new THREE.TorusGeometry( 460, 80 , 2 , 160), // 350, 90 , 1.99 ,150 for radisu 200
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('textures/saturnringpattern.gif'),
				transparent	: true,
				opacity : 0.8,							
			})
		);
	}

	function createSphere(radius, segments, texture) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture(texture),
				specular:    new THREE.Color('grey'),
				shininess: 5,				
			})
		);
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

	function randomInt(start,end){
		   return Math.floor(Math.random() * (end - start + 1) + start);
	}	
		
		
	// ASTEROIDS
	function createAsteroids(){
		var maxWidth = 1000;
		var maxHeight = 200;
		var maxDepth = 200;
		var asteroids = [];
		for(var i=0;i<7;i++){
			asteroids.push(createAsteroid(5+Math.random()*50,5000,maxWidth,Math.random()*800,Math.random()*800));
		}
		for(var i=0;i<30;i++){
			asteroids.push(createAsteroid(5+Math.random()*20,5000,maxWidth,Math.random()*800,Math.random()*800));
		}
		for(var i=0;i<160;i++){
			asteroids.push(createAsteroid(2+Math.random()*5,5000,maxWidth,Math.random()*800,Math.random()*800));
		}
		return asteroids;
	}



	function createAsteroid(size, spreadX, maxWidth, maxHeight, maxDepth) {
		geometry = new THREE.DodecahedronGeometry(size, 1);
		geometry.vertices.forEach(function(v){
			v.x += (0-Math.random()*(size/4));
			v.y += (0-Math.random()*(size/4));
			v.z += (0-Math.random()*(size/4));
		})
		var color = '#111111';
		color = ColorLuminance(color,2+Math.random()*10);
		if (space.wireframe) {
			// WIREFRAME
			texture = new THREE.MeshPhongMaterial({
				color: "lime",
				wireframe: true,
				side: THREE.DoubleSide,
			});
		}
		else {
			texture = new THREE.MeshPhongMaterial({color:color,
				flatShading: THREE.FlatShading,
				shininess: 0.01,
				map: THREE.ImageUtils.loadTexture('textures/asteroid.jpg'),
			});
		}

		cube = new THREE.Mesh(geometry, texture);
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.scale.set(1+Math.random()*0.4,1+Math.random()*0.8,1+Math.random()*0.4);
		var x = spreadX/2-Math.random()*spreadX;
		var centeredness = 1-(Math.abs(x)/(maxWidth/2));
		var y = (maxHeight/2-Math.random()*maxHeight)*centeredness
		var z = (maxDepth/2-Math.random()*maxDepth)*centeredness
		cube.position.set(x,y,z)
		cube.r = {};
		cube.r.x = Math.random() * 0.005;
		cube.r.y = Math.random() * 0.005;
		cube.r.z = Math.random() * 0.005;
		return cube;
	};
	
	function ColorLuminance(hex, lum) {

		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;
	}
	


	this.select3DCssSolarSystem = function(planet_name) {
		$("#solar-system").removeClass().addClass(planet_name);
		$("."+planet_name).parent().find('a').removeClass('active');
		$("."+planet_name).addClass('active');
	}
	
	this.showHover = function() {
		if ($('#universe').is(":visible") || (view != "hover")) {
			view = "hover";
			audioPlay("switch"); 
			$('#universe').hide();
			$('#controls').hide();
			$(".line").hide();
			
			// HAVE TO FORCE RESET OF CAMERA AND CONTROLS. OTHERWISE PLANET WILL BE DISPLACED.
			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
			controls = new THREE.TrackballControls(camera);
			controls.minDistance = 500;
			controls.maxDistance = 1000;
			controls.rotateSpeed = 0.005;
			if ((this.wireframe) || (this.force_controls)) controls.enabled = true; else controls.enabled = false;
			controls.noPan = true;
			
			this.drawObject(this.object_name);
		}
	}
	
	this.showSideView = function() {
		if ($('body').is(".view-2D")) {
			audioPlay("bop"); 
			$("body").removeClass("view-2D").addClass("view-3D"); 
			this.showSolarSystem(false);
		}
		else {
			this.showSolarSystem(true);
		}
	}
	
	this.showTopView = function() {
		if ($('body').is(".view-3D")) {
			audioPlay("bop"); 
			$("body").removeClass("view-3D").addClass("view-2D"); 
			this.showSolarSystem(false);
		}
		else {
			this.showSolarSystem(true);
		}
	}
	
	this.showCompare = function() {
		if ($('body').is(".zoom-large")) {
			audioPlay("doopdoop"); 
			$("body").removeClass("zoom-large").addClass("zoom-close");
			this.showSolarSystem(false);
		}
		else {
			this.showSolarSystem(true);
		}
	}
	
	this.showPlanet = function(iobject_name) {
		if (iobject_name != "") this.object_name = iobject_name;
		if ($('#universe').is(":visible") || (view != "front")) {
			view = "front";
			audioPlay("switch"); 
			$('#universe').hide();
			$('#controls').hide();
			controls.enabled = true;
			// SELECT 3DCssSolarSystem
			this.select3DCssSolarSystem(this.object_name);
			this.drawObject(this.object_name);
		}
	}
	
	this.hidePlanet = function() {
		$(".line").hide();
		$(".textcontainer").hide();
		scene.remove(sphere);
		if (this.object_name == "saturn") {
			scene.remove(ring);
		}
		else if (this.object_name == "asteroids") {
			this.hideAsteroids();
		}
	}
	
	this.showAsteroids = function() {
		asteroids.forEach(function(obj){
			scene.add(obj);
		})
	}
	
	this.hideAsteroids = function() {
		asteroids.forEach(function(obj){
			scene.remove(obj);
		})
	}
	
	this.showSolarSystem = function(allowSound) {
		if ($('#universe').is(":hidden")) {
			if (allowSound) {audioPlay("switch");}
			// $("h1").html("The Solar System");
			$('#universe').show();
			$('#controls').show();
			controls.enabled = true;
			this.hidePlanet();
		}
	}
	
	this.showOrbit = function() {
		if ($('body').is(".zoom-close")) {
			audioPlay("doopdoop"); 
			$("body").removeClass("zoom-close").addClass("zoom-large");
			this.showSolarSystem(false);
		}
		else {
			this.showSolarSystem(true);
		}
	}
	
	function hide3DCssSolarSystem() {
		$('#universe').hide();
		$('#controls').hide();
	}
	
	function rotateObject(object,degreeX=0, degreeY=0, degreeZ=0){
		degreeX = (degreeX * Math.PI)/180;
		degreeY = (degreeY * Math.PI)/180;
		degreeZ = (degreeZ * Math.PI)/180;

		object.rotateX(degreeX);
		object.rotateY(degreeY);
		object.rotateZ(degreeZ);
	}

	function rotateCamera(object,degreeX=0, degreeY=0, degreeZ=0){
		degreeX = (degreeX * Math.PI)/180;
		degreeY = (degreeY * Math.PI)/180;
		degreeZ = (degreeZ * Math.PI)/180;

		object.eulerOrder = "YXZ";
		object.rotate.y += degreeY;
		object.rotate.x += degreeX;

		object.rotate.z += degreeZ;
	}

	// SET UP ON WINDOW RESIZE
	window.addEventListener( 'resize', onWindowResize, false );
	
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	
}

/*
* HUD
*/
String.prototype.replaceAll = function(search, replacement) {
	return this.split(search).join(replacement)
};

/* HUD */

function classHUD(iUI) {
	var ui = iUI;
	var hud = this;
	var info = {}
	var stats = {}
	var LPage = -1;
	var RPage = -1;
	var RPageCount = 0;
	this.visible = false;
	this.font_size_limit = 150; // FONT SIZE IN PERCENTAGE

	this.init = function() {
		this.createTextBox("L", 0, "");
		this.drawLine("L", "create", 0, "middle");
		for (i=0; i < 6; i++) {
			this.createTextBox("R", i, "");
			this.drawLine("R", "create", i, "middle");
		}
		$('#textcontainer_R').hide();
		$('#textcontainer_L').hide();
		$('.line').hide();
		// $('h1').hide();
	};

	this.reset = function() {
		// CLEAR HUD CELLS
		$("#textbox_L0").html("&nbsp;");
		for (x=0; x < 6; x++) {
			$("#textbox_R"+x).html("&nbsp;");
		}
		// RESET PAGE
		LPage = -1;
		RPage = -1;
	};

	this.loadInfoAndStats = function(object_name) {
		if ((this.visible) || (typeof this.visible === "undefined")) {
			this.reset();
			$.get('info/'+object_name+'_info.txt', this.onFileReceivedInfo, 'text');
			$.get('info/'+object_name+'_stats.txt', this.onFileReceivedStats, 'text');
		}
	};
		
	this.onFileReceivedInfo = function(data) {
		data = data.replaceAll("[[", "<span>");
		data = data.replaceAll("]]", "</span>");
		var infoArray = data.split("\r\n\r\n");
		if (infoArray.length == 1) infoArray = data.split("\n\n");
		info[ui.space.object_name] = infoArray;

		let value = info[ui.space.object_name][0];
		$("#textbox_L0").html(value);

		hud.LNext(); // important
	};

	this.onFileReceivedStats = function(data) {
		data = data.replaceAll("[[", "<span>");
		data = data.replaceAll("]]", "</span>");
		var statsArray = data.split("\r\n\r\n");
		if (statsArray.length == 1) statsArray = data.split("\n\n");
		stats[ui.space.object_name] = statsArray;
		
		RPageCount = Math.ceil(stats[ui.space.object_name].length /6);

		hud.RNext();
	};

	this.RBack = function() {
		var lines_to_read = 6;
		
		// CLEAR HUD CELLS
		for (x=0; x < 6; x++) {
			$("#textbox_R"+x).html("&nbsp;");
		}
		
		RPage--;
		if (RPage < 0) {
			RPage=RPageCount-1;
		}

		var index=0;
		var start_from = RPage * lines_to_read;
		for (i=start_from; i < start_from+lines_to_read; i++) {
			$("#textbox_R"+index).html(stats[ui.space.object_name][i]);
			index++;
		}
		this.RUpdate();
	};


	this.RNext = function() {
		var lines_to_read = 6;
		
		// CLEAR HUD CELLS
		for (x=0; x < 6; x++) {
			$("#textbox_R"+x).html("&nbsp;");
		}
		
		RPage++;
		if (RPage > RPageCount-1) {
			RPage=0;
		}

		var index=0;
		var start_from = RPage * lines_to_read;
		
		for (i=start_from; i < start_from+lines_to_read; i++) {
			$("#textbox_R"+index).html(stats[ui.space.object_name][i]);
			index++;
		}
		this.RUpdate();
	};

	this.LNext = function() {
		LPage++;
		if (LPage > info[ui.space.object_name].length - 1) LPage = 0;
		$("#textbox_L0").html(info[ui.space.object_name][LPage]);
		this.LUpdate();
	};

	this.LBack = function() {
		LPage--;
		if (LPage < 0) LPage = info[ui.space.object_name].length - 1;
		$("#textbox_L0").html(info[ui.space.object_name][LPage]);
		this.LUpdate();
	};
	
	this.LUpdate = function() {
		this.fitFont($("#textbox_L0"), 0, $(window).height() * 0.6);
		this.drawLine("L", "refresh", 0, "middle");
	};

	this.RUpdate = function() {
		var size =0;
		var smallest_size = 10000;
		
		// FIND SMALLEST FONT
		for (i=0; i < 6; i ++) {
			size = this.fitFont($("#textbox_R"+i), 0, ($(window).height() * 0.6)/8);
			if (size < smallest_size) smallest_size = size;
			}
			
		// MAKE ALL FONTS SAME SIZE
		for (i=0; i < 6; i ++) {
			$("#textbox_R"+i).css("font-size", this.limitSize(smallest_size,100)+"%");
			$("#textbox_L").css("font-size", this.limitSize(smallest_size,100)+"%");
			}
		// UPDATE LINES
		for (i=0; i < 6; i ++) {
			this.drawLine("R", "refresh", i, "middle");
		}
	}
	
	this.limitSize = function(size, limit) {
		if (this.font_size_limit != -1) limit = this.font_size_limit;
		if (size > limit) return limit; else return size;
	};

	this.fitFont = function($element, width, height, refinement=10, low=-1, high=-1, percentage = 300, factor=10, steps=0) {
		if (!$element.is(":visible")) { // MAKE SURE ELEMENT IS VISIBLE;
			return 200;
		}
		if (steps > 50) { // PREVENT INFINITE RECURSION
			return 200;
		}
		steps++;
		if (factor < refinement) {
			return percentage;
		}
		if ($element.height() > height) {
			percentage = percentage - factor;
			if (percentage == low) {
				return this.fitFont($element, width, height, refinement, percentage, high, percentage, parseInt(factor/2), steps);
			}
			$element.css("font-size", this.limitSize(percentage,250)+"%");
			return this.fitFont($element, width, height, refinement, percentage, high, percentage, factor, steps);
		}
		else if ($element.height() < height) {
			percentage = percentage + factor;
			if (percentage == high) {
				return this.fitFont($element, width, height, refinement, low, percentage, percentage, parseInt(factor/2), steps);
			}
			$element.css("font-size", this.limitSize(percentage,250)+"%");
			return this.fitFont($element, width, height, refinement, low, percentage, percentage, factor, steps);
		}
	}
		
	this.createTextBox = function(side, index, text) {
		// Your existing code unmodified...
		var textbox = document.createElement('div');
		textbox.id = 'textbox_'+side+index;
		textbox.className = 'textbox textbox_'+side;
		document.getElementById('textwrapper_'+side).appendChild(textbox);

		// Now create and append to iDiv
		var blank = document.createElement('div');
		blank.id = 'blank_'+side+index;
		blank.className = 'blank';
		document.getElementById('blankwrapper_'+side).appendChild(blank);
		
		textbox.style.width = 100;
		textbox.style.height = 100;
		textbox.innerHTML = text;
		textbox.style.top = 0+ 'px';
		textbox.style.left = 0+ 'px';
	}

	this.createLineElement = function(side, index, x, y, length, angle) {
		var line = document.createElement("div");
		line.id = "line_"+side+index;
		line.className = "line";
		this.updateLine(line, x, y, length, angle);
		return line;
	}

	this.updateLine = function(line, x, y, length, angle) {
		var styles = ''
				   + 'width: ' + length + 'px; '
				   + 'height: 0px; '
				   + '-moz-transform: rotate(' + angle + 'rad); '
				   + '-webkit-transform: rotate(' + angle + 'rad); '
				   + '-o-transform: rotate(' + angle + 'rad); '  
				   + '-ms-transform: rotate(' + angle + 'rad); '  
				   + 'position: absolute; '
				   + 'top: ' + y + 'px; '
				   + 'left: ' + x + 'px; ';
		if ($('.line').is(":visible")) line.setAttribute('style', styles);  
		return line
	}

	this.calculateLine = function(x1, y1, x2, y2) {
		var a = x1 - x2,
			b = y1 - y2,
			c = Math.sqrt(a * a + b * b);

		var sx = (x1 + x2) / 2,
			sy = (y1 + y2) / 2;

		var x = sx - c / 2,
			y = sy;

		var alpha = Math.PI - Math.atan2(-b, a);
		
		return [x, y, c, alpha];
	}
	
	this.drawLine= function(side, command, index, start_y) {
		var textcontainer = $("#textcontainer_"+side);
		textcontainer_top = ($(window).height() - textcontainer.outerHeight())/2;
		textcontainer.css("top", textcontainer_top);
		textcontainer.css("display", "block");

		var link = $("#textbox_"+side+index);
		var offset = link.offset();
		var s_top = offset.top;
		var s_middle = s_top + (link.outerHeight()/2);
		var s_left = offset.left;
		var s_bottom = s_top + link.outerHeight();
		var s_right = s_left + link.outerWidth();
		
		var textwrapper = $("#textwrapper_"+side);
		var blankwrapper = $("#blankwrapper_"+side);
		var textwrapper_top_offset = (textwrapper.outerHeight() - blankwrapper.outerHeight()) /2
		var blankwrapper_top = blankwrapper.offset().top;

		
		var blank = $("#blank_"+side+index);
		var blank_offset = blank.offset();
		var e_top = blank_offset.top;
		var e_left = blank_offset.left;
		var e_middle = e_top + (blank.outerHeight()/2);
		var e_bottom = e_top + blank.outerHeight();
		var e_right = e_left + blank.outerWidth();
		
		if (start_y == "bottom") {
			sy = s_bottom-2;
		} else if (start_y == "middle") {
			sy = s_middle;
		}
		
		if (command == "create") { // CREATE LINE
			var variables = this.calculateLine(s_left, sy, e_left+10, s_bottom-2)
			line = this.createLineElement(side, index, variables[0], variables[1], variables[2], variables[3]);
			document.body.appendChild(line); 
		} else { // UPDATE LINE
			if (side == "R") {
				var variables = this.calculateLine(s_left-2, sy, e_left, e_bottom+textwrapper_top_offset);
			} else {
				var variables = this.calculateLine(s_right, s_middle, e_right, e_middle+textwrapper_top_offset);
			}
			line = document.getElementById('line_'+side+index);
			return this.updateLine(line, variables[0], variables[1], variables[2], variables[3]);
		}
	}

} /* END classHUD */

/* 
* UI
*/

function classUI() {
	
	this.selected_item = "";
	this.space = new classSpace(this);
	this.hud = new classHUD(this);
	var space = this.space;
	var ui = this;
	
	this.init = function() {
		// INIT HUD
		this.hud.init();
		// HIGHLIGHT PANEL BUTTONS
		this.highlightTopButtonColor(".fs-hud", "#8f99ba");
		this.highlightTopButtonColor(".fs-panels", "#8f99ba");
		this.highlightTopButtonColor(".fs-sound", "#8f99ba");
		this.highlightButtonColor('.fs-planet')
		this.highlightViewButtonColor(".fs-sideview");
		// RESET SELECTOR
		$('#selector').val('');
		// SET LISTENERS
		$(window).on('resize', ui.onWindowResize);
		$(document).keyup(function(e) {documentKeyUp(e);});
		$(document).mousedown(function(event) {ui.showPanels(event);});
		$(".textcontainer").on("mousedown click", "a", function (e) {ui.linkClicked(e);} );
		$('#textcontainer_L').mousedown(function(e) {ui.HUDLmousedown(e);});
		$('#textcontainer_R').mousedown(function(e) {ui.HUDRmousedown(e);});
		$('.fs-hud').on('click', function() {ui.toggleHUD();});
		$('.fs-panels').on('click', function() {ui.hidePanels();});
		$('.fs-sound').on('click', function() {ui.toggleSound();});
		$('.fs-orbit').on('click', function() {ui.showOrbitClicked();});
		$('.fs-planet').on('click', function() {ui.showPlanetClicked();});
		$(".fs-topview").click(function() {ui.showTopViewClicked();});
		$(".fs-sideview").click(function() {ui.showSideViewClicked();});
		$(".fs-hover").click(function() {ui.showHoverClicked();});
		$(".fs-compare").click(function() {ui.showCompareClicked();});
		$('#selector_button').on('click', function() {ui.selectorButtonClicked();})
		$('.selector_item').on('click', function() {ui.selectorItemClicked(this);})
		$('#sun').on('click', function() {ui.showPlanetClicked("sun");})
		$('#mercury .planet').on('click', function() {ui.showPlanetClicked("mercury");})
		$('#venus .planet').on('click', function() {ui.showPlanetClicked("venus");})
		$('#earth .planet').on('click', function() {ui.showPlanetClicked("earth");})
		$('#moon .planet').on('click', function() {ui.showPlanetClicked("moon");})
		$('#mars .planet').on('click', function() {ui.showPlanetClicked("mars");})
		$('#jupiter .planet').on('click', function() {ui.showPlanetClicked("jupiter");})
		$('#saturn .planet').on('click', function() {ui.showPlanetClicked("saturn");})
		$('#uranus .planet').on('click', function() {ui.showPlanetClicked("uranus");})
		$('#neptune .planet').on('click', function() {ui.showPlanetClicked("neptune");})
	}

	this.update = function() {
		if (this.hud.visible) {
			ui.hud.LUpdate();
			ui.hud.RUpdate();
		}
	}
	
	this.onWindowResize = function() {
		ui.update();
	}
	
	this.documentKeyUp = function() {
		if (e.keyCode === 27) {
			$('.panel').toggle();
		}
	}
	
	this.showHoverClicked = function() {
		this.hideMenu(); 
		this.highlightButtonColor('.fs-hover');
		//$("h1").html(toProperCase(ui.space.object_name));
		space.showHover();
	}
	
	this.showSideViewClicked = function() {
		this.hideMenu(); 
		this.highlightViewButtonColor('.fs-sideview');
		space.showSideView()
	}
	
	this.showTopViewClicked = function() {
		this.hideMenu(); 
		this.highlightViewButtonColor('.fs-topview');
		space.showTopView();
	}
	
	this.showPlanetClicked = function(iobject_name) {
		if (typeof iobject_name !== "undefined") space.object_name = iobject_name;
		this.hideMenu(); 
		this.highlightButtonColor('.fs-planet');
		//$("h1").html(toProperCase(space.object_name));
		$("#selector_label").html(space.object_name.toUpperCase());
		if ((this.hud.visible) || (typeof this.hud.visible === "undefined")) {
			$(".line").show();
			$(".textcontainer").show();
		}
		space.showPlanet(space.object_name);
	}
	
	this.showOrbitClicked = function() {
		this.hideMenu(); 
		this.highlightButtonColor('.fs-orbit');
		this.space.showOrbit();
	}
	
	this.showCompareClicked = function() {
		this.hideMenu(); 
		this.highlightButtonColor('.fs-compare');
		this.space.showCompare();
	}
	
	this.showPanels = function(e) {
		switch (e.which) {
			case 3:
				$(".panel").show(); 
				this.highlightTopButtonColor(".fs-panels", "#8f99ba");
				audioPlay("button-click"); 
				break;
		}
	}
	
	this.highlightViewButtonColor = function(className) {
		$('.fs-sideview').css("color","#aaa");
		$('.fs-topview').css("color","#aaa");
		$(className).css("color","#a5daba");
		}
	
	this.highlightButtonColor = function(className) {
		$('.fs-orbit').css("color","#aaa");
		$('.fs-planet').css("color","#aaa");
		$('.fs-compare').css("color","#aaa");
		$('.fs-hover').css("color","#aaa");
		$(className).css("color","rgb(182, 173, 216)");
	}
	
	this.linkClicked = function(e) {
		window.location.href = this.href;
		e.preventDefault();
		e.stopPropagation();
	}
	
	this.HUDLmousedown = function(e) {
		switch (e.which) {
			case 1:
				ui.hud.LNext();
				audioPlay("hud-click"); 
			case 2:
				break;
			case 3:
				ui.hud.LBack();
				audioPlay("hud-click"); 
				break;
		}
		e.preventDefault();
		e.stopPropagation();
	}
	
	this.HUDRmousedown = function(e) {
		switch (e.which) {
			case 1:
				ui.hud.RNext();
				audioPlay("hud-click"); 
			case 2:
				break;
			case 3:
				ui.hud.RBack();
				audioPlay("hud-click"); 
				break;
		}
		e.preventDefault();
		e.stopPropagation();
	}
	
	this.toggleHUD = function(e) {
		if ($('#universe').is(":hidden")) {
			if ((ui.hud.visible) || (typeof ui.hud.visible === "undefined")) {
				ui.hud.visible = false;
				this.highlightTopButtonColor(".fs-hud", "#aaa");
				$('#textcontainer_R').hide();
				$('#textcontainer_L').hide();
				$('.line').hide();
				//$('h1').hide();
			}
			else {
				
				ui.hud.visible = true;
				this.highlightTopButtonColor(".fs-hud", "#8f99ba");
				ui.hud.loadInfoAndStats(space.object_name);
				$('.line').show();
				//$('h1').show();
			}
			audioPlay("button-click");
		}
	}
	
	this.hidePanels = function() {
		$(".panel").hide(); 
		this.highlightTopButtonColor(".fs-panels", "#aaa");
		audioPlay("button-click"); 
	}
	
	this.toggleSound = function() {
		if (soundon) {
			soundon = false;
			this.highlightTopButtonColor(".fs-sound", "#aaa");
			snd1.pause();
			snd2.pause();
		} else {
			soundon = true;
			this.highlightTopButtonColor(".fs-sound", "#8f99ba");
			snd1.play();
			snd2.play();
		}
		audioPlay("button-click"); 
	}
	
	this.highlightTopButtonColor = function(className, color) {
		$(className).css("color", color);
	}
	
	this.hideMenu = function() {
		$('.selector').css('bottom', '-550px');
	}
	
	this.selectorButtonClicked = function() {
		audioPlay("screen"); 
		if (parseInt($('.selector').css('bottom')) < 0) {
			$('.selector').css('bottom', '0px');
			$('.selector').css('width', '300px');
		}
		else {
			$('.selector').css('bottom', '-550px');			
		}
	}
	
	this.selectorItemClicked = function(item) {
		var value = $(item).data("value");
		selectedItemChanged(value);
		// HIDE MENU
		$('.selector').css('bottom', '-550px');
	}
	
	function selectedItemChanged(value) {
		if ((value != space.object_name) && (typeof value !== "undefined")) {
			// $("h1").html(toProperCase(value));
			audioPlay("beep"); 
			if ($('#universe').is(":hidden")) {
				space.drawObject(value);
			}
			// SELECT 3DCssSolarSystem
			space.select3DCssSolarSystem(value);
			$('#selector_label').html(space.object_name.toUpperCase());
		}
	}
	
	function toProperCase(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
}

/* MIXER */

var soundon = false;

var snd1  = new Audio();
var src1  = document.createElement("source");
src1.id = "src1";
src1.type = "audio/mpeg";
src1.src  = "audio/space1.wav";
snd1.appendChild(src1);
snd1.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
snd1.play(); 

var snd2  = new Audio();
var src2  = document.createElement("source");
src2.id = "src2";
src2.type = "audio/mpeg";
src2.src  = "audio/space2.wav";
snd2.appendChild(src2);
snd2.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
snd2.play(); 

function audioPlay(filename) {
	var snd  = new Audio();
	var src3  = document.createElement("source");
	src3.id = "src3";
	src3.type = "audio/mpeg";
	src3.src  = "audio/"+filename+".wav";
	snd.appendChild(src3);
	snd.addEventListener('ended', function() {

	}, false);
	snd.play(); 
}

function audioPlayArray(filenames, index=0) {
	if (index > filenames.length + 1) {
		alert("finished");
		return true;
	}
	var snd  = new Audio();
	var src3  = document.createElement("source");
	src3.type = "audio/mpeg";
	src3.src  = "audio/"+filenames[index]+".wav";
	snd.appendChild(src3);
	snd.addEventListener('ended', function() {
		index++;
		audioPlayArray(filenames, index);
	}, false);
	snd.play(); 
}

