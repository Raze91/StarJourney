WorkShop.game = {
    asteroids: [],
    field: {
        width: 120,
        height: 75
    },

    player: {
        lives: 5,
        lives_div: 0,
        score: 0,
        score_div: 0,
    },

    init: function (config) {

        this.player.score_div = document.getElementById('score');

        this.player.lives_div = document.getElementById('vies');


        const scene = WorkShop.gfx_engine.scene;


        // Light
        const light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        // const plane_geometry = new THREE.PlaneGeometry(this.field.width, this.field.height, 32);
        // const plane_material = new THREE.MeshLambertMaterial({ color: 0x0D325C, side: THREE.DoubleSide });
        // const plane = new THREE.Mesh(plane_geometry, plane_material);
        // scene.add(plane);

        const ship_geometry = new THREE.ConeGeometry(5, 10, 32);
        const ship_material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
        const cone = new THREE.Mesh(ship_geometry, ship_material);
        this.ship = cone
        this.ship.position.set(0, -25, 0);
        scene.add(this.ship);

        scene.background = new THREE.Color(0x095D4D);

        const loader = new THREE.FBXLoader();
        loader.load('./assets/source/asteroid.fbx', function (object) {
            WorkShop.game.asteroid = object;
            WorkShop.game.asteroid.scale.set(0.03, 0.03, 0.03)
            WorkShop.gfx_engine.scene.add(WorkShop.game.asteroid);
        });
        loader.load('./assets/source/asteroid.fbx', function (object) {
            WorkShop.game.asteroid_2 = object;
            WorkShop.game.asteroid_2.scale.set(0.03,0.03,0.03);
            WorkShop.gfx_engine.scene.add(WorkShop.game.asteroid_2);    
        });
        

        document.addEventListener('keydown', this.onKeyDown, false);
        document.addEventListener('keyup', this.onKeyUp);

        console.log('Game is ready');

    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case 37: // left
            case 65: // a
                WorkShop.game.moveLeft = true;
                WorkShop.game.ship.position.set(-50, -25, 0)
                //WorkShop.game.ship.translateX(-2)
                //console.log('gauche');
                break;
            case 39: // right
            case 68: // d
                //WorkShop.game.ship.translateX(2)
                WorkShop.game.moveRight = true;
                WorkShop.game.ship.position.set(50, -25, 0)
                //console.log('droite');
                break;
            case 32: // space
                //console.log('Space');
                break;
        }
    },
    onKeyUp: function (event) {
        switch (event.keyCode) {
            case 37: // left
            case 65: // a
                WorkShop.game.moveLeft = false;
                //console.log('ne vas plus a gauche');
                break;
            case 39: // right
            case 68: // d
                WorkShop.game.moveRight = false;
                //console.log('ne vas plus a droite');
                break;
        }
    },


    // build_forest: function (asteroid_model) {
    //     asteroid_model = WorkShop.game.asteroid
    //     //asteroid_model.scale.set(0.1, 0.1, 0.1);

    //     const scene = WorkShop.gfx_engine.scene;
    //     const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

    //     for (let j = 0; j < 10; j++) {
    //         //WorkShop.game.asteroid = this.asteroid_model.clone();
    //         this.asteroid.material = material;
    //         this.asteroid.position.set(
    //             Math.floor(Math.random() * this.field.width) - this.field.width * 0.5,
    //             -20 - Math.random() * 10,
    //             Math.floor(-Math.random() * this.field.height) + 5
    //         );
    //         this.asteroid.geometry.rotateY(Math.random() * 360);
    //         scene.add(this.asteroid);
    //         this.asteroids.push(this.asteroid);
    //     }
    // },

    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    update: function () {

        this.player.score_div.innerText = 'Score : ' + this.player.score;

        this.player.lives_div.innerText = 'Vies : ' + this.player.lives;

        if (this.ship.position.x > 0 && this.moveRight != true) {
            this.ship.translateX(-1)
        }
        if (this.ship.position.x < 0 && this.moveLeft != true) {
            this.ship.translateX(1)
        }

        if (this.asteroid != null && this.asteroid.position.y > -50) {
            this.asteroid.translateY(-2);
        }
        if (this.asteroid_2 != null && this.asteroid_2.position.y > -50) {
            this.asteroid_2.translateY(-2);
        }

        if (this.asteroid != null && this.asteroid.position.x - 5 < this.ship.position.x + 5 && this.asteroid.position.x + 5 > this.ship.position.x - 5
            && this.asteroid.position.y - 5 < this.ship.position.y + 10 && this.asteroid.position.y + 5 > this.ship.position.y - 10) {
            this.player.lives -= 1;
            this.asteroid.position.set(this.getRandomArbitrary(-50, 50), this.getRandomArbitrary(50, 70), 0);
        }
        if (this.asteroid_2 != null && this.asteroid_2.position.x - 5 < this.ship.position.x + 5 && this.asteroid_2.position.x + 5 > this.ship.position.x - 5
            && this.asteroid_2.position.y + 5 < this.ship.position.y + 10 && this.asteroid_2.position.y + 5 > this.ship.position.y - 10) {
            this.player.lives -= 1;
            this.asteroid_2.position.set(this.getRandomArbitrary(-50, 50), this.getRandomArbitrary(50, 70), 0)
        }

        if (this.asteroid != null && this.asteroid.position.y <= -50) {
            this.player.score += 10;
            this.asteroid.position.set(this.getRandomArbitrary(-50, 50), this.getRandomArbitrary(50, 70), 0);
        }
        if (this.asteroid_2 != null  && this.asteroid_2.position.y <= -50) {
            this.player.score += 10;
            this.asteroid_2.position.set(this.getRandomArbitrary(-50, 50), this.getRandomArbitrary(50, 70), 0)
        }

    },


}
