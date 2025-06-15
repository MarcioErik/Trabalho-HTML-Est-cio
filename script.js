// Função para mostrar/ocultar campos do formulário com base no serviço selecionado
document.getElementById('tipo-servico').addEventListener('change', function() {
    // Esconde todos os campos de serviço primeiro
    document.querySelectorAll('.servico-campos').forEach(function(campo) {
        campo.style.display = 'none';
    });
    
    // Mostra os campos correspondentes ao serviço selecionado
    const servicoSelecionado = this.value;
    if (servicoSelecionado) {
        document.getElementById(`campos-${servicoSelecionado}`).style.display = 'block';
    }
});

// Função para calcular orçamento de interpretação
document.getElementById('calcular-interpretacao').addEventListener('click', function() {
    // Obter valores do formulário
    const tipoEvento = document.getElementById('evento-tipo').value;
    const tempoEvento = parseInt(document.getElementById('evento-tempo').value) || 0;
    const gravado = document.querySelector('input[name="gravado"]:checked').value === 'sim';
    
    // Validar tempo do evento
    if (tempoEvento <= 0) {
        alert('Por favor, informe o tempo do evento em minutos.');
        return;
    }
    
    // Calcular valor por hora e quantidade de intérpretes
    let valorHora, qtdInterpretes;
    
    if (tipoEvento === 'artistico') {
        valorHora = 192.00;
    } else {
        valorHora = 144.00;
    }
    
    if (tempoEvento <= 60) {
        qtdInterpretes = 1;
    } else if (tempoEvento <= 360) {
        qtdInterpretes = 2;
    } else {
        // Para cada 360 minutos (6 horas), adiciona mais 1 intérprete
        qtdInterpretes = 2 + Math.floor((tempoEvento - 360) / 360);
        // Para eventos muito longos, valor da hora muda
        if (tempoEvento > 360) {
            valorHora = 130.00;
        }
    }
    
    // Calcular horas totais (arredondando para cima)
    const horasTotais = Math.ceil(tempoEvento / 60);
    
    // Calcular valor total das horas
    let valorTotalHoras = valorHora * horasTotais * qtdInterpretes;
    
    // Aplicar direito de imagem se necessário
    let direitoImagem = 0;
    if (gravado) {
        direitoImagem = valorTotalHoras * 0.10; // 10%
    }
    
    // Calcular valor total
    const valorTotal = valorTotalHoras + direitoImagem;
    
    // Calcular impostos (15.5%)
    const impostos = valorTotal * 0.155;
    
    // Exibir resultado
    const resultadoDiv = document.getElementById('resultado-interpretacao');
    resultadoDiv.innerHTML = `
        <h3>Detalhes do Orçamento</h3>
        <p><strong>Valor da hora por intérprete:</strong> R$ ${valorHora.toFixed(2)}</p>
        <p><strong>Quantidade de intérpretes:</strong> ${qtdInterpretes}</p>
        <p><strong>Tempo total de horas:</strong> ${horasTotais} hora(s)</p>
        <p><strong>Valor total das horas:</strong> R$ ${valorTotalHoras.toFixed(2)}</p>
        <p><strong>Direito de imagem (${gravado ? '10%' : '0%'}):</strong> R$ ${direitoImagem.toFixed(2)}</p>
        <p><strong>Valor total a ser pago:</strong> R$ ${valorTotal.toFixed(2)}</p>
        <p><strong>Impostos (15.5%):</strong> R$ ${impostos.toFixed(2)}</p>
        <p><strong>Valor final:</strong> R$ ${(valorTotal + impostos).toFixed(2)}</p>
    `;
});

// Função para calcular orçamento de tradução
document.getElementById('calcular-traducao').addEventListener('click', function() {
    // Obter valores do formulário
    const tipoMaterial = document.getElementById('material-tipo').value;
    const tempoMaterial = parseInt(document.getElementById('material-tempo').value) || 0;
    const legendagem = document.querySelector('input[name="legendagem"]:checked').value === 'sim';
    
    // Validar tempo do material
    if (tempoMaterial <= 0) {
        alert('Por favor, informe o tempo do material em minutos.');
        return;
    }
    
    // Calcular valor por minuto
    let valorMinuto;
    
    if (tipoMaterial === 'propaganda' || tipoMaterial === 'tv') {
        valorMinuto = 250.00;
    } else if (legendagem) {
        valorMinuto = 96.00;
    } else {
        valorMinuto = 60.00;
    }
    
    // Calcular valor total
    let valorTotal = valorMinuto * tempoMaterial;
    
    // Aplicar direito de imagem (30%)
    const direitoImagem = valorTotal * 0.30;
    
    // Calcular valor total com direito de imagem
    const valorTotalComDI = valorTotal + direitoImagem;
    
    // Calcular impostos (15.5%)
    const impostos = valorTotalComDI * 0.155;
    
    // Exibir resultado
    const resultadoDiv = document.getElementById('resultado-traducao');
    resultadoDiv.innerHTML = `
        <h3>Detalhes do Orçamento</h3>
        <p><strong>Valor do minuto:</strong> R$ ${valorMinuto.toFixed(2)}</p>
        <p><strong>Tempo total em minutos:</strong> ${tempoMaterial} minuto(s)</p>
        <p><strong>Valor total:</strong> R$ ${valorTotal.toFixed(2)}</p>
        <p><strong>Direito de imagem (30%):</strong> R$ ${direitoImagem.toFixed(2)}</p>
        <p><strong>Valor total a ser pago:</strong> R$ ${valorTotalComDI.toFixed(2)}</p>
        <p><strong>Impostos (15.5%):</strong> R$ ${impostos.toFixed(2)}</p>
        <p><strong>Valor final:</strong> R$ ${(valorTotalComDI + impostos).toFixed(2)}</p>
    `;
});

// Suavizar rolagem para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});