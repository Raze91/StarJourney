const WorkShop = {
  configuration: {},

  start: function (config) {
    // debug mode
    if (config.debug_mode == false) {
      console.log = function () { };
    }

    this.configuration = config;

    function gameIsStarted() {
      WorkShop.gfx_engine.init(config.gfx_engine);

      WorkShop.game.init(config.game);

      WorkShop.update();

      console.log('WorkShop is started!');
    }
    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');
    //const instructions_2 = document.getElementById('instructions_2')

    const onKeyDown = function (event) {
      switch (event.keyCode) {
        case 13: // enter
          instructions.style.visibility = 'hidden';
          blocker.style.visibility = 'hidden';
          gameIsStarted()
          break;;
      }
    };
    document.addEventListener('keydown', onKeyDown, false);

  },
  update: function () {
    requestAnimFrame(WorkShop.update);

    if (WorkShop.configuration.debug_mode) WorkShop.gfx_engine.stats.begin();

    WorkShop.game.update();
    WorkShop.gfx_engine.update();

    if (WorkShop.configuration.debug_mode) WorkShop.gfx_engine.stats.end();

    if(WorkShop.game.player.lives <= 0){
      //instructions_2.style.visibility = 'visible';
      //blocker.style.visibility = 'visible';
    }
  }

};
