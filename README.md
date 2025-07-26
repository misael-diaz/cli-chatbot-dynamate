# cli-chatbot-dynamate
my version of the dynamate chatbot, the original can be found
[here](https://github.com/omendibleba/DynaMate)

at the present moment this is a work in progress and there's nothing interesting here
yet

## Prerequisites

Install ollama and have a running instance. You will need to at least pull a model
in order to use this application. I shall add more info on this later to help you
get started if you are new.

## Configuration

We use a `.env` file to configure the cli-chatbot application, in which you are expected
to set the HOST, PORT, and MODEL:

```make
HOST="127.0.0.1"
PORT=8080
MODEL="gemma:2b"
```

these are just examples though we recommend that you setup a SSH tunnel for interacting
with the LLM if you are not hosting ollama locally. I might add info on setting this up
later, it might be useful to someone out there.

## Start

To start the cli-chatbot application simply open a terminal and execute the following
command:

```sh
node index.js
```

this will show a prompt in your terminal.

## Tools

As of now we have just one built-in tool that allows the user to know what models are
available:

```sh
models
```

Bear in mind that you must execute this while running the application.
