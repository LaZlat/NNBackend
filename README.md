#3TASK
Get -> http://localhost:3000/ Grazins visus irasus nuskaicius is failo
Get -> http://localhost:3000/NN/ grazina objektus kurie buvo be klases su jau priskirta klase. PASKUTINIS IRASAS BUNA VECTORIUS KURI GAL ATVAIZDUOTI KAIP TIESE GRAFIKE T.Y. FUNKCIAJ PAGAL KURIA APSKAICIUOJAMA. PVZ jei ateina paskutinis x:2 y:0 ir free:9 , tai atvaizduoti kaip 2x + 0y - 9

#-----

Requests examples:

Get -> http://localhost:3000/ Grazins visus irasus is DB kaip JSON

Get -> http://localhost:3000/NN/?met=1&nn=1&id=7 Skaicuoja. met - naudojama metrica (1 arba 2), nn - kaimynu skaicius, id - elemento id kuriam atliekami skaiciavimai. Grazina JSON su elemento visa info + nurodyta klase 0, 1 arba tuscia, jei neaisku.

Post -> http://localhost:3000/insert/?cl=0&id=7 Iraso i DB.Nurodyti cl tai kokia klase dabar to objekto (1 ar 0, nezinoma nerodyti, nes sake tiesiog palikti mygtuka neaktyvu jei nezinoma klase) ir id kokiam keisti klase. 200 OK grazina

Put -> http://localhost:3000/reset Nuresetina 7 ir 8 elementu klases i null.
    
SVARBU!!! reikia susikurti db.js faila pagal pateikta sablona.

PALEISTI SERVERI PER server.js
