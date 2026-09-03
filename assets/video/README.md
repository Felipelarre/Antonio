# Vídeo de fundo do hero

| Arquivo           | Formato          | Uso                                        |
| ----------------- | ---------------- | ------------------------------------------ |
| `hero-video.webm` | VP9, sem áudio   | Chrome / Firefox / Edge                    |
| `hero-video.mp4`  | H.264, sem áudio | Safari / iOS e fallback universal          |

Se nenhum dos dois existir, o hero volta sozinho para a foto
`assets/fotos/espetinhos-na-chapa.jpg`, sem erro no console.

## Onde o vídeo aparece

- **Desktop (≥ 901px):** layout split — texto à esquerda sobre fundo escuro,
  vídeo num painel à direita (~56% da largura), com a borda esquerda esfumada.
- **Tablet / celular (< 901px):** o vídeo **não é carregado** (economia de dados
  no mobile). O hero é a foto de fundo, igual ao resto do site.
- **`prefers-reduced-motion`:** idem — só a foto, sem vídeo.

O `main.js` só anexa as fontes e dá play depois de confirmar, por `fetch`, que
o arquivo existe e que a tela é ≥ 901px.

## Estado atual dos arquivos

Origem: `video.mp4` do Canva (768×768, ~1,3 MB). Pipeline aplicado:

1. Reescala para 1080×1080 (lanczos) + correção de cor leve
   (`eq=contrast=1.08:saturation=1.18:gamma=0.96` + `unsharp`).
2. **Crop para 812×1080 (retrato 3:4)**, centralizado — o painel do split é
   estreito e vertical; cropar a origem evita o CSS cortar o prato no meio.
3. H.264 CRF 20 (`+faststart`) e VP9 CRF 31, ambos sem faixa de áudio.

Resultado: MP4 ~2,3 MB · WebM ~1,8 MB.

**Limite de qualidade:** a origem do Canva tem 768 px de lado. Dá para
reescalar e dar tapa de cor, mas **não** dá para gerar 4K real — ampliar além
disso só incha o arquivo sem ganhar nitidez. Para um hero mais nítido/vivo,
reexporte do Canva na maior resolução possível; se puder, já em retrato
(ex.: 1080×1440) para o painel do split não precisar de crop.

## Regerar a partir de um novo export do Canva

Coloque o arquivo novo aqui como `video.mp4` e rode, dentro da pasta:

```
FF=ffmpeg
# ajuste o crop conforme a proporção do novo arquivo; alvo ~3:4 (retrato)
GRADE="scale=1080:-2:flags=lanczos,eq=contrast=1.08:saturation=1.18:gamma=0.96,unsharp=3:3:0.5,crop=812:1080"

"$FF" -y -i video.mp4 -an -vf "$GRADE,format=yuv420p" -c:v libx264 -profile:v high \
  -crf 20 -preset slow -movflags +faststart hero-video.mp4

"$FF" -y -i video.mp4 -an -vf "$GRADE" -c:v libvpx-vp9 -b:v 0 -crf 31 -pass 1 \
  -passlogfile vp9log -row-mt 1 -cpu-used 4 -f null /dev/null
"$FF" -y -i video.mp4 -an -vf "$GRADE" -c:v libvpx-vp9 -b:v 0 -crf 31 -pass 2 \
  -passlogfile vp9log -row-mt 1 -cpu-used 1 hero-video.webm
rm -f vp9log-*.log
```

`saturation`/`contrast` = mais ou menos "cor viva". `-crf` maior = arquivo
menor. Alvo de peso: 2–4 MB por arquivo. Sempre sem áudio e com `+faststart`
no MP4 (senão o vídeo só começa depois de baixar inteiro).
