Requests examples:

Get -> http://localhost:3000/ Grazins visus irasus is DB kaip JSON

Get -> http://localhost:3000/NN/?neighbours=1&id=8 Nurodyt neighbours tai keliems kaimynams ir id tai kuriam elementui skaiciuoti. Grazina JSON su elemento visa info + nurodyta klase 0, 1 arba tuscia, jei neaisku.

Post -> http://localhost:3000/insert/?cl=0&id=7 Nurodyti cl tai kokia klase dabar to objekto (1 ar 0, nezinoma nerodyti, nes sake tiesiog palikti mygtuka neaktyvu jei nezinoma klase) ir id kokiam keisti klase. 200 OK grazina
    
 
