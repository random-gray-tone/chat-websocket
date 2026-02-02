
const http= require("http")
const  {WebSocketServer } = require("ws")
const dotenv = require("dotenv")

//const { jsx } = require("react/jsx-runtime")
dotenv.config()

let roons=[]

    

   const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end("WebSocket server is running")
})
const PORT=process.env.PORT||8080

server.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT)
})
const wss= new WebSocketServer({server})
wss.on("connection",(ws)=>{
    
    
    
    //wss.clients.forEach((client)=>{client.send(JSON.stringify(usuarioentrou))})
    
   
   
    ws.on("error",console.error)
        
            
            
           
           //wss.clients.forEach((client)=>{client.send(JSON.stringify(usuarioentrou))})
        
     
    
 
    ws.on("message",(data)=>{
        
       const datai=JSON.parse(data)
        
        
       

        if(datai.type==="user"){
             let entrou=false
            
            
            for(let i=0;i<roons.length;i++){
                if(roons[i].sala===datai.room){
                   ws.room=datai.room
                   ws.id=datai.id
                    //roons[i].pessoas.push(datai.id)
                    //console.log(ws)
                    entrou=true
                    break
                }
            }
            
               if(!entrou){

               ws.send(JSON.stringify({
                type:"naoencontrado",
                name:datai.name
               }))
               return;
               }
               


                
                   return;
                }
            
                
                
            
                    

                
                
            
        
                
                
        if(datai.type==="login"){
                    
                    ws.name=datai.name
                    ws.room=datai.sala
                    ws.id=datai.id
                    const room=roons.find(r=>r.sala===ws.room)
                    if(!room)return
                    room.pessoas.push(ws.id)
                    room.online=room.pessoas.length
                    wss.clients.forEach( (client)=>{
                        if(client.room===ws.room){
                            
                            
                            client.send(JSON.stringify({

                    type:"login",
                    name:datai.name
                            
                }))
            }
                wss.clients.forEach((client)=>{
               if(client.room===ws.room){
                            
                            client.send(JSON.stringify({
                                type:'online',
                                total:room.online
                            }))
                
            }

        })
                

    })

            return;
                }
            
            
       
        
       //usuarioentrou.name=datai.userName
       

        

       
        
      
       
       //console.log(JSON.parse(data))
       //console.log(data)
     
        
            if(datai.type==="room"){
                let salaexiste=false
                
                for(let i =0;i<roons.length;i++){
                    
                    if(roons[i].sala===datai.codigo){
                        console.log('Sala ja existe')
                            salaexiste=true
                            ws.send(JSON.stringify({
                            type:"Salaexiste",
                            senha:datai.codigo
                       
                        
                        }))
                        break
                    }
                    console.log(roons)
                        

                }
                if(salaexiste){
                    return
                }
                ws.name=datai.name
                ws.room=datai.codigo
                ws.id=datai.id
                
                
            roons.push({

                sala:datai.codigo,
                pessoas:[datai.id],
                online:1
            })
            console.log(roons)
            
             wss.clients.forEach((client)=>{
               if(client.room===ws.room){
                            
                            client.send(JSON.stringify({
                                type:'online',
                                total:1
                            }))
                
            }
                    
                    
                
                
                
            })
            //console.log(datai)
            return;
        }
        if(datai.type==='image'){
            
            wss.clients.forEach((client)=>{
                if(client.room===ws.room){
                    client.send(JSON.stringify(datai))
                }
            })
            console.log(datai)
            return
        }
        if(datai.type==='video'){
            wss.clients.forEach((client)=>{
                if(client.room===ws.room){
                    console.log(datai)
                    client.send(JSON.stringify(datai))
                }
            })
        }
        const eventosdesala=["message","digitando","notdigitando"]
        if(eventosdesala.includes(datai.type)){
            console.log(datai)
             wss.clients.forEach((client)=>{

        if(client.room===ws.room){
        client.send(data.toString())
       }

       })

        }
        return;


    })


    ws.on('close',()=>{
        
        const room=roons.find(r=>r.sala===ws.room)
        if(!room) return
        room.pessoas=room.pessoas.filter(id=>id!==ws.id)
        room.online=room.pessoas.length
    
        console.log(`${ws.name} => client disconnnected`)
        
        wss.clients.forEach((client)=>{
            if(client.room===ws.room){
                client.send(JSON.stringify({
                    type:'online',
                    total:room.online
                }))
            }
        })

            
        
                 //client.send(JSON.stringify({type:"disconnected",name:ws.name}))

            
                
                for(let i =0;i<roons.length;i++){
            if(roons[i].pessoas.length===0){
                roons= roons.filter((room)=>{
                    return room.pessoas.length>0
                })
            }
        }
            wss.clients.forEach((client)=>{
                if(client.room===ws.room){
                    client.send(JSON.stringify({
                        type:"disconnected",
                        name: ws.name
                    }))
                }
            })
           
        
        
    })
    console.log("client connected")
    

    
})
