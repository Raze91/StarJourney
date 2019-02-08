WorkShop.game = {
    asteroids: [],
    field: {
        width: 500,
        height: 300
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


        new THREE.ImageLoader().load('./assets/source/Space_pic.jpg', function (image) {
            let texture = new THREE.CanvasTexture(image);
            let plane_material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
            let plane_geometry = new THREE.PlaneGeometry(WorkShop.game.field.width, WorkShop.game.field.height, 32);
            const plane = new THREE.Mesh(plane_geometry, plane_material);
            plane.position.set(0, 0, -100)
            scene.add(plane);
        });

        const loader = new THREE.FBXLoader();

        // Asteroid 1
        loader.load('./assets/source/asteroid.fbx', function (object) {
            WorkShop.game.asteroid = object;
            WorkShop.game.asteroid.scale.set(0.03, 0.03, 0.03)
            WorkShop.gfx_engine.scene.add(WorkShop.game.asteroid);
        });

        // Asteroid 2
        loader.load('./assets/source/asteroid.fbx', function (object) {
            WorkShop.game.asteroid_2 = object;
            WorkShop.game.asteroid_2.scale.set(0.03, 0.03, 0.03);
            WorkShop.gfx_engine.scene.add(WorkShop.game.asteroid_2);
        });

        // Asteroid 3
        loader.load('./assets/source/asteroid.fbx', function (object) {
            WorkShop.game.asteroid_3 = object;
            WorkShop.game.asteroid_3.scale.set(0.03, 0.03, 0.03);
            WorkShop.gfx_engine.scene.add(WorkShop.game.asteroid_3);
        });

        // Ship 
        loader.load('./assets/source/Ship.fbx', function (object) {
            WorkShop.game.ship = object;
            WorkShop.game.ship.scale.set(0.002, 0.002, 0.002);
            WorkShop.game.ship.rotateX(THREE.Math.degToRad(70));
            WorkShop.game.ship.rotateY(THREE.Math.degToRad(89.6));
            WorkShop.game.ship.position.set(0, -30, 0);
            WorkShop.gfx_engine.scene.add(WorkShop.game.ship);
            console.log('ship is added');
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
                WorkShop.game.ship.position.set(-70, -30, 0)
                //WorkShop.game.ship.translateX(-2)
                //console.log('gauche');
                break;
            case 39: // right
            case 68: // d
                //WorkShop.game.ship.translateX(2)
                WorkShop.game.moveRight = true;
                WorkShop.game.ship.position.set(70, -30, 0)
                //console.log('droite');
                break;
            case 27: // Echap
                WorkShop.setPause();
                console.log('echap')
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


    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    update: function () {

         this.player.score_div.innerText = 'Score : ' + this.player.score;

         this.player.lives_div.innerText = 'Vies : ' + this.player.lives;

         if (this.ship != null && this.ship.position.x > 0 && this.moveRight != true) {
             this.ship.translateZ(-1)
         }
         if (this.ship != null && this.ship.position.x < 0 && this.moveLeft != true) {
             this.ship.translateZ(1)
         }

         if (this.asteroid != null && this.asteroid.position.y > -50) {
             this.asteroid.translateY(-2);
         }
         if (this.asteroid_2 != null && this.asteroid_2.position.y > -50) {
             this.asteroid_2.translateY(-2);
         }
         if (this.asteroid_3 != null && this.asteroid_3.position.y > -50) {
             this.asteroid_3.translateY(-2);
         }

         if (this.ship != null && 
             this.asteroid != null && 
             this.asteroid.position.x - 6 < this.ship.position.x + 5 && 
             this.asteroid.position.x + 6 > this.ship.position.x - 5 && 
             this.asteroid.position.y - 6 < this.ship.position.y + 9 && 
             this.asteroid.position.y + 6 > this.ship.position.y - 9) {
             this.player.lives -= 1;
             this.asteroid.position.set(this.getRandomArbitrary(-70, 70), this.getRandomArbitrary(50, 70), 0);
         }
         if (this.ship != null && 
             this.asteroid_2 != null && 
             this.asteroid_2.position.x - 6 < this.ship.position.x + 5 && 
             this.asteroid_2.position.x + 6 > this.ship.position.x - 5 && 
             this.asteroid_2.position.y + 6 < this.ship.position.y + 9 && 
             this.asteroid_2.position.y + 6 > this.ship.position.y - 9) {
             this.player.lives -= 1;
             this.asteroid_2.position.set(this.getRandomArbitrary(-70, 70), this.getRandomArbitrary(50, 70), 0)
         }
         if (this.ship != null && 
             this.asteroid_3 != null && 
             this.asteroid_3.position.x - 6 < this.ship.position.x + 5 && 
             this.asteroid_3.position.x + 6 > this.ship.position.x - 5 && 
             this.asteroid_3.position.y + 6 < this.ship.position.y + 9 && 
             this.asteroid_3.position.y + 6 > this.ship.position.y - 9) {
             this.player.lives -= 1;
             this.asteroid_3.position.set(this.getRandomArbitrary(-70, 70), this.getRandomArbitrary(50, 70), 0)
         }

         if (this.asteroid != null && this.asteroid.position.y <= -50) {
             this.player.score += 10;
             this.asteroid.position.set(this.getRandomArbitrary(-70, 70), this.getRandomArbitrary(50, 70), 0);
         }
         if (this.asteroid_2 != null && this.asteroid_2.position.y <= -50) {
             this.player.score += 10;
             this.asteroid_2.position.set(this.getRandomArbitrary(-70, 70), this.getRandomArbitrary(50, 70), 0)
         }
         if (this.asteroid_3 != null && this.asteroid_3.position.y <= -50) {
             this.player.score += 10;
             this.asteroid_3.position.set(this.getRandomArbitrary(-70, 70), this.getRandomArbitrary(50, 70), 0)
         }

    },


}
