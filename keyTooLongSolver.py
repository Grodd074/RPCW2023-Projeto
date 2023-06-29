from pymongo import MongoClient

# Configuração da conexão com o MongoDB
client = MongoClient('localhost', 27017)
db = client['projetoRPCW']

# Lista de coleções afetadas
colecoes_afetadas = ['jstas', 'jstjs', 'jtcas', 'jtcns', 'jtrls']

# Percorre as coleções afetadas
for colecao in colecoes_afetadas:
    # Obtém a coleção
    collection = db[colecao]

    # Realiza uma consulta para obter os documentos com campos de texto longos
    documentos = collection.find()

    lista_chaves = ["Data do Acordão",
    "Tribunal",
    "Relator",
    "Descritores",
    "Nº do Documento",
    "Data de Entrada",
    "Recorrente",
    "Recorrido 1",
    "Votação",
    "Texto Integral",
    "url",
    "Legislação Nacional",
    "Área Temática 1",
    "Recorrido 2",
    "Nº do Volume",
    "Objecto",
    "Decisão",
    "Área Temática 2",
    "Referência a Doutrina",
    "Referência a Pareceres",
    "Recusa Aplicação",
    "Jurisprudência Estrangeira",
    "1ª Pág. de Publicação do Acordão",
    "Referência Publicação 1",
    "Ano da Publicação",
    "Apêndice",
    "Data do Apêndice",
    "Página",
    "Referência Publicação 2",
    "_id",
    "Processo",
    "Decisão Texto Integral",
    "Data da Decisão Sumária",
    "Doutrina",
    "Área Temática",
    "Data da Decisão Singular",
    "Data da Reclamação",
    "Referência Processo",
    "Processo no Tribunal Recurso",
    "Secção",
    "Parecer Ministério Publico",
    "Meio Processual",
    "Sumário",
    "Legislação Comunitária",
    "Nº Convencional",
    "Referência de Publicação",
    "Privacidade",
    "Jurisprudência Nacional",
    "Indicações Eventuais",
    "Jurisprudência Internacional",
    "Legislação Estrangeira",
    "Referências Internacionais",
    "Tribunal Recurso",
    "Apenso",
    "Data",
    "Recurso",
    "Nº Único do Processo"
    ]
    



    campos_texto_longos = ["Sumário", "Texto Integral", "Decisão Texto Integral", "Parecer Ministério Publico", "Decisão", "Texto Parcial", "Meio Processual", "Execução ordens"]

    # Itera sobre os documentos
    for documento in documentos:
        # Obtém as chaves do documento
        chaves = list(documento.keys())


        # Itera sobre as chaves
        for chave in chaves:
            print(chave)
            # Verifica se o valor da chave é uma string longa
            if isinstance(documento[chave], str) and len(chave) > 33:
                print('Chave: ' + chave)
                #Move o valor para a chave anterior
                indice = chaves.index(chave)
                print('Indice: ' + str(indice))
                chave_anterior = chaves[indice - 1]
                print('Chave anterior: ' + chave_anterior)
                while(chave_anterior not in campos_texto_longos):
                    indice -= 1
                    chave_anterior = chaves[indice - 1]
                print('Chave anterior grande: ' + chave_anterior)
                documento[chave_anterior] += ' ' + documento[chave]
#
                ## Remove a chave atual
                del documento[chave]

            if chave not in lista_chaves:
                del documento[chave]

        # Atualiza o documento no banco de dados
        collection.replace_one({ '_id': documento['_id']},  documento)

# Fechando a conexão com o MongoDB
client.close()
