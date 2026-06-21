import { useMemo, useState } from 'react'

const faixas = [
  { limite: 18.5, classificacao: 'Abaixo do peso', cor: '#5b8def' },
  { limite: 25, classificacao: 'Peso normal', cor: '#2bb673' },
  { limite: 30, classificacao: 'Sobrepeso', cor: '#f0a43c' },
  { limite: 35, classificacao: 'Obesidade grau I', cor: '#ef7b45' },
  { limite: 40, classificacao: 'Obesidade grau II', cor: '#e55353' },
  { limite: Infinity, classificacao: 'Obesidade grau III', cor: '#b43e8f' },
]

const tabela = [
  ['Menor que 18,5', 'Abaixo do peso'],
  ['18,5 a 24,9', 'Peso normal'],
  ['25,0 a 29,9', 'Sobrepeso'],
  ['30,0 a 34,9', 'Obesidade grau I'],
  ['35,0 a 39,9', 'Obesidade grau II'],
  ['40,0 ou mais', 'Obesidade grau III'],
]

function numero(valor) {
  return Number.parseFloat(valor.replace(',', '.'))
}

function App() {
  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')

  const resultado = useMemo(() => {
    const alturaEmMetros = numero(altura)
    const pesoEmKg = numero(peso)

    if (!altura || !peso || alturaEmMetros <= 0 || pesoEmKg <= 0) return null

    const imc = pesoEmKg / alturaEmMetros ** 2
    const faixa = faixas.find(({ limite }) => imc < limite)
    return { imc, ...faixa }
  }, [altura, peso])

  const limpar = () => {
    setAltura('')
    setPeso('')
  }

  return (
    <main className="pagina">
      <section className="cabecalho">
        <span className="selo">SAÚDE EM NÚMEROS</span>
        <h1>Descubra o seu <em>IMC</em></h1>
        <p>Informe seus dados para calcular o Índice de Massa Corporal e consultar sua classificação.</p>
      </section>

      <section className="conteudo">
        <div className="card formulario-card">
          <div className="card-titulo">
            <span className="numero">01</span>
            <div>
              <h2>Seus dados</h2>
              <p>Use sua altura em metros e seu peso em quilos.</p>
            </div>
          </div>

          <div className="campos">
            <label>
              Altura
              <div className="input-wrap">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 1,75"
                  value={altura}
                  onChange={(event) => setAltura(event.target.value)}
                  aria-label="Altura em metros"
                />
                <span>m</span>
              </div>
            </label>
            <label>
              Peso
              <div className="input-wrap">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 70"
                  value={peso}
                  onChange={(event) => setPeso(event.target.value)}
                  aria-label="Peso em quilos"
                />
                <span>kg</span>
              </div>
            </label>
          </div>

          <button type="button" className="limpar" onClick={limpar} disabled={!altura && !peso}>
            Limpar dados
          </button>

          <div className={`resultado ${resultado ? 'visivel' : ''}`} aria-live="polite">
            {resultado ? (
              <>
                <div>
                  <span>Seu IMC é</span>
                  <strong>{resultado.imc.toFixed(1).replace('.', ',')}</strong>
                </div>
                <p style={{ '--cor-resultado': resultado.cor }}>
                  <i /> {resultado.classificacao}
                </p>
              </>
            ) : (
              <p className="aguardando">Preencha os dois campos para ver seu resultado.</p>
            )}
          </div>
        </div>

        <div className="card tabela-card">
          <div className="card-titulo">
            <span className="numero">02</span>
            <div>
              <h2>Tabela de classificação</h2>
              <p>Referência para adultos.</p>
            </div>
          </div>

          <div className="tabela-wrap">
            <table>
              <thead>
                <tr><th>IMC</th><th>Classificação</th></tr>
              </thead>
              <tbody>
                {tabela.map(([intervalo, classificacao], index) => (
                  <tr className={resultado?.classificacao === classificacao ? 'ativo' : ''} key={classificacao}>
                    <td><span style={{ backgroundColor: faixas[index].cor }} />{intervalo}</td>
                    <td>{classificacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer>O IMC é uma medida de referência e não substitui avaliação profissional.</footer>
    </main>
  )
}

export default App
