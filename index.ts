import prompt from "prompt-sync";
import { Quadra, Reserva } from "./quadras";

const teclado = prompt()
const quadras: Quadra[] = [];
const reservas: Reserva[] = [];
let horariosDisponiveis: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const esportesDisponiveis: string[] = ['Basquete', 'Futebol', 'Pádel', 'Vôlei'];

function mostrarMenu(): void {
    console.log("########### MENU ###########");
    console.log("1 - Criar Quadra");
    console.log("2 - Criar Reserva");
    console.log("3 - Listar Quadras");
    console.log("4 - Listar Reservas");
    console.log("0 - Sair");
}


while (true) { 

    mostrarMenu();
    const opcao = +teclado('Escolha uma opção: ');
    
    switch (opcao) {
        case 1:
            const quadra: Quadra = criarQuadra();
            quadras.push(quadra);
            console.log("Quadra criada com sucesso")
            break;

        case 2:
            const reserva: Reserva = fazerReserva();
            reservas.push(reserva);
            console.log("Quadra reservada com sucesso")
            break;

        case 3:
            listarQuadras();
            break;

        case 4:
            listarReservas();
            break;

        case 0: 
            console.log('Saindo...')
            break;

        default:
            console.log('Tente novamente.')
            break;
    }
    if (opcao === 0) {
        break;
    }
}

function criarQuadra(): Quadra {
    const quadra: Quadra = new Quadra();
    quadra.numero = +teclado('Número da Quadra: ');

    console.log('Escolha um esporte: ');
    esportesDisponiveis.forEach((esporte, index) =>{
        console.log(`${index + 1} - ${esporte}`);
    });

    const escolhaEsporte = +teclado('Escolha um esporte (número): ');
    const esporteEscolhido = esportesDisponiveis[escolhaEsporte - 1];

    if(esporteEscolhido) {
        quadra.esporte = esporteEscolhido;
    } else {
        console.log('Esporte inválido.')
        return criarQuadra();
    }

    return quadra;
}

function listarQuadras() {
    if (quadras.length === 0) {
        console.log("Nenhuma quadra cadastrada");
    } else {
        console.log('---------------------');
        console.log("Quadras Cadastradas:");
        console.log('---------------------');
        quadras.forEach((quadra) => {
            console.log(`Quadra:`);
            console.log(`Número: ${quadra.numero}`);
            console.log(`Esporte: ${quadra.esporte}`);
            console.log('---------------------');
        });
    }
}

function exibirHorariosDisponiveis(): void {
    console.log("Horários disponíveis:");
    horariosDisponiveis.forEach((horario, index) => {
        console.log(`${index + 1} - ${horario}:00`);
    });
}

function removerHorario(horarioEscolhido: number): void {
    horariosDisponiveis = horariosDisponiveis.filter(horario => horario !== horarioEscolhido);
}


function fazerReserva(): Reserva {
    const reserva: Reserva = new Reserva();

    listarQuadras();

    reserva.quadra = +teclado('Número da Quadra: ');

    //esse "q" verifica se o número da quadra escolhida é o mesmo que o cara botou na hora de criar, se não encontrar, será undefined, dará como erro, e irá voltar para criação da reserva. gpt q me ensinou.
    const quadraEscolhida = quadras.find(q => q.numero === reserva.quadra);
    if (!quadraEscolhida) {
        console.log("Quadra não encontrada. Tente novamente.");
        return fazerReserva(); 
    }

    reserva.esporte = quadraEscolhida.esporte;

    exibirHorariosDisponiveis();
    const escolha = +teclado('Escolha um horário disponível (número): ');
    
    //Se colocar o número errado, dará como erro e irá voltar para escolha do bgl;
    const horarioEscolhido = horariosDisponiveis[escolha - 1];
    if (horarioEscolhido !== undefined) {
        reserva.horario = horarioEscolhido;
        removerHorario(horarioEscolhido);
    } else {
        console.log("Horário inválido, tente novamente.");
        return fazerReserva();
    }

    reserva.nome = teclado('Nome da Reserva: ');

    return reserva;
}


function listarReservas() {
    if (reservas.length === 0) {
        console.log("Nenhuma reserva cadastrada");
    } else {
        console.log('---------------------');
        console.log("Quadras Reservadas:");
        console.log('---------------------');
        reservas.forEach((reserva) => {
            console.log(`Reserva:`);
            console.log(`Quadra: ${reserva.quadra}`);
            console.log(`Nome da reserva: ${reserva.nome}`);
            console.log(`Esporte: ${reserva.esporte}`);
            console.log('---------------------');
        });
    }
}