import prompt from "prompt-sync";
import { Quadra, Reserva } from "./quadras";

const teclado = prompt()
const quadras: Quadra[] = [];
const reservas: Reserva[] = [];

function mostrarMenu(): void {
    console.log("########### MENU ###########");
    console.log("1 - Criar Quadra");
    console.log("2 - Criar Reserva");
    console.log("3 - Listar Quadras");
    console.log("4 - Listar Reservas");
    console.log("0 - Sair");
}


while (true) {
    console.log("Abrir Menu Sim(8) Não(9)");

    const opcao = +teclado('Escolha uma opção: ');

    if (opcao === 0) {
        console.log("Saindo...");
        break;
    }

    if (opcao === 8) {
        mostrarMenu();
    } else if (opcao === 9) {
        console.log("Saindo...");
        break;
    }

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

        case 4:
            listarReservas();
            break;

        default:
            break;
    }
}

function criarQuadra(): Quadra {
    const quadra: Quadra = new Quadra();
    quadra.numero = +teclado('Número da Quadra: ');
    quadra.esporte = teclado('Esporte: ');
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

function fazerReserva(): Reserva {
    const reserva: Reserva = new Reserva();
    reserva.quadra = +teclado('Número da Quadra: ');
    reserva.data = teclado('Data (Dia/Mês): ');
    reserva.horario = teclado('Horário: ');
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
            console.log(`Esporte: ${reserva.data}`);
            console.log(`Esporte: ${reserva.horario}`);
            console.log(`Esporte: ${reserva.nome}`);
            console.log('---------------------');
        });
    }
}