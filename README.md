# Bonatto Pneus

Site institucional da Bonatto Pneus, empresa de Caxias do Sul com 40 anos de
experiência em pneus, rodas e serviços automotivos.

## Tecnologias

- React 19
- Vite
- CSS responsivo com animações e suporte a `prefers-reduced-motion`
- Cloudflare Workers Static Assets com cabeçalhos de segurança

## Executar localmente

```bash
npm ci
npm run dev
```

## Verificar antes de publicar

```bash
npm run security:check
npm run check
```

O projeto utiliza lockfile, auditoria automática de dependências, política de
segurança de conteúdo e testes em cada atualização da branch principal.

## Publicação

O build de produção é gerado em `dist/` e publicado como arquivos estáticos no
Cloudflare Workers. O arquivo `public/_headers` mantém as políticas de segurança
aplicadas às páginas e aos arquivos estáticos, enquanto `wrangler.jsonc`
configura a página 404 com o status HTTP correto.
