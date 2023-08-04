import React, {  useEffect } from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import dat from 'dat.gui'

function ThreeMap() {
    useEffect(() => {
        iniThree()
    }, [])

    const iniThree = () => { //初始化方法

        const container = document.getElementById('container')
        var stats = initStats();
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor();
        renderer.setClearColor(new THREE.Color(0xffffff));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
        // show axes in the screen
        var axes = new THREE.AxesHelper(20);
        scene.add(axes);

        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(60, 20);
        var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        // add the plane to the scene
        scene.add(plane);

        // create a cube
        var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //会照亮场景里的全部物体（氛围灯），前提是物体是可以接受灯光的，这种灯是无方向的，即不会有阴影。
        const ambient2 = new THREE.AmbientLight(0x0c0c0c, 0.4);
        const light2 = new THREE.PointLight(0xffffff, 1);//点光源，color:灯光颜色，intensity:光照强度

        cube.castShadow = true;
        // position the cube
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;
        scene.add(ambient2);
        light2.position.set(200, 300, 400);
        scene.add(light2)
        // add the cube to the scene
        scene.add(cube);

        // create a sphere
        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff, wireframe: true });
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphere.position.x = 20;
        sphere.position.y = 4;
        sphere.position.z = 2;

        // add the sphere to the scene
        scene.add(sphere);

        // position and point the camera to the center of the scene
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 40, -15);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize = new THREE.Vector3(1024, 1024)
        spotLight.shadow.camera.far = 130
        spotLight.shadow.camera.near = 40
        scene.add(spotLight);

        // add the output of the renderer to the html element
        // document.getElementById("WebGL-output").appendChild(renderer.domElement);

        var step = 0;
        var controls = new function () {
            this.rotationSpeed = 0.02
            this.bouncingSpeed = 0.03
        }
        var gui = new dat.GUI()
        gui.add(controls, 'rotationSpeed', 0, 0.5)
        gui.add(controls, 'bouncingSpeed', 0, 0.5)
        renderScene();

        function renderScene() {
            stats.update()
            cube.rotation.x += controls.rotationSpeed
            cube.rotation.y += controls.rotationSpeed
            cube.rotation.z += controls.rotationSpeed
            step +=controls.bouncingSpeed
            sphere.position.x = 20 + (10 * Math.cos(step))
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))
            requestAnimationFrame(renderScene)
            renderer.render(scene, camera)
        }
        function initStats() {

            var stats = new Stats();

            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;

        }
        // render the scene
        renderer.render(scene, camera);
        container.appendChild(renderer.domElement); //生成的渲染的实例, 这个要放到对应的dom容器里面

    }


    return (
        <div>
            <div id='container'></div>
            <div id="Stats-output"></div>
        </div>

    )
}
export default ThreeMap;
