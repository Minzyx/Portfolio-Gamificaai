import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Scene, TextAlign, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class welcomeScene extends Scene{

    // Ao entrar ou sair da cena, utiliza o feito de transição lenta
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        //  Configura o objeto para ser a frase de Bem-Vindo
        let fraseBemVindo = new Label({
            text: "Bem vindo ao Portfólio",
            width: 400,
            height: 50,
            // Posição X= metade da tela, posição Y = 300
            pos: vec (engine.drawWidth / 2, 300),  
            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center,
                family: "Anta"
            })
        })
        // Exercicio - Criação do textoIniciar - Pressione "Enter para iniciar..."
        let fraseEnter = new Label({
            text: "Pressione \"Enter\" para iniciar...",
            width: 400,
            height: 20,
            // Posição X= metade da tela, posição Y = 300
            pos: vec (engine.drawWidth / 2, 600),  
            font: new Font({
                color: Color.White,
                size: 20,
                textAlign: TextAlign.Center,
                family: "Anta"
            })
        })
        fraseEnter.actions.repeatForever((repeat) => {
        
        repeat.fade(0,1000)
        repeat.fade(1, 1000)
             

        })


        // Adiciona a frase na cena 
        this.add(fraseBemVindo)
        this.add(fraseEnter)

        // Configurar Actor do Logo
        let actorLogo = new Actor({
            pos: vec(engine.drawWidth / 2, 430),
            
        })

        // Utilizar imagem do logo
        let imagemLogo = Resources.Logo.toSprite()

        // Aplicar zoom na iamgem - 40% de x, e 40% de y
        imagemLogo.scale = vec(0.4, 0.4)
       
        // Configurar o actor para usar a imagem
        actorLogo.graphics.add(imagemLogo)

        // Adicionando Actor Logo na tela
        this.add(actorLogo)

        // Monitora o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // Caso a tecla pressionada for "Enter", deve ir para a próxima cena
            if (event.key == Keys.Enter) {
                // Direciona para a cena história
                engine.goToScene("historia")
            }
        })
    }
}