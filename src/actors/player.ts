import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Resource, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor{
    // Propriedade
    private velocidade: number = 180
    private ultimaDirecao: string = "down"

    private temobjetoProximo: boolean = false
    private ultimoColisor?: Collider
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
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },

            spacing:{
                originOffset:{
                    y: 0
                }
            }

        })

        // Criar as animações
        // Animações Idle
        // Idle Esquerda
        const duracaoFrameAnimacao = 70
        const leftIdle = new Animation ({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12, 1)},
                { graphic: PlayerSpriteSheet.getSprite(13, 1)},
                { graphic: PlayerSpriteSheet.getSprite(14, 1)},
                { graphic: PlayerSpriteSheet.getSprite(15, 1)},
                { graphic: PlayerSpriteSheet.getSprite(16, 1)},
                { graphic: PlayerSpriteSheet.getSprite(17, 1)}
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-idle", leftIdle)

        // Idle Direita
        const rightIdle = new Animation ({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(0,1)},
                { graphic: PlayerSpriteSheet.getSprite(1,1)},
                { graphic: PlayerSpriteSheet.getSprite(2,1)},
                { graphic: PlayerSpriteSheet.getSprite(3,1)},
                { graphic: PlayerSpriteSheet.getSprite(4,1)},
                { graphic: PlayerSpriteSheet.getSprite(5,1)},
            ],
            frameDuration:duracaoFrameAnimacao
        })
        this.graphics.add("right-idle", rightIdle)

        // Idle up
        const upIdle = new Animation ({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(6,1)},
                { graphic: PlayerSpriteSheet.getSprite(7,1)},
                { graphic: PlayerSpriteSheet.getSprite(8,1)},
                { graphic: PlayerSpriteSheet.getSprite(9,1)},
                { graphic: PlayerSpriteSheet.getSprite(10,1)},
                { graphic: PlayerSpriteSheet.getSprite(11,1)},
            ],
            frameDuration:duracaoFrameAnimacao
        })
        this.graphics.add("up-idle", upIdle)

        // Idle down

        const downIdle = new Animation ({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(18,1)},
                { graphic: PlayerSpriteSheet.getSprite(19,1)},
                { graphic: PlayerSpriteSheet.getSprite(20,1)},
                { graphic: PlayerSpriteSheet.getSprite(21,1)},
                { graphic: PlayerSpriteSheet.getSprite(22,1)},
                { graphic: PlayerSpriteSheet.getSprite(23,1)},
            ],
            frameDuration:duracaoFrameAnimacao
        })
        this.graphics.add("down-idle", downIdle)

        // Definir animação inicial do player
        this.graphics.use("down-idle")
        
        // Definir zoom
        this.graphics.current!.scale = vec(0.9, 0.9)

        // Animação Walk
        // Andar para a esquerda
        const leftWalk = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(12, 2)},
                {graphic: PlayerSpriteSheet.getSprite(13, 2)},
                {graphic: PlayerSpriteSheet.getSprite(14, 2)},
                {graphic: PlayerSpriteSheet.getSprite(15, 2)},
                {graphic: PlayerSpriteSheet.getSprite(16, 2)},
                {graphic: PlayerSpriteSheet.getSprite(17, 2)},
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-walk", leftWalk)
        // Andar para a direita
        const rightWalk = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(0, 2)},
                {graphic: PlayerSpriteSheet.getSprite(1, 2)},
                {graphic: PlayerSpriteSheet.getSprite(2, 2)},
                {graphic: PlayerSpriteSheet.getSprite(3, 2)},
                {graphic: PlayerSpriteSheet.getSprite(4, 2)},
                {graphic: PlayerSpriteSheet.getSprite(5, 2)},
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-walk", rightWalk)

        // Andar para cima

        const upWalk = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(6, 2)},
                {graphic: PlayerSpriteSheet.getSprite(7, 2)},
                {graphic: PlayerSpriteSheet.getSprite(8, 2)},
                {graphic: PlayerSpriteSheet.getSprite(9, 2)},
                {graphic: PlayerSpriteSheet.getSprite(10, 2)},
                {graphic: PlayerSpriteSheet.getSprite(11, 2)},
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-walk", upWalk)

        // Andar para baixo
        const downWalk = new Animation ({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(18,2)},
                { graphic: PlayerSpriteSheet.getSprite(19,2)},
                { graphic: PlayerSpriteSheet.getSprite(20,2)},
                { graphic: PlayerSpriteSheet.getSprite(21,2)},
                { graphic: PlayerSpriteSheet.getSprite(22,2)},
                { graphic: PlayerSpriteSheet.getSprite(23,2)},
            ],
            frameDuration:duracaoFrameAnimacao
        })
        this.graphics.add("down-walk", downWalk)


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
                this.graphics.use("left-walk")
                    // Mover para esquerda
                    
                    break;
                case Keys.Right:
                case Keys.D:
                    this.vel.x= 180
                    this.graphics.use("right-walk")
                    break;
                
                case Keys.Up:
                case Keys.W:
                this.vel.y = -this.velocidade
                this.graphics.use("up-walk")
                    break;

                case Keys.Down:
                case Keys.S:
                this.vel.y = this.velocidade
                this.graphics.use("down-walk")
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

            // Ao parar o player, definir animação idle da ultima direção
            if (this.vel.x == 0 && this. vel.y == 0) {
                // ultimaDirecao - left, riht, up, down
                // Colar a ultimaDirecao + idle -> ex. left-idle, right-idle, up-dile
                this.graphics.use(this.ultimaDirecao + "-idle")
                // this.graphics.current!.scale = vec (1.6, 1.6)
            }
        })

        // Configurar o player para monitorar evento "press" -> pressionar
        engine.input.keyboard.on("press", (event) => {
            // Se a tecla pressionada for F
            if (event.key == Keys.F && this.temobjetoProximo) {
            // Identificar o alvo da interação
            if (this.ultimoColisor?.owner.name == "mesa_stand_a") {
                console.log("Essa é mesa A");
                // Vai para a cena passando qual o objeto da interação
                engine.goToScene("case", {
                    sceneActivationData: {
                        nomedoActor: this.collider?.owner?.name
                        
                    }
                })
            }
            if (this.ultimoColisor?.owner.name == "mesa_stand_b") {
                console.log("Essa é mesa B");
            }
            if (this.ultimoColisor?.owner.name == "mesa_stand_c") {
                console.log("Essa é mesa C");
            }

            }
        })
        
    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Indcar que tem um objeto próximo
        this.temobjetoProximo = true
        
        // Registrar o ultimo objeto colidido
        this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // Detectar se o player está distante do ultimo objeto
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 40) {
            this.temobjetoProximo = false
            
            // console.log("Está longe");
        }
    }
}