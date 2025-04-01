document.addEventListener('DOMContentLoaded', () => {
    initWinnerMessages();
    initPalpiteTabs();
    initFootballResults();
    initFederalTabVisibility();
    initStoredPalpites();
    initLiveGames();
});

// Mensagens de Ganhadores
function initWinnerMessages() {
    const messages = [
        "Vitória Lins Silva ganhou R$ 12.018,78 no cassino!",
        "João Pedro Santos ganhou R$ 8.500,00 no jogo do bicho!",
        "Mariana Costa ganhou R$ 15.000,00 no cassino!",
        "Lucas Almeida ganhou R$ 5.200,00 no jogo do bicho!",
        "Ana Beatriz Lima ganhou R$ 20.450,90 no cassino!"
    ];
    const winnerMessageElement = document.getElementById('winner-message');
    let currentIndex = 0;

    function updateMessage() {
        winnerMessageElement.textContent = messages[currentIndex];
        currentIndex = (currentIndex + 1) % messages.length;
    }

    updateMessage();
    setInterval(updateMessage, 300000); // 5 minutos
}

// Abas de Palpites
function initPalpiteTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    tabButtons[0].classList.add('active');
    tabContents[0].classList.add('active');
}

// Controle da Aba FEDERAL
function initFederalTabVisibility() {
    const federalTab = document.getElementById('federal-tab');
    const federalContent = document.getElementById('federal');
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek !== 3 && dayOfWeek !== 6) {
        federalTab.style.display = 'none';
        federalContent.innerHTML = '<p><strong>Disponível às quartas e sábados</strong></p>';
    }
}

// Armazenamento de Palpites
function initStoredPalpites() {
    const currentDate = '2025-04-01'; // Data fixa para exemplo
    const palpitesDoDia = {
        'lotep': { animal: 'Avestruz', dezenas: '01, 02, 03, 04' },
        'maluca': { animal: 'Cobra', dezenas: '33, 34, 35, 36' },
        'ptrio': { animal: 'Gato', dezenas: '53, 54, 55, 56' },
        'nacional': { animal: 'Tigre', dezenas: '85, 86, 87, 88' },
        'lookgo': { animal: 'Urso', dezenas: '89, 90, 91, 92' },
        'federal': { animal: 'Leão', dezenas: '61, 62, 63, 64' }
    };

    const storedPalpites = JSON.parse(localStorage.getItem('palpites_' + currentDate));
    if (!storedPalpites) {
        localStorage.setItem('palpites_' + currentDate, JSON.stringify(palpitesDoDia));
    }

    Object.keys(palpitesDoDia).forEach(banca => {
        const content = document.getElementById(banca);
        const palpite = storedPalpites ? storedPalpites[banca] : palpitesDoDia[banca];
        content.innerHTML = `<p><strong>${palpite.animal}</strong> - Dezenas: ${palpite.dezenas}</p>`;
    });
}

// Resultados de Futebol
function initFootballResults() {
    const jogos = [
        { id: 'resultado-lib-1', palpite: 'Vitória do Flamengo', resultadoReal: 'Flamengo 2 x 1 Palmeiras' },
        { id: 'resultado-sud-1', palpite: 'Empate', resultadoReal: 'São Paulo 1 x 1 Racing' }
    ];

    jogos.forEach(jogo => {
        const resultadoElement = document.getElementById(jogo.id);
        const acertou = checkFootballResult(jogo.palpite, jogo.resultadoReal);

        if (acertou) {
            resultadoElement.textContent = 'BINGOOOO!';
            resultadoElement.classList.add('bingo');
        } else {
            resultadoElement.textContent = 'Não foi dessa vez...';
        }
    });
}

function checkFootballResult(palpite, resultadoReal) {
    if (palpite === 'Vitória do Flamengo' && resultadoReal.includes('Flamengo')) return true;
    if (palpite === 'Empate' && resultadoReal.includes('1 x 1')) return true;
    return false;
}

// Jogos ao Vivo (Simulação)
function initLiveGames() {
    let bichoCount = 0;
    let footballScore = { flamengo: 0, palmeiras: 0 };
    const animais = ['Avestruz', 'Cobra', 'Gato', 'Tigre', 'Urso'];
    const dezenas = ['01-04', '33-36', '53-56', '85-88', '89-92'];

    setInterval(() => {
        bichoCount = (bichoCount + 1) % animais.length;
        document.getElementById('live-result').textContent = `${animais[bichoCount]} - Dezenas: ${dezenas[bichoCount]}`;

        if (Math.random() > 0.7) footballScore.flamengo += 1;
        if (Math.random() > 0.7) footballScore.palmeiras += 1;
        document.getElementById('live-score').textContent = `Flamengo ${footballScore.flamengo} x ${footballScore.palmeiras} Palmeiras`;
    }, 10000); // Atualiza a cada 10 segundos
}

// Horários Pagantes do Cassino
const horariosPagantes = [
    { jogo: 'Roleta', horario: '14h - 16h' },
    { jogo: 'Slots', horario: '20h - 22h' },
    { jogo: 'Blackjack', horario: '10h - 12h' }
];

const horariosList = document.querySelector('.horarios-pagantes ul');
horariosPagantes.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.jogo}: ${item.horario}`;
    horariosList.appendChild(li);
});

// Validação do Formulário
const cadastroForm = document.querySelector('.cadastro-form');
cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = cadastroForm.querySelector('input[type="text"]').value;
    const email = cadastroForm.querySelector('input[type="email"]').value;
    const senha = cadastroForm.querySelector('input[type="password"]').value;

    if (nome && email && senha) {
        alert('Cadastro realizado com sucesso! Bem-vindo ao ClubeLoterias!');
        cadastroForm.reset();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
});
