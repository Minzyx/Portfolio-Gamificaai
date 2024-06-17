import { Engine, FadeInOut } from "excalibur";
import { welcomeScene } from "./scenes/welcomeScene";
import { loader } from "./resources";
import { historyScene } from "./scenes/historyScene";
import { gamificationScene } from "./scenes/gamificationScene";
import { expoScene } from "./scenes/expoScene";
import { caseScene } from "./scenes/caseScene";

const game = new Engine ({
  width: 1200,
  height: 800,
  canvasElementId: "jogo", 
  pixelArt: true
})

game.addScene("bemvindo", new welcomeScene())
game.addScene("historia", new historyScene())
game.addScene("gamificacao", new gamificationScene())
game.addScene("exposicao", new expoScene())
game.addScene("case", new caseScene())

game.start(loader).then(() => {
  game.goToScene("exposicao",{
    sourceOut: new FadeInOut({duration: 1000})
  })
  
})