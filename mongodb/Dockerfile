# Use a imagem mongo como base
FROM mongo

# Defina o diretório de trabalho como /tmp
WORKDIR /tmp

# Copie os jsons para o diretório de trabalho
COPY Acordaos/ .

# Pasta onde o docker irá procurar os scripts para executar
WORKDIR /docker-entrypoint-initdb.d

# Script de inicialização do MongoDB
COPY setupMongoDB.sh .
