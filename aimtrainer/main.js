title = "AIM TRAINER";

description = `
aim your mouse
and shoot at 
the targets.

[AIM + CLICK]
    Shoot

`;

characters = [
`
  R
  r
Rr rR
  r
  R
`,`
 PPP
PpppP
PpppP
PpppP
 PPP
`,
];

const G = {
  
	WIDTH: 150,
	HEIGHT: 100,
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 20,

  theme: "dark"
};

/** @type {{x: number, z: number, size: Vector, color: Color}[]} */
let pillars;
let nextPillarTicks;
let nextYellowPillar;
let pos;
let vy;
let multiplier;

/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

function update() {
  if (!ticks) {
    pillars = [{ x: 0, z: 10, size: vec(100, 100), color: "blue" }];
    nextPillarTicks = nextYellowPillar = 4;
    pos = vec(90, 50);
    vy = 0;
    multiplier = 1;
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
    };
  }
  nextPillarTicks--;
  if (nextPillarTicks < 0) {
    nextYellowPillar--;
    pillars.unshift({
      x: rnds(20, 55),
      z: 40,
      size: vec(rnd(35, 45), rnd(35, 45)),
      color: nextYellowPillar < 0 ? "blue" : "light_blue",
    });
    nextPillarTicks = 50 / difficulty;
    if (nextYellowPillar < 0) {
      nextYellowPillar = 4;
    }
  }
  color("light_black");
  rect(0, 55, 150, 1);

  color("red");
  rect(0, 71, 150, 1);


  color("black");
  player.pos.x = clamp(input.pos.x, 0, G.WIDTH);
  player.pos.y = clamp(input.pos.y, 56, G.HEIGHT);
  // vy += 0.1 * difficulty;
  color ("black");
  char("a", player.pos)
  // player.isColliding.rect;
  // if (pos.y > 95) {
  //   play("explosion");
  //   end();
  // }
  pillars = pillars.filter((p) => {
    color(p.color);
    if (
      box(
        p.x / p.z + 75,
        p.size.y / 3 / p.z + 45,
        p.size.x / p.z,
        p.size.y / p.z
      ).isColliding.rect.red
    ) {
      play("hit")
      end();
    }

    else if (
      box(
        p.x / p.z + 75,
        p.size.y / 3 / p.z + 45,
        p.size.x / p.z,
        p.size.y / p.z
      ).isColliding.char.a
    ) {
      if (input.isJustPressed) {

        // console.log("colliding")
        const ty = p.size.y / 3 / p.z + 60 - p.size.y / p.z / 2;
        if (vy > 0) {
          play("laser");
          vy = -2.5 * sqrt(difficulty);
          if (pos.y > ty) {
            pos.y = ty;
          }
        }
        addScore(multiplier, p.x / p.z + 50, ty);
        if (p.color === "blue") {
          play("select");
          multiplier++;

          color("blue");
          particle(player.pos);
        }
        else {

          color("light_blue");
          particle(player.pos);
          play("jump")
        }
        return false;
      }
    }

    p.z -= difficulty * 0.1;
    return p.z > 1;
  });

  color ("black");
  char("a", player.pos)

}
