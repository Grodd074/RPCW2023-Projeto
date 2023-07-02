import sys
import re
import json
from collections import Counter

original_stdout = sys.stdout


def pretty_print(nome, counter_atributos):

    with open(f"Analises/{nome}.txt", "w") as f:
        sys.stdout = f

        print(f"------------------- {nome} -------------------")
        print("METADATA")
        # Nº de campos
        print("\tNº de campos : ", len(counter_atributos))
        # Nº de acórdãos (Processo é um campo obrigatório)
        print("\tNº de acórdãos : ", counter_atributos["url"])
        
        print("OCORRÊNCIAS")
        # Contagem de ocorrências dos campos
        for key, value in counter_atributos.items():
            print("\t" + key + " : " + str(value))


tribunalPaths = [#"../Acordaos/atco1s.json",
                 #"../Acordaos/jcons.json", 
                 #"../Acordaos/jdgpjs.json",
                 #"../Acordaos/jstas.json",
                 "../Acordaos/jstjs.json"]#,
                 #"../Acordaos/jtcas.json",
                 #"../Acordaos/jtcampcas.json", 
                 #"../Acordaos/jtcampcts.json",
                 #"../Acordaos/jtcns.json", 
                 #"../Acordaos/jtrcs.json",
                 #"../Acordaos/jtres.json", 
                 #"../Acordaos/jtrgs.json",
                 #"../Acordaos/jtrls.json", 
                 #"../Acordaos/jtrps.json"]




total = Counter()

# Para cada tribunal
for tribunal in tribunalPaths:

    sigla = tribunal.split("/")[-1].split(".")[0]
    
    with open(tribunal, "r") as f:
        
        lista_acordaos = json.load(f)
    
        for acordao in lista_acordaos:
            total.update(Counter(acordao.keys()))

            pretty_print(sigla, total)



    

    