from pymongo import MongoClient
from datetime import datetime

# Configurar a conexão com o MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['projetoRPCW']
collection = db['gerals']

# Recuperar todos os documentos da coleção
documents = collection.find()

for document in documents:
    # Recuperar o valor atual do campo de data (formato: dd/mm/aaaa)
    current_date = document['Data']

    date_formats = ['%d/%m/%Y', '%m/%d/%Y', '%Y-%m-%d']

    new_date = None

    # Tentar converter a data para o novo formato (aaaa/mm/dd)
    for date_format in date_formats:
        try:
            new_date = datetime.strptime(current_date, date_format).strftime('%Y/%m/%d')
            break
        except ValueError:
            pass

    # Atualizar o campo de data no documento
    collection.update_one({'_id': document['_id']}, {'$set': {'Data': new_date}})

# Fechar a conexão com o MongoDB
client.close()
