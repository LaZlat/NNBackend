## 1b linkai ---

Get -> http://localhost:3000/ Grazins visus irasus is DB kaip JSON

Get -> http://localhost:3000/NN/?met=1&nn=1&id=7 Skaicuoja. met - naudojama metrica (1 arba 2), nn - kaimynu skaicius, id - elemento id kuriam atliekami skaiciavimai. Grazina JSON su elemento visa info + nurodyta klase 0, 1 arba tuscia, jei neaisku.

Post -> http://localhost:3000/insert/?cl=0&id=7 Iraso i DB.Nurodyti cl tai kokia klase dabar to objekto (1 ar 0, nezinoma nerodyti, nes sake tiesiog palikti mygtuka neaktyvu jei nezinoma klase) ir id kokiam keisti klase. 200 OK grazina

Put -> http://localhost:3000/reset Nuresetina 7 ir 8 elementu klases i null.
    
SVARBU!!! reikia susikurti db.js faila pagal pateikta sablona.

## 1a Linkai ---

Get -> http://localhost:3000/NN/1a/?met=2&nn=2&id=5&sp=2 - viskas tas pats tik turim sp(sportas) = 1 - soccer, 2- basketball.

Get -> http://localhost:3000/1a - duoda visus csv duomenis.

Get -> http://localhost:3000/NN/validate - grazina formules tiksluma su pradniais duomenimis

Get -> http://localhost:3000/NN/1a/new/?met=2&nn=3&sp=2&h=1.85&w=60 - viskas tas pats tik turim sp(sportas) = 1 - soccer, 2- basketball. nn - kaimynai, h - ugis, w -svoris


PALEISTI SERVERI PER server.js
