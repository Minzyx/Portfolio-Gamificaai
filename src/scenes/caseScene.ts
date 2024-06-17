import { Actor, Color, Engine, FadeInOut, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any
    elementoHTML?: HTMLElement
    private textoDaCena?: string
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

    }

    onActivate(context: SceneActivationContext<unknown>): void {
        // Pegar dados vinods da cena passa
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao);

        // Se for mesa a
        if (this.objetoInteracao.nomedoActor == "mesa_stand_a") {
            this.textoDaCena = "Essa é a descrição do case A"
            this.elementoHTML = document.createElement("div") as HTMLElement
            this.elementoHTML.style.opacity = "1"

            let containerGame = document.querySelector(".container-game")
            containerGame?.appendChild(this.elementoHTML)

            this.elementoHTML.innerHTML = `<h2>O que é gamificação?</h2>
            <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`

            this.elementoHTML.classList.add("gamificacao")

            // Carregando imagem
            let spriteLogoGamificaAi = Resources.LogoVertical.toSprite()
            spriteLogoGamificaAi.scale = vec(0.7, 0.7)

            // Criação do Actor para a imagem
            let actorLogoGamificaAi = new Actor({
                pos: vec(300, this.engine.halfDrawHeight)
            })

            actorLogoGamificaAi.graphics.add(spriteLogoGamificaAi)

            this.add(actorLogoGamificaAi)

        }
        if (this.objetoInteracao.nomedoActor == "mesa_stand_b") {
            this.textoDaCena = "Essa é a descrição do case B"
        }
        if (this.objetoInteracao.nomedoActor == "mesa_stand_c") {
            this.textoDaCena = "Essa é a descrição do case C"
        }
    }
}