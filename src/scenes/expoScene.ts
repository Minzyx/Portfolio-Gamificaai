import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npc";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Carregar o mapa
        let tiledMap = Resources.Mapa

        // Definir offset para renderização do mapa
        let offsetX = 138
        let offsetY = 100


        // Adicionar o mapa na cena
        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY),
        })

        // Definir zoom da camera para aumentar um pouco a visualização
        this.camera.zoom = 1.4

        // Carregar spawn point do player
        let spawPoint = tiledMap.getObjectsByName("player_spawn")[0]

        // Criação e configuração do Player
        let jogador = new Player(vec(spawPoint.x + offsetX, spawPoint.y + offsetY))

        // Define o z-index do player, util se algum outro elemento ficar por cima do jogador
        jogador.z = 3
        

        //  Adicionar o player na cena
        this.add(jogador)

        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPoinB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        // Configurar NPCs
        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
            Color.Blue,
            "NpcA"
        )

        let npcB = new Npc(
            vec(npcSpawnPoinB.x + offsetX, npcSpawnPoinB.y + offsetY),
            Color.Blue,
            "NpcB"
        )

        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
            Color.Blue,
            "NpcC"
        )

        // Adicionar os NPC
        this.add(npcA)
        this.add(npcB)
        this.add(npcC)
        npcA.z = 4
        npcB.z = 4
        npcC.z = 4

        // Focar a camera no Player
        this.camera.strategy.lockToActor(jogador)

        // Adiciomar colisão com cada objeto
        let camadaObjetosColisores = tiledMap.getObjectLayers("ObjetosColisores")[0]

        console.log(camadaObjetosColisores);

        // Percorrer objetos com foreach e para cada objeto, renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto =>{
            const objetoAtual = new Actor ({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y +offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed,
                
            })

        // Adicionar o colisor do objeto na cena
        this.add(objetoAtual)
        })
    }
    
}