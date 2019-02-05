WorkShop.game = {

    init: function (config) {

        const scene = WorkShop.gfx_engine.scene;

        // Light
        const light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        const geometry = new THREE.PlaneGeometry(50, 70, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x0D325C, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const cone_geometry = new THREE.ConeGeometry(5, 10, 32);
        const cone_material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const cone = new THREE.Mesh(cone_geometry, cone_material);
        this.cone = cone
        cone.position.set(0, -25, 0)
        scene.add(cone);

        scene.background = new THREE.Color(0x095D4D);

        document.addEventListener('keydown', this.onKeyDown, false);
        document.addEventListener('keyup', this.onKeyUp);

        console.log('Game is ready');
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                WorkShop.game.cone.translateY(1)
                console.log('avancer');
                break;
            case 37: // left
            case 65: // a
                WorkShop.game.moveLeft = true;
                WorkShop.game.cone.position.set(-20, -25, 0)
                console.log('gauche');
                break;
            case 40: // down
            case 83: // s
                WorkShop.game.cone.translateY(-1)
                console.log('reculer');
                break;
            case 39: // right
            case 68: // d
                // WorkShop.game.cone.translateX(1)
                WorkShop.game.moveRight = true;
                WorkShop.game.cone.position.set(20, -25, 0)
                console.log('droite');
                break;
            case 32: // space
                console.log('Space');
                break;
        }
    },
    onKeyUp: function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                console.log('n\'avance plus');
                break;
            case 37: // left
            case 65: // a
            WorkShop.game.moveLeft = false;
                console.log('ne vas plus a gauche');
                break;
            case 40: // down
            case 83: // s
                console.log('ne recule plus');
                break;
            case 39: // right
            case 68: // d
                WorkShop.game.moveRight = false;
                console.log('ne vas plus a droite');
                break;
        }
    },




    update: function () {
        if (WorkShop.game.cone.position.x > 0 && WorkShop.game.moveRight != true) {
            WorkShop.game.cone.translateX(-0.3)
        }
        if (WorkShop.game.cone.position.x < 0 && WorkShop.game.moveLeft != true) {
            WorkShop.game.cone.translateX(0.3)
        }
    }
}