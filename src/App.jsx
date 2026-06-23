import { useMemo, useState } from 'react'

const faixasImc = [
  {
    classificacao: 'Abaixo do peso',
    intervalo: 'Menor que 18,5',
    minimo: 0,
    maximo: 18.5,
  },
  {
    classificacao: 'Peso normal',
    intervalo: '18,5 a 24,9',
    minimo: 18.5,
    maximo: 25,
  },
  {
    classificacao: 'Sobrepeso',
    intervalo: '25 a 29,9',
    minimo: 25,
    maximo: 30,
  },
  {
    classificacao: 'Obesidade grau I',
    intervalo: '30 a 34,9',
    minimo: 30,
    maximo: 35,
  },
  {
    classificacao: 'Obesidade grau II',
    intervalo: '35 a 39,9',
    minimo: 35,
    maximo: 40,
  },
  {
    classificacao: 'Obesidade grau III',
    intervalo: 'Maior ou igual a 40',
    minimo: 40,
    maximo: Infinity,
  },
]

function formatarNumero(valor) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

function obterClassificacao(imc) {
  return faixasImc.find(({ minimo, maximo }) => imc >= minimo && imc < maximo)
}

function normalizarAltura(altura) {
  const alturaNumerica = Number(String(altura).replace(',', '.'))

  if (alturaNumerica > 3) {
    return alturaNumerica / 100
  }

  return alturaNumerica
}

export default function App() {
  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')

  const resultado = useMemo(() => {
    const alturaEmMetros = normalizarAltura(altura)
    const pesoNumerico = Number(String(peso).replace(',', '.'))

    if (!alturaEmMetros || !pesoNumerico || alturaEmMetros <= 0 || pesoNumerico <= 0) {
      return null
    }

    const imc = pesoNumerico / alturaEmMetros ** 2
    const faixa = obterClassificacao(imc)

    return {
      imc,
      classificacao: faixa?.classificacao ?? 'Não identificado',
    }
  }, [altura, peso])

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Projeto ReactJS</p>
          <h1>Calculadora de IMC</h1>
          <p>
            Informe sua altura e peso para calcular automaticamente o IMC e
            visualizar a classificação correspondente na tabela.
          </p>
        </div>
      </section>

      <section className="card">
        <form className="form">
          <label htmlFor="altura">
            Altura
            <input
              id="altura"
              type="number"
              min="0"
              step="0.01"
              placeholder="Ex: 1,75 ou 175"
              value={altura}
              onChange={(event) => setAltura(event.target.value)}
            />
          </label>

          <label htmlFor="peso">
            Peso
            <input
              id="peso"
              type="number"
              min="0"
              step="0.1"
              placeholder="Ex: 70"
              value={peso}
              onChange={(event) => setPeso(event.target.value)}
            />
          </label>
        </form>

        <div className="resultado">
          <span>Seu IMC</span>
          <strong>{resultado ? formatarNumero(resultado.imc) : '--'}</strong>
          <p>{resultado ? resultado.classificacao : 'Preencha os campos para calcular.'}</p>
        </div>
      </section>

      <section className="table-card">
        <h2>Tabela de classificação</h2>
        <table>
          <thead>
            <tr>
              <th>IMC</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            {faixasImc.map((faixa) => (
              <tr
                key={faixa.classificacao}
                className={resultado?.classificacao === faixa.classificacao ? 'ativo' : ''}
              >
                <td>{faixa.intervalo}</td>
                <td>{faixa.classificacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
