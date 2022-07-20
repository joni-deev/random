var direcciones = new Array("https://everywhere.rf.gd/cumple", 
"https://everywhere.rf.gd/tela")
    function enlaceAleatorio(){
       aleat = Math.random() * direcciones.length
       aleat = Math.floor(aleat)
       location.href=direcciones[aleat]
    }
