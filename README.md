# Paiva Acessórios — Site institucional

Site de uma página (landing page) para a Paiva Acessórios, loja de acessórios para smartphone (capas, cabos, fones e películas), construído a partir do perfil `@paivaacessorios2026`.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura e conteúdo de todas as seções do site |
| `styles.css` | Todo o visual: cores, tipografia, layout e animações |
| `script.js` | Comportamento: menu mobile, botão "voltar ao topo", ano no rodapé |
| `README.md` | Este arquivo |

Não há dependências de build — é só abrir o `index.html` em um navegador. As três fontes (Syne, Manrope, JetBrains Mono) são carregadas do Google Fonts via `<link>` no `<head>`.

## Como visualizar

Duas opções:

1. **Direto:** dê duplo clique no `index.html` — ele abre no navegador.
2. **Servidor local** (recomendado, evita bloqueios de alguns navegadores com `file://`):
   ```bash
   cd paiva-site
   python3 -m http.server 8000
   ```
   Depois acesse `http://localhost:8000`.

## Identidade visual (por que essas escolhas)

- **Cores:** fundo quase preto (`#0a0a0d`) com um gradiente de três cores — laranja `#ff8a3d`, rosa `#ff3d8b`, roxo `#7b4dff` — reproduzindo o anel gradiente que já existe na foto de perfil do Instagram. Um azul-gelo (`#8fe3ff`) marca os detalhes técnicos (rótulos, links, o símbolo ◆ de diamante), puxando o emoji 💎 usado na bio ("Qualidade premium em cada detalhe").
- **Tipografia:** `Syne` nos títulos (geométrica, com peso — remete a uma marca de tecnologia), `Manrope` no texto corrido (limpa, legível) e `JetBrains Mono` em números e rótulos (contato, estatísticas, tags de produto) — reforça o lado "técnico" de uma loja de acessórios para celular.
- **Elemento de assinatura:** o anel giratório atrás do mock-up de celular no topo do site (`.orbit-ring`) é o mesmo anel gradiente da foto de perfil, "esticado" para virar o elemento central da página.
- **Ticker (faixa rolante):** reaproveita a frase da bio do Instagram ("Qualidade premium em cada detalhe") como uma faixa animada — um recurso comum em vitrines de loja física, adaptado para a web.

## Seções do site

1. **Hero** — nome, proposta e números do perfil (seguidores, posts, visualizações).
2. **Ticker** — faixa animada com a frase da bio.
3. **Sobre** — texto de posicionamento da marca.
4. **Produtos** — 4 categorias (capas, fones, cabos, películas), com ícones ilustrativos.
5. **Diferenciais** — 3 motivos para comprar.
6. **Instagram** — chamada para seguir o perfil.
7. **Contato** — os dois números de WhatsApp já como links `wa.me`.
8. **Rodapé**.

## Personalizar

- **Textos:** edite diretamente as tags `<h1>`, `<h2>`, `<p>` no `index.html`.
- **Números de WhatsApp:** procure por `wa.me/55...` no `index.html` (seção `#contato`) e troque pelo número desejado, no formato `55` + DDD + número, sem espaços ou traços.
- **Link do Instagram:** procure por `instagram.com/` no `index.html`.
- **Cores:** todas ficam no topo do `styles.css`, dentro de `:root { ... }` — mudar ali reflete no site inteiro.
- **Fotos reais dos produtos:** hoje os cards de produto usam ícones desenhados em SVG (para não depender de capturas de tela do Instagram, que trazem a interface do app junto). Para trocar por fotos reais, substitua o bloco `<div class="product-icon">...</div>` de cada card por uma tag `<img src="sua-foto.jpg" alt="...">`.

## Compatibilidade

Layout responsivo (funciona de celular a desktop), com menu hambúrguer abaixo de 720px. Respeita a preferência do sistema por movimento reduzido (`prefers-reduced-motion`), desligando as animações do anel e do ticker para quem ativa essa opção.

