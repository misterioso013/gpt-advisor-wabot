# Bot para Whatsapp GPT Advisor
Esse bot foi desenvolvido para o grupo de estudantes da [codeBuddy](https://codebuddy.com.br/)(Moura BJ) para auxiliar na resolução de dúvidas de programação. Ele utiliza a API do [GPT-3](https://openai.com/blog/openai-api/) para gerar respostas para as perguntas feitas no grupo.

Ele responde perguntas ligadas ao tema principal do grupo, que no caso é o Projeto X.

> Mas ele pode ser adaptado para responder perguntas de outros temas.

## Como funciona?
O bot funciona da seguinte forma:
- Ele fica escutando o grupo e quando alguém envia uma mensagem que começa com `!orientador` ou `!advisor`, ele responde com uma resposta gerada pelo GPT-3.
- Ele pega as últimas 3 mensagens do grupo e as usa como contexto para gerar a resposta.
- Ele tentará formatar a resposta para o markdown do Whatsapp e usará emojis para dar uma cara mais humana para a resposta.
- Ele só irá responder mensagens em grupos, então todos que conhecer os comandos podem usar o bot em outos grupos fora do projeto (fica a dica).

## Requisitos
- [Node.js](https://nodejs.org/en/)
- [Conta no OpenAI](https://platform.openai.com/)
- Conta no Whatsapp

## Conta no OpenAI
A API do GPT-3 é paga, porém a OpenAI oferece um saldo de U$18 para você testar as funcionalidades da API. Você pode usar esse saldo para testar o bot.
### Instalação
Clone o repositório
```bash
git clone https://github.com/misterioso013/gpt-advisor-wabot.git

cd gpt-advisor-wabot
```
Instale as dependências com:
```bash
npm install
```

Crie um arquivo `.env` com a seguinte variável de ambiente:
```bash
OPENAI_API_KEY="sk-...."
```
- Veja o arquivo `.env.example` para mais detalhes
  - Você pode encontrar a sua chave de API no [dashboard do OpenAI](https://platform.openai.com/account/api-keys)
- Rode o bot com `npm run dev`

- Aguarde o QR Code aparecer no terminal
- Escaneie o QR Code com o Whatsapp Web
- Pronto, o bot está rodando

### Produção

Para rodar o bot em produção, você pode usar o [PM2](https://pm2.keymetrics.io/)

Para isso, instale o PM2 globalmente com:
```bash
npm install -g pm2
```
Instale as dependências de produção com:
```bash
npm install --production
```
Crie um arquivo `.env` com as variáveis de ambiente vistas no tópico anterior ou rode o comando (linux):
```bash
touch .env && echo 'OPENAI_API_KEY="sk-...."' > .env
```

Faça o build do projeto com:
```bash
npm run build
```
E rode o bot com:
```bash
pm2 start dist/index.js --name gpt-advisor-wabot
```
Para ver o QR Code do Whatsapp, use:
```bash
pm2 logs gpt-advisor-wabot
```

> Caso esteja usando o Ubuntu você poderá encontrar alguns problemas com o puppeteer. Para resolver isso, siga as instruções [deste link](https://gist.github.com/misterioso013/5e24019e6e5e6f71432d71c4c966b311)

## Contribuindo
Contribuições são sempre bem-vindas! Se você tiver alguma ideia de como melhorar o bot, sinta-se livre para abrir uma issue ou um pull request.