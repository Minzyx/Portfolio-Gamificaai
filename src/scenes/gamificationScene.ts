import { Actor, Color, Engine, Resource, Scene, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
    ElementoHTML?: HTMLElement

    onInitialize(Engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        this.ElementoHTML = document.createElement("div") as HTMLElement
        this.ElementoHTML.style.opacity = "1"

        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.ElementoHTML)

        this.ElementoHTML.innerHTML = `<h2> O que é gamificação?</h2>
         <p> Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`
        this.ElementoHTML.classList.add("gamificacao")

        // Carregando imagem
        let spriteLogoGamificaAi = Resources.LogoVertical.toSprite()
        spriteLogoGamificaAi.scale = vec(0.7, 0.7)

        // Criação do Actor para a imagem
        let actorLogoGamificaAi = new Actor({
            pos: vec (300,this.engine.halfDrawHeight)
        })

        actorLogoGamificaAi.graphics.add(spriteLogoGamificaAi)

        this.add(actorLogoGamificaAi)

    }
    
}

