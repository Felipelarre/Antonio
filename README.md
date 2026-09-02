# Seu Antônio Bar e Petiscaria — site

Site de página única (landing) para o **Seu Antônio Bar e Petiscaria**, no Janga,
Paulista-PE. HTML + CSS + JavaScript puro, sem framework. Deploy no GitHub Pages.

## Seções

Hero · O Bar · Diferenciais · Cardápio · Happy Hour · Música ao vivo · Galeria ·
Avaliações · Localização · Rodapé. Preloader, favicon (emblema redondo da marca),
botão flutuante de WhatsApp e menu mobile em tela cheia.

## Estrutura de arquivos

```
/index.html                     → página principal
/politica-de-privacidade.html   → política de privacidade (LGPD)
/favicon.ico, /favicon-32.png…  → ícones, gerados do emblema redondo da marca
/site.webmanifest, /robots.txt, /sitemap.xml
/assets/css/        → reset.css · tokens.css (design tokens) · style.css
/assets/js/         → main.js (preloader, menu, reveals, parallax)
/assets/img/        → logo-circular.png (usada no site), logo-emblema.png (original), og-image
/assets/fotos/      → fotos reais do bar
/assets/fotos/_promo/ → panfletos do cliente (referência; NÃO exibidos no site)
/assets/cardapios/  → cardapio-seu-antonio.pdf (completo) · cardapio-drinks-seu-antonio.pdf
```

## Antes de publicar

1. **Domínio** — o site usa `https://seuantoniojanga.com.br/` em `<link canonical>`,
   Open Graph, `robots.txt`, `sitemap.xml` e no JSON-LD. Ajustar para o domínio
   real e adicionar `CNAME` na raiz se houver domínio customizado.
2. **Cardápios** — já ligados a `assets/cardapios/`. Se o cliente mandar versões
   novas, substituir mantendo os mesmos nomes de arquivo.
3. **Foto do espaço kids** — é o único placeholder que restou (card em Diferenciais,
   `[espaço para foto profissional do espaço kids]`). Trocar quando houver foto real.
4. **Confirmar na reunião** — horário 16h–00h; a grade de música e as promoções da
   semana (Segunda: Festival do Camarão · Terça: Terça do Caranguejo · Quarta:
   compre 3 Amstel leve 4) vieram dos panfletos de ago/set — confirmar se seguem
   valendo. Faixa de preço (R$ 60–160) também a confirmar.

## Notas

- **Pastas fantasma do Google Drive:** se aparecerem `_lg/`, `_tmp/` ou
  `assets/img/favicon-antigo/` com "acesso negado", são restos de sincronização do
  Drive. Já estão no `.gitignore`. Somem sozinhas quando o Drive termina de
  sincronizar (ou reiniciando o Google Drive / o PC).
- Sem scripts de rastreamento. O mapa é um card estático com links "Como chegar" /
  "Ver no Google Maps" (sem iframe, sem cookie de terceiros).

## Rodar localmente

```
npx serve .
```

(abrir o `index.html` por `file://` funciona, mas as fontes carregam melhor via `http://`.)

## Deploy

`git push origin main` → GitHub Pages publica em 1–3 minutos (repositório privado).
