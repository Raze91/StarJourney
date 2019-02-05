const WorkShop = {
  configuration: {},

  start: function (config) {
    // debug mode
    if (config.debug_mode == false) {
      console.log = function () { };
    }

    this.configuration = config;
    this.gfx_engine.init(config.gfx_engine);

    this.game.init(config.game);

    this.update();

    console.log('WorkShop is started!');
  },
  update: function () {
    requestAnimFrame(WorkShop.update);

    if (WorkShop.configuration.debug_mode) WorkShop.gfx_engine.stats.begin();

    WorkShop.game.update();
    WorkShop.gfx_engine.update();

    if (WorkShop.configuration.debug_mode) WorkShop.gfx_engine.stats.end();
  }
};
