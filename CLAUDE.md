# Contexto do projeto — Freelance Web (Felipe Larré)

## Quem sou

Desenvolvedor freelancer em início de operação comercial, foco em Front-End, criando
sites para pequenos e médios negócios locais (pousadas, restaurantes, clínicas,
salões, barbearias, academias, oficinas, escritórios, comércio local).

## Stack e regras técnicas

* **HTML5 + CSS3 + JavaScript puro.** Não usar frameworks (React, Vue, etc.) neste
momento, mesmo que pareçam mais rápidos de implementar. Bibliotecas JS pontuais
são aceitáveis quando fizerem sentido real.
* Evitar dependências desnecessárias. Antes de sugerir uma lib nova, explique o
que ela resolve e se realmente vale a pena para um site comercial simples.
* Animações: usar **GSAP** (core, timeline, ScrollTrigger, utils, performance —
skills já instaladas neste projeto) guiado pelos princípios da skill
**motion-design** (timing, easing, coreografia, propósito — nunca animação
gratuita).
* Sempre considerar: performance (carregamento rápido), responsividade
(excelente experiência no celular), SEO básico, acessibilidade, estrutura
semântica.

## Objetivo de cada site

Não é "fazer um site genérico". O objetivo é resolver problemas reais do negócio:
transmitir profissionalismo, apresentar serviços, gerar contato via WhatsApp,
aparecer melhor no Google, converter visitante em cliente.

Padrão de qualidade: o cliente deve pensar "isso parece uma empresa profissional",
nunca "isso parece um site feito por um programador". Design moderno, premium,
com hierarquia visual forte, tipografia bem escolhida, espaçamento profissional,
microinterações e animações com propósito (conduzir atenção, criar hierarquia,
contar uma história) — inspirado na filosofia código + design + experiência +
resultado comercial.

## Elementos obrigatórios em todo site

Todo projeto deve incluir, por padrão, sem precisar ser pedido:

- **Preloader** — tela de carregamento inicial (antes do conteúdo aparecer), com transição suave para o conteúdo principal.
- **Favicon** — ícone da aba do navegador, condizente com a identidade visual do cliente (logo, inicial do nome, ou ícone representativo quando não houver logo definida).
- **CTA de WhatsApp** — quando o CTA principal ou secundário for WhatsApp: usar link direto no formato `https://wa.me/55DDDNUMERO?text=mensagem-pré-preenchida` (número real, nunca inventado), com mensagem curta e específica do negócio. Incluir também um **botão flutuante fixo no mobile** (ex: canto inferior direito), sempre visível durante a rolagem, com área de toque mínima de 44x44px — é o principal mecanismo de conversão do site, não é opcional.

**Verificação de logo/emblema real (fazer sempre, antes de decidir sobre o favicon):**
Antes de gerar qualquer favicon automático, procure ativamente por uma logo ou emblema real da marca nos materiais fornecidos: foto de perfil do Instagram, cardápios em PDF, panfletos, fachada, papelaria. Muitos pequenos negócios já têm um selo/emblema visual definido mesmo sem "manual de marca" formal — isso conta como logo real e deve ser extraído e usado, tanto no favicon quanto no header do site. Só gerar o favicon automático pela inicial do nome quando nenhuma logo/emblema real for encontrada em nenhum material disponível.

**Geração automática do favicon (quando não houver logo do cliente):**

Antes de aplicar as regras abaixo, confirme que de fato não existe logo/emblema real disponível (ver verificação acima).

- Gerar um favicon simples baseado na inicial do nome da empresa (ex: "Oficina do João" → inicial "J" ou "O", a que for mais forte visualmente).
- Usar a cor primária definida pela skill frontend-aesthetic-direction como fundo, com a inicial em cor de contraste (texto claro em fundo escuro, ou vice-versa).
- Gerar como SVG primeiro (mais simples e escalável), depois exportar para os formatos necessários (`.ico` + `.png` em múltiplos tamanhos: 16x16, 32x32, 180x180 para Apple Touch Icon).
- Se o cliente fornecer uma logo real depois, substituir este favicon gerado pela versão oficial.

**Preloader — nota de flexibilidade:** o estilo do preloader (spinner, fade de logo/inicial, barra de progresso, ou outro) não é fixo no template — decida por projeto, de acordo com a direção visual travada pela skill frontend-aesthetic-direction e os princípios de motion-design. O único requisito fixo é: existir, ter transição suave para o conteúdo, e respeitar `prefers-reduced-motion`.

## Hierarquia e organização de conteúdo

Problema recorrente a evitar: texto "jogado" nas seções sem ordem de leitura clara, exigindo reorganização manual depois da entrega.

- Cada seção segue a ordem: **título → subtítulo/contexto → corpo → CTA**, salvo justificativa de design específica para o contrário.
- Parágrafo de corpo não ultrapassa ~3-4 linhas em desktop. Conteúdo mais longo vira sub-blocos, tópicos ou cards — nunca um bloco corrido extenso.
- Informação crítica para a decisão do visitante (preço, diferencial competitivo, contato, prova social) nunca fica enterrada dentro de um parágrafo — vira destaque visual próprio (badge, número em evidência, linha isolada).
- Toda seção deve responder "essa seção existe para ___" em uma frase clara. Se não for possível resumir assim, a seção está acumulando funções demais e deve ser dividida em duas.
- Manter a mesma estrutura (título/subtítulo/corpo/CTA) entre seções do mesmo tipo ao longo do site — não inventar uma organização nova a cada seção sem motivo.

**Copywriting:**
- Voz ativa sempre. Botões dizem exatamente o que fazem ("Ver Cardápio", "Falar no WhatsApp"), nunca genéricos ("Clique Aqui", "Saiba Mais" sem contexto).
- Texto específico ao negócio real do cliente — usar detalhes concretos (nome de pratos, bairro, anos de experiência, número de clientes atendidos) em vez de frases de efeito vazias ("soluções inovadoras", "excelência em qualidade", "compromisso com a satisfação").
- Tom de voz consistente do início ao fim do site — não alternar entre formal e casual sem motivo de design.
- Clareza vence criatividade: prefira uma frase direta e específica a uma frase de efeito genérica que poderia estar em qualquer site do mesmo nicho.

## Deploy

Todos os projetos são publicados no **GitHub Pages** (não Netlify). Padrão:

- Cada cliente tem um repositório **privado** no GitHub.
- Deploy via `git push origin main` — GitHub Pages atualiza automaticamente em 1-3 minutos.
- Se houver domínio customizado do cliente, configurar via arquivo `CNAME` na raiz do projeto.
- Referências a Netlify em qualquer arquivo do projeto (README, `.gitignore`, configs) são resquício antigo e devem ser removidas ou atualizadas ao encontrar.

## Checklist antes de publicar

- [ ] Favicon presente (logo real extraída, ou gerado pela inicial se não houver logo)
- [ ] Logo/identificação da marca visível no header
- [ ] Preloader implementado, com transição suave e respeitando `prefers-reduced-motion`
- [ ] Botão de WhatsApp com link `wa.me` correto (número real) e versão flutuante fixa no mobile
- [ ] Todas as seções seguem a hierarquia título → subtítulo → corpo → CTA
- [ ] Nenhum parágrafo excessivamente longo ou com informação crítica enterrada
- [ ] Tom de texto consistente do início ao fim
- [ ] Responsivo sem quebras visuais (mobile, tablet, desktop)
- [ ] Sem console errors no navegador
- [ ] Repositório GitHub configurado como privado, sem resquícios de Netlify

## Como trabalhar comigo

Aja como parceiro técnico e mentor, não como gerador de código passivo:

1. Entenda o objetivo antes de implementar.
2. Questione requisitos importantes quando fizer sentido.
3. Aponte problemas e sugira melhorias — não apenas execute.
4. Planeje antes de implementar em tarefas maiores.
5. Explique decisões técnicas relevantes.
6. Priorize soluções simples quando forem suficientes; evite complexidade
desnecessária e funcionalidades que não foram pedidas.
7. Mantenha o código organizado, sem duplicação.

**Importante — não seja passivo:** se eu estiver tomando uma decisão técnica
ruim, se existir solução melhor, se eu propuser algo desnecessariamente
complexo, ou se algo prejudicar performance, UX, SEO ou manutenção, me avise
antes de simplesmente executar.

## Fluxo do projeto

Cada pasta de cliente nasce de uma cópia deste `_template`. Fluxo típico:
pesquisa da empresa → briefing organizado → pré-projeto/demonstração →
reunião/venda → briefing completo → desenvolvimento final → testes → deploy →
entrega → pós-venda.
