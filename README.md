# Code Editor & Comunidade

## Visão Geral

Este projeto é um editor de código online com integração a uma comunidade, onde usuários podem criar, salvar e compartilhar projetos de código com destaque de sintaxe (highlight.js). O sistema permite alternar entre o editor e a visualização de projetos da comunidade, além de personalizar o tema do editor.

---

## Estrutura do Projeto

```
challenge1/
│
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── comment.png
│   ├── icon_code.png
│   ├── icon_users.png
│   ├── like.png
│   ├── Logo.png
│   └── perfil.jpg
└── js/
    └── script.js
```

---

## Funcionalidades

- **Editor de Código:**  
  Permite escrever código em JavaScript, HTML ou CSS, com opção de visualizar o destaque de sintaxe.

- **Personalização:**  
  O usuário pode alterar a cor de fundo do editor para diferentes temas.

- **Salvar Projeto:**  
  Os projetos são salvos no `localStorage` do navegador, incluindo nome, descrição, linguagem e cor escolhida.

- **Comunidade:**  
  Visualize todos os projetos salvos, com informações do autor, nome, descrição e código com highlight.

- **Edição:**  
  Clique em um projeto da comunidade para editá-lo no editor.

---

## Como Usar

1. **Abra o arquivo `index.html` em seu navegador.**
2. **No editor, escreva seu código, escolha a linguagem e personalize o tema.**
3. **Clique em "Visualizar com o highlight" para ver o código com destaque de sintaxe.**
4. **Preencha o nome e a descrição do projeto e clique em "Salvar projeto".**
5. **Acesse a aba "Comunidade" para ver todos os projetos salvos.**
6. **Clique em um projeto da comunidade para editá-lo novamente no editor.**

---

## Tecnologias Utilizadas

- HTML, CSS, JavaScript
- [highlight.js](https://highlightjs.org/) para destaque de sintaxe

---

## Observações

- Todos os dados são salvos localmente no navegador (não há backend).
- As imagens dos ícones e perfis estão na pasta `images/`.
- O nome do autor pode ser alterado diretamente no HTML, no elemento `<span id="author">`.

---

## Créditos

Desenvolvido como parte de um desafio da Alura.

---

## Extras

- O gerenciamento de tarefas e funcionalidades foi realizado utilizando cards no Trello.
- O design da interface foi planejado e prototipado no
