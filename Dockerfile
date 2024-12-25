FROM ubuntu:latest
LABEL authors="nikitatsarenko"

ENTRYPOINT ["top", "-b"]