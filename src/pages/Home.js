import React, { Component, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


function ThreeMap() {
    useEffect(() => {
        iniThree()
    }, [])
    const iniThree = () => { //初始化方法
       
        const container = document.getElementById('container')
        
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
        // var axes = new THREE.AxesHelper(20);
        // scene.add(axes);

        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(60, 20);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
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
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        // position the cube
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;

        // add the cube to the scene
        scene.add(cube);

        // create a sphere
        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
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
        spotLight.shadow.mapSize = new THREE.Vector3(1024,1024)
        spotLight.shadow.camera.far = 130
        spotLight.shadow.camera.near = 40
        scene.add(spotLight);

        // add the output of the renderer to the html element
        // document.getElementById("WebGL-output").appendChild(renderer.domElement);

        // render the scene
        renderer.render(scene, camera);
        container.appendChild(renderer.domElement); //生成的渲染的实例, 这个要放到对应的dom容器里面

    }

    return (
        <div id='container'></div> //要渲染的虚拟dom
    )
}
export default ThreeMap;
