const { useMemo, useState } = React;
const criarElemento = React.createElement;

const faixas = [
  { ate: 18.5, intervalo: 'Menor que 18,5', nome: 'Abaixo do peso', cor: '#4f8bd6' },
  { ate: 25, intervalo: '18,5 a 24,9', nome: 'Peso normal', cor: '#2f9e72' },
  { ate: 30, intervalo: '25,0 a 29,9', nome: 'Sobrepeso', cor: '#e4a03a' },
  { ate: 35, intervalo: '30,0 a 34,9', nome: 'Obesidade grau I', cor: '#e87945' },
  { ate: 40, intervalo: '35,0 a 39,9', nome: 'Obesidade grau II', cor: '#dc5252' },
  { ate: Infinity, intervalo: '40,0 ou mais', nome: 'Obesidade grau III', cor: '#a83d78' }
];

function converterNumero(valor) {
  return Number.parseFloat(valor.replace(',', '.'));
}

function CalculadoraIMC() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  const resultado = useMemo(() => {
    const alturaNumerica = converterNumero(altura);
    const pesoNumerico = converterNumero(peso);

    if (!Number.isFinite(alturaNumerica) || !Number.isFinite(pesoNumerico) || alturaNumerica <= 0 || pesoNumerico <= 0) {
      return null;
    }

    const imc = pesoNumerico / (alturaNumerica * alturaNumerica);
    const faixa = faixas.find((item) => imc < item.ate);
    return { imc, faixa };
  }, [altura, peso]);

  function limpar() {
    setAltura('');
    setPeso('');
  }

  return criarElemento('main', { className: 'pagina' },
    criarElemento('header', { className: 'apresentacao' },
      criarElemento('span', { className: 'etiqueta' }, 'SAÚDE EM NÚMEROS'),
      criarElemento('h1', null, 'Calcule o seu ', criarElemento('em', null, 'IMC')),
      criarElemento('p', null, 'Informe sua altura e seu peso para descobrir seu Índice de Massa Corporal e consultar a classificação.')
    ),

    criarElemento('section', { className: 'grade' },
      criarElemento('article', { className: 'cartao calculadora' },
        criarElemento('div', { className: 'titulo-cartao' },
          criarElemento('span', { className: 'numero' }, '01'),
          criarElemento('div', null,
            criarElemento('h2', null, 'Seus dados'),
            criarElemento('p', null, 'Preencha os dois campos abaixo.')
          )
        ),

        criarElemento('div', { className: 'campos' },
          criarElemento('label', null, 'Altura',
            criarElemento('div', { className: 'campo' },
              criarElemento('input', {
                type: 'text', inputMode: 'decimal', placeholder: 'Ex.: 1,75',
                value: altura, onChange: (evento) => setAltura(evento.target.value),
                'aria-label': 'Altura em metros'
              }),
              criarElemento('span', null, 'm')
            )
          ),
          criarElemento('label', null, 'Peso',
            criarElemento('div', { className: 'campo' },
              criarElemento('input', {
                type: 'text', inputMode: 'decimal', placeholder: 'Ex.: 70',
                value: peso, onChange: (evento) => setPeso(evento.target.value),
                'aria-label': 'Peso em quilogramas'
              }),
              criarElemento('span', null, 'kg')
            )
          )
        ),

        criarElemento('button', { className: 'limpar', type: 'button', onClick: limpar, disabled: !altura && !peso }, 'Limpar dados'),

        criarElemento('div', { className: `resultado ${resultado ? 'calculado' : ''}`, 'aria-live': 'polite' },
          resultado
            ? criarElemento(React.Fragment, null,
                criarElemento('div', { className: 'valor-imc' },
                  criarElemento('span', null, 'Seu IMC é'),
                  criarElemento('strong', null, resultado.imc.toFixed(1).replace('.', ','))
                ),
                criarElemento('p', { className: 'classificacao' },
                  criarElemento('i', { style: { backgroundColor: resultado.faixa.cor } }),
                  resultado.faixa.nome
                )
              )
            : criarElemento('p', { className: 'instrucao' }, 'O resultado aparecerá aqui assim que os dados forem preenchidos.')
        )
      ),

      criarElemento('article', { className: 'cartao tabela-cartao' },
        criarElemento('div', { className: 'titulo-cartao' },
          criarElemento('span', { className: 'numero' }, '02'),
          criarElemento('div', null,
            criarElemento('h2', null, 'Tabela de classificação'),
            criarElemento('p', null, 'Valores de referência para adultos.')
          )
        ),
        criarElemento('div', { className: 'tabela-responsiva' },
          criarElemento('table', null,
            criarElemento('thead', null,
              criarElemento('tr', null,
                criarElemento('th', null, 'IMC'),
                criarElemento('th', null, 'Classificação')
              )
            ),
            criarElemento('tbody', null,
              ...faixas.map((faixa) => criarElemento('tr', {
                key: faixa.nome,
                className: resultado && resultado.faixa.nome === faixa.nome ? 'ativo' : ''
              },
                criarElemento('td', null,
                  criarElemento('i', { style: { backgroundColor: faixa.cor } }),
                  faixa.intervalo
                ),
                criarElemento('td', null, faixa.nome)
              ))
            )
          )
        )
      )
    ),

    criarElemento('footer', null, 'O IMC é uma medida de referência e não substitui uma avaliação profissional.')
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(criarElemento(CalculadoraIMC));
