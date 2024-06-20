import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any
    private elementotexto?: HTMLElement
    private actorEmpresa?: Actor
    private listaImagens?: Sprite[]
   
    
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray 
        // Criar elemento com a descrição do case
        this.elementotexto = document.createElement("div") as HTMLElement
        this.elementotexto.classList.add("texto-case")

        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementotexto)
        // Ao pressionar ESC voltar para a exposição
        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Esc) {
                engine.goToScene("exposicao")
            }
        })

        // Criar actor para receber a imagem
        this.actorEmpresa = new Actor ({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight - 50)
        })

        // Carregar imagens
        let backChar1 = Resources.backChar1.toSprite()
        let backChar2 = Resources.backChar2.toSprite()
        let backChar3 = Resources.backChar3.toSprite()

        this.listaImagens = [backChar1, backChar2, backChar3]
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        // Receber os dados passados pela cena anterior
        this.elementotexto!.style.opacity = "1"
        this.objetoInteracao = context.data
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            // Mesa A detectada
            this.elementotexto!.innerHTML =`<h2> Case 1 </h2>
            <p> Fizemos alguns trabalhos como ajudar escolas em seu desperdicio de alimentos na hora do almoço</p>  
            `
            // Inserir imagem
            this.actorEmpresa?.graphics.add(this.listaImagens![0])

            // Mudar zoom da imagem
            this.actorEmpresa!.graphics.current!.scale = vec(1.5, 1.5)
        }



        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            // Mesa B detectada
           this.elementotexto!.innerHTML =  `<h2> Case 2</h2>
            <p> Ajudamos uma escola com o problema de desperdício de comida dos alunos em suas refeições como almoço e janta.</p>
            <p> Colocamos uma tabela ao lado da cantina para os alunos terem uma experiência que remetesse a uma competição em rankings.</p>    
            <p> Nisso eles se sentiram mais motivados a consequentemente comerem melhor e não jogar comida fora.</p>    
            `

                    // Inserir imagem
                    this.actorEmpresa?.graphics.add(this.listaImagens![1])

                    // Mudar zoom da imagem
                    this.actorEmpresa!.graphics.current!.scale = vec(1.5, 1.5)
        }



        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {
            // Mesa C detectada
            this.elementotexto!.innerHTML =`<h2> Vamo joga vava</h2>
            <p> sim</p>  
            `
                    // Inserir imagem
                    this.actorEmpresa?.graphics.add(this.listaImagens![2])

                    // Mudar zoom da imagem
                    this.actorEmpresa!.graphics.current!.scale = vec(1.5, 1.5)
        }

        this.add(this.actorEmpresa!)
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementotexto!.style.opacity ="0"
    }
}