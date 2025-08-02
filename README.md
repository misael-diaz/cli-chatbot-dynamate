# cli-chatbot-dynamate

At the present moment this is a work in progress that has basic command-line interface
to with chat with an LLM and execute at least one molecular dynamics tool from the
DynaMate [DynaMate](https://github.com/omendibleba/DynaMate) project.

## Prerequisites

Install ollama and have a running instance. You will need to at least pull a model
in order to use this application. I shall add more info on this later to help you
get started if you are new.

## Docker

So if you entirely new to this (meaning Linux, programming, JavaScript, AI, etc.)
brace yourself but I commend you for exploring this exciting world! I cannot possibly
teach you everything that you need to know but will try to provide some info that
might help you get started.

If you are using a debian based Linux distribution (like Ubuntu or Linux Mint) open up
a terminal and install docker by following these steps:

First find out your username, you can do that with the following command

```sh
whoami
```

you will need it soon enought so bear that in mind.


```sh
sudo su
```

this will ask for your user password and grant you system administration control over
your machine so be careful.

```sh
apt update
```

to get the most recent package information

```sh
apt install docker
```

to install `docker` which will eventually contain your local instance of `ollama` 

```sh
groupadd docker
```

to add the `docker` group to your system (only users in this group are allowed to
run applications shipped with docker)

```sh
usermod -aG docker $USER
```

and add your user to the `docker` group, bear in mind that you want to replace `$USER`
with your username, if you don't then you will be adding the `root` user which already
has permissions to use docker. You already know the username when you executed the
`whoami` command.

an example of the command string would be

```sh
usermod -aG docker myusername
```

where `myusername` should be replaced with your actual username

if you want to verify if it worked simply use this other command:

```sh
id -a myusername
```

and this should show the user id and the ids of the groups that the user belongs to.

## Ollama

In this section I will show you how you can install ollama with docker.

To run an ollama instance execute the following command:

```sh
docker container run --rm -it -v ollama:/root/.ollama -p 11434:11434 --network host --name Ollama ollama/ollama:latest
```

this will have the ollama instance running on the foreground, have a bind-mount of the
`ollama` directory, exposes the service port `11434`, and use the network of the host
machine for communication with client apps like this one, among other things.

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
