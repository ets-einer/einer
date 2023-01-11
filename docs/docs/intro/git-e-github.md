---
title: Git e Github
sidebar_position: 2
---

## Tutoriais básicos de Git e Github:

- https://www.youtube.com/watch?v=hwP7WQkmECE
- https://www.youtube.com/watch?v=8lGpZkjnkt4

## Git flow e convenções

Através do git flow, podemos coordenar múltiplos esforços paralelamente através do recurso de commits e ramificações (branches) do git.

### Commits

Cada commit é como se fosse um snapshot do código, ele é utilizado para trackear mudanças significativas feitas no código.

Por exemplo, suponhamos que o um desenvolvedor iniciante chamado João Doe esteja na empresa CodeMiner52 trabalhando em uma nova feature, a estilização e funcionalidade da página de Login.

Conforme João esteja trabalhando nessa feature, é interessante que ele "salve" as alterações durante o desenvolvimento que funcionam no código dele.

Exemplo, João começa a adicionar os elementos HTML como o `<input />` e o  `<form><form>`, quando ele ver que os elementos HTML estão funcionando bem, ele pode dar um commit na forma:

```bash
$ git commit -m "add: html form for login page"
```

Logo depois, João Doe começa a trabalhar na estilização, após finalizar o seu css, ele pode commitar novamente:

```bash
$ git commit -m "add: styling for html form in login page"
```

No final do dia, o João Doe terminou seu trabalho, que era finalizar a página de Login, assim, ele pode criar uma nova pull request para ter seu trabalho fundido (merged) na ramificação (branch) de desenvolvimento principal da empresa =).

OBS: Emojis não são necessários para os as mensagens do commit.

### Ramificações (Branches)

![Git flow image representantion](https://lh3.googleusercontent.com/70jaEZnESXQ6SssU5uI4yO62JBz6xq2sNrrz8bW_ap2CuWUaQlbKs3j6NyRJnvcvYwAugkW8WzNJX21dZ2SMd9O_1TTpKZT-FsBkYSPy4rUSpJSo2C-WPTaLc2jQ8ancyj1TetXQ)

No git flow, temos as principais branchs que são:

- **Main**: branch de produção, contém código que está sendo executado em produção.
- **Hotfix**: branch para consertos rápidos dos erros presentes na Main
- **Release**: branch para versionamento do produto/serviço que está sendo desenvolvido, e que segue o padrão [semver](https://semver.org/lang/pt-BR/).
- **Develop**: branch principal para incrementar features ao produto/serviço, que após ser estabilizado, é fundida com a branch Release.
- **Features**: branch de desenvolvimento de novas features, para cada nova feature, uma nova branch desse tipo é criada.

Para nomear cada branch do tipo **Feature**, seguimos a convenção:

```bash
<tipo-da-branch>-<autor>-<feature_a_ser_desenvolvida>

# Exemplo

- dev-abehidek-mudar_cor_do_botão
- dev-vitormiura-criar_home_page
```

## Vários autores em um commit

Para commitar com vários autores, basta colocar o seguinte texto logo abaixo da mensagem de commit

```
Fix: typo

In this commit I fixed a typo in the documentation.

Co-authored-by: AUTHOR-NAME <ANOTHER-NAME@EXAMPLE.COM>
```


