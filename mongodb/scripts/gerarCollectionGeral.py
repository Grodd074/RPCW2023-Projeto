#Objetivo: Pegar nos datasets todos e gerar um JSON geral com os dados -> Processo, Data, Tribunal, Descritores(Categorias)
from pymongo import MongoClient

camposFinais=['Processo','Data','Tribunal','Descritores']

def extractCampos(db, new_collection, lista_campos, collection_name):
    collection= db[collection_name]
    for processo in collection.find():
        dic={}
        for i in range(len(lista_campos)):
            if lista_campos[i] not in processo:
                dic[camposFinais[i]]=""
            else:
                dic[camposFinais[i]]=processo[lista_campos[i]]
        dic['Id']=processo['_id']
        new_collection.insert_one(dic)

# ATCO1
def extractATCO1(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'atco1s')

def extractJCON(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jcons')

def extractJDGPJ(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data da Decisão','tribunal','Descritores'],'jdgpjs')

def extractJSTA(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jstas')

def extractJSTJ(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jstjs')

def extractJTCA(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jtcas')

def extractJTCAMPCA(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data','tribunal','Descritores'],'jtcampcas')

def extractJTCAMPCT(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data','tribunal','Descritores'],'jtcampcts')

def extractJTCN(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão', 'tribunal','Descritores'],'jtcns')

def extractJTRC(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jtrcs')

def extractJTRE(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jtres')

def extractJTRG(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jtrgs')

def extractJTRL(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jtrls')

def extractJTRP(db, new_collection):
    return extractCampos(db, new_collection,['Processo','Data do Acordão','tribunal','Descritores'],'jtrps')

if __name__ == "__main__":
    #Store the data efficiently, otherwise the proccess gets killed
    client = MongoClient('mongodb://localhost:27017/')
    db = client['projetoRPCW']
    new_collection_name="gerals"
    new_collection=db[new_collection_name]


    extractATCO1(db, new_collection)
    extractJCON(db, new_collection)
    extractJDGPJ(db, new_collection)
    extractJSTA(db, new_collection)
    extractJSTJ(db, new_collection)
    extractJTCA(db, new_collection)
    extractJTCAMPCA(db, new_collection)
    extractJTCAMPCT(db, new_collection)
    extractJTCN(db, new_collection)
    extractJTRC(db, new_collection)
    extractJTRE(db, new_collection)
    extractJTRG(db, new_collection)
    extractJTRL(db, new_collection)
    extractJTRP(db, new_collection)