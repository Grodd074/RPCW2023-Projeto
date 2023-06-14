import sys
import re
import json
from collections import Counter

original_stdout = sys.stdout


def pretty_print(nome, counter_atributos):

    with open(f"{nome}/{nome}.txt", "w") as f:
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


tribunalPaths = [#"ATCO1/atco1_acordaos.json",
                 #"JCON/jcon_acordaos.json", 
                 #"JDGPJ/jdgpj_acordaos.json"],
                 #"JSTA/jsta_acordaos.json"],
                 "JSTJ/jstj_acordaos.json"]#,
                 #"JTCA/jtca_acordaos.json"],
                 #"JTCAMPCA/jtcampca_acordaos.json"], 
                 #"JTCAMPCT/jtcampct_acordaos.json"],
                 #"JTCN/jtcn_acordaos.json"], 
                 #"JTRC/jtrc_acordaos.json"],
                 #"JTRE/jtre_acordaos.json"], 
                 #"JTRG/jtrg_acordaos.json"],
                 #"JTRL/jtrl_acordaos.json"], 
                 #"JTRP/jtrp_acordaos.json"]




total = Counter()

# Para cada tribunal
for tribunal in tribunalPaths:

    sigla = tribunal.split("/")[0]
    
    with open(tribunal, "r") as f:
        
        lista_acordaos = json.load(f)
    
        for acordao in lista_acordaos:
            total.update(Counter(acordao.keys()))

            pretty_print(sigla, total)



    

    