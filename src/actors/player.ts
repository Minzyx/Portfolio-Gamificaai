import { Actor, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor{
    // Propriedade
    private velocidade: number = 180
    // Configuração do Player
    constructor() {
        super({
            pos: vec(600, 600),
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red
        })
    }

    onInitialize(engine: Engine<any>): void {
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