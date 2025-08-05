# cli-chatbot-dynamate

This repository hosts the code that I have written so far on
[DynaMate](https://github.com/omendibleba/DynaMate), a chatbot
for assisting scientific researchers in the field of molecular dynamics.

My version of the dynamate chatbot has always been about interacting through a tiny
command-line based client application with an LLM hosted in a high-performance server.
The original dynamate project assumes that you will be running the molecular dynamic
tools locally and that the LLM is a GPT OpenAI model. My point is that both the LLM
and the molecular dynamics tools should be hosted in a high performance cluster and that
the LLM should "know" how to submit jobs to cluster resource manager (usually SLURM)
so that all computing goes through the same management system for efficient computing
usage.

My position is that if we already
have high-performance computing clusters we can avail ourselves of the computing
resources that we have to power our own tools. If OpenAI goes down, which is not uncommon,
our stack for conducting research should not be affected, period. For personal use the
original dynamate project might be sufficient but not for real computing in my opinion.

Another thing is that I do not think that it is so useful to expect to interact with
an LLM on real time (as with other chabots) because molecular dynamics tools are by
virtue computationally intensive so it won't make too much sense for instance to wait for
a large-scale LAMMPS simulation to complete. This is not how computational researchers do
their work. However this chatbot could help new reseachers stay on top of their work if
it can help them stay organized (for instance by informing what simulations have
completed and informing what data is ready for post-processing). I would argue that
new researchers should not rely on LLM powered tools but instead learn the craft so that
they can write their own scripts to automate their workflows, takes longer but pays off
in the long run.

At the present moment this is a work in progress that has basic command-line interface
to with chat with an LLM and execute at least one molecular dynamics tool from the
dynamate project. I am going to be upfront about stating here that I do not intend to
build the whole thing on my own and work on this for an indefinite amount of time.
It's possible that I might work on this for a while and then move on to the next thing.

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
