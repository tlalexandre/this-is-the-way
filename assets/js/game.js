// initialize kaboom context
kaboom({
  global: true,
  fullscreen: true,
  height: 800,
  canvas: document.querySelector("#game"),
  scale: 1,
  debug: true,
  background: [0, 0, 0, 0],
})

// loads sprite
loadRoot("assets/");
loadSprite("mando", "sprites/Mando1stSprite.png");
loadSprite("grogu-transit", "sprites/grogu-transit.png");
loadSprite("ground", "sprites/ground.png");
loadSprite("force", "sprites/force.png");
loadSound("theme", "sounds/FluffingaDuck.mp3");



const mando = add([
  sprite("mando"),
  pos(1210, 250),
  scale(1),
]);




function shoot(obj) {
  const p = add([
    scale(0.5),
    sprite(obj.sprite),
    pos(obj.pos),
    origin('center'),
    lifespan(1.5),
    'projectile'
  ]);

  const speed = obj.speed ?? 600;
  const angle = obj.angle ?? 0;
  const vx = speed * Math.cos(angle);
  const vy = speed * Math.sin(angle);

  p.action(() => {
    p.move(vx * dt(), vy * dt());
  });

  return p;
}



// create game scenes
scene("game", () => {
  play("theme", { loop: true });
  volume(0.1);

  const mando = add([
    sprite("mando"),
    pos(1210, 250),
    scale(1),
  ]);



  const grogu = add([
    sprite("grogu-transit"),
    pos(0, 0),
    scale(0.4),
    body(),
    area(),
  ]);

  const movementSpeed = 1000;

  keyDown("up", () => {
    grogu.jump(300);
  });

  keyDown("down", () => {
    grogu.move(0, movementSpeed);
  });

  keyDown("left", () => {
    grogu.move(-movementSpeed, 0);
  });

  keyDown("right", () => {
    grogu.move(movementSpeed, 0);
  });



  keyPress("space", () => {
    shoot({
      sprite: "force",
      speed: 500,
      angle: grogu.angle,
      pos: grogu.pos.add(grogu.width / 2, grogu.height / 2),
    });
  });
  

  //layers
  layers(['bg', 'obj', 'ui'], 'obj')

  add([sprite, layer("obj")]);
  addLevel([
    "                           ",
    "                           ",
    "                      =    ",
    "         ====         =    ",
    "                      =    ",
    "               =      =    ",
    "===========================",
  ], {
    // define the size of each block
    width: 40,
    height: 40,
    "=": () => [
      sprite("ground"),
      area(),
      solid(),
      pos(5, 340),
      scale(1.2, 1.5),
      layer("obj"),
      fixed(),
    ],

  })



  //layers
  layers(['bg', 'obj', 'ui'], 'obj')

  add([sprite, layer("obj")]);


})

// start game
go("game")
