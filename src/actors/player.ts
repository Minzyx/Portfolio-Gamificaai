import { Actor, Animation, CollisionType, Color, Engine, Keys, Resource, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor{
    // Propriedade
    private velocidade: number = 180
    // Configuração do Player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
            

        })
    }

    onInitialize(engine: Engine<any>): void {
        // Ativar o modo debug
        engine.toggleDebug()
        // Configurar Sprite do player
        const PlayerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth: 16,
                spriteHeight: 32,
                columns: 56,
                rows: 20
            },

            spacing:{
                originOffset:{
                    y: 4
                }
            }

        })

        // Criar as animações
        // Animações Idle
        // Idle Esquerda
        const leftIdle = new Animation ({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12, 1)},
                { graphic: PlayerSpriteSheet.getSprite(13, 1)},
                { graphic: PlayerSpriteSheet.getSprite(14, 1)},
                { graphic: PlayerSpriteSheet.getSprite(15, 1)},
                { graphic: PlayerSpriteSheet.getSprite(16, 1)},
                { graphic: PlayerSpriteSheet.getSprite(17, 1)},
            ],
            frameDuration: 70
        })
        this.graphics.add("left-idle", leftIdle)
        this.graphics.use("left-idle")

        // let imagemPlayer = PlayerSpriteSheet.getSprite(3, 0)
        // imagemPlayer.scale = vec(2, 2)

        // this.graphics.add(imagemPlayer)


        // Configurar player para monitorar eventos do "hold" -> segurar tecla
        engine.input.keyboard.on("hold", (event) => {
            // Declarar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    this.vel.x = -180
                
                    // Mover para esquerda
                    
                    break;
                case Keys.Right:
                case Keys.D:
                    this.vel.x= 180

                    break;
                
                case Keys.Up:
                case Keys.W:
                this.vel.y = -this.velocidade
                    break;

                case Keys.Down:
                case Keys.S:
                this.vel.y = this.velocidade
                    break;
            
                default:
                    // Zera a velocidade do player, PARA a movimentação
                    this.vel.x = 0
                    this.vel.y = 0
                    break;
            }
        })

        // Configura o player para monitorar evento "release" -> soltar tecla
        engine.input.keyboard.on("release", (event) => {
            if (
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // Zerar velocidade horizontal
                this.vel.x = 0
            }
            if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                // Zerar velocidade vertical
                this.vel.y = 0
            }
        })
    }


}