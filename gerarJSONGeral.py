#Objetivo: Pegar nos datasets todos e gerar um JSON geral com os dados -> Processo, Data, Tribunal, Descritores(Categorias)

import ijson
import json

camposFinais=['Processo','Data','Tribunal','Descritores']

def extractCampos(listaCampos, ficheiro):
    resultado=[]
    with open(ficheiro, "r") as json_file:
        for entry in ijson.items(json_file,"item"):
            newEntry={}
            for i,campo in enumerate(listaCampos):
                if campo in entry:
                    newEntry[camposFinais[i]]=entry[campo]
                else:
                    newEntry[camposFinais[i]]=None
            resultado.append(newEntry)

    return resultado

# ATCO1
def extractATCO1():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/atco1_acordaos.json')

def extractJCON():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jcon_acordaos.json')

def extractJDGPJ():
    return extractCampos(['Processo','Data da Decisão','tribunal','Descritores'],'Acordaos/jdgpj_acordaos.json')

def extractJSTA():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jsta_acordaos.json')

def extractJSTJ():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jstj_acordaos.json')

def extractJTCA():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jtca_acordaos.json')

def extractJTCAMPCA():
    return extractCampos(['Processo','Data','tribunal','Descritores'],'Acordaos/jtcampca_acordaos.json')

def extractJTCAMPCT():
    return extractCampos(['Processo','Data','tribunal','Descritores'],'Acordaos/jtcampct_acordaos.json')

def extractJTCN():
    return extractCampos(['Processo','Data do Acordão', 'tribunal','Descritores'],'Acordaos/jtcn_acordaos.json')

def extractJTRC():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jtrc_acordaos.json')

def extractJTRE():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jtre_acordaos.json')

def extractJTRG():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jtrg_acordaos.json')

def extractJTRL():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jtrl_acordaos.json')

def extractJTRP():
    return extractCampos(['Processo','Data do Acordão','tribunal','Descritores'],'Acordaos/jtrp_acordaos.json')

if __name__ == "__main__":
    #Store the data efficiently, otherwise the proccess gets killed
    resultado=[]
    resultado+=extractATCO1()
    resultado+=extractJCON()
    resultado+=extractJDGPJ()
    resultado+=extractJSTA()
    resultado+=extractJSTJ()
    resultado+=extractJTCA()
    resultado+=extractJTCAMPCA()
    resultado+=extractJTCAMPCT()
    resultado+=extractJTCN()
    resultado+=extractJTRC()
    resultado+=extractJTRE()
    resultado+=extractJTRG()
    resultado+=extractJTRL()
    resultado+=extractJTRP()

    with open('Acordaos/geral.json', 'w') as ficheiro:
        json.dump(resultado, ficheiro, ensure_ascii=False)