# Simulador Interativo de Fotografia

> Ferramenta educacional interativa para aprender configuracoes de camera e iluminacao de forma pratica e visual

## Sobre o Projeto

Simulador desenvolvido para o **Curso Vinicius Cunha Fotografia**, permitindo que alunos experimentem com diferentes parametros fotograficos e vejam os resultados em tempo real, sem precisar de equipamento fisico.

## Funcionalidades

- Controles Interativos: Ajuste abertura, ISO, tempo de exposicao e intensidade da luz
- Preview em Tempo Real: Veja o resultado instantaneo das suas configuracoes
- Tooltips Educacionais: Explicacoes claras sobre cada parametro
- Reset Rapido: Volte as configuracoes padrao com um clique
- Feedback Inteligente: Receba sugestoes sobre a qualidade da exposicao
- Design Responsivo: Funciona perfeitamente em desktop, tablet e mobile

## Stack Tecnologica

- Frontend: React + TypeScript
- Estilizacao: Tailwind CSS  
- Build: Vite
- Controle de Versao: Git/GitHub

## Como Usar

### Pre-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalacao

```bash
# Clone o repositorio
git clone https://github.com/v1ncsc/fotografia-simulador-interativo.git

# Entre na pasta do projeto
cd fotografia-simulador-interativo

# Instale as dependencias  
npm install

# Execute o projeto em modo desenvolvimento
npm run dev
```

### Deploy

```bash
# Crie a build de producao
npm run build

# Preview da build
npm run preview
```

## Parametros do Simulador

### Abertura (f/)
Controla a quantidade de luz que entra na camera e a profundidade de campo. Valores menores = mais luz e menor profundidade.

### ISO
Sensibilidade do sensor a luz. Valores mais altos sao uteis em ambientes escuros, mas podem gerar ruido.

### Tempo de Exposicao
Duracao que o sensor fica exposto a luz. Tempos mais longos capturam mais luz, mas podem causar desfoque de movimento.

### Intensidade da Luz
Controla o brilho da fonte de luz principal do cenario.

## Desenvolvimento com IA

Este projeto foi desenvolvido utilizando o fluxo moderno de desenvolvimento assistido por IA:

1. **Google Stitch**: Geracao inicial do design e estrutura
2. **Google Jules**: Automacao de codigo e funcionalidades interativas
3. **Figma**: Refinamento visual e prototipacao
4. **VSCode**: Desenvolvimento e ajustes finais

## Licenca

MIT License - Veja o arquivo LICENSE para detalhes.

## Roadmap

- [ ] Adicionar mais cenarios fotograficos
- [ ] Implementar simulacao de diferentes tipos de lentes  
- [ ] Criar desafios praticos para os alunos
- [ ] Adicionar sistema de pontuacao e gamificacao
- [ ] Integracao com plataforma do curso
- [ ] Modo offline (PWA)

---

Feito com ❤️ para alunos de fotografia | Vinicius Cunha Fotografia
