//const { send } = require("node:process")












//const { use } = require("react");

//const { json } = require("node:stream/consumers")

//login elements

const login=document.querySelector("#login")
const loginform=login.querySelector('.login__form')
const logininput=login.querySelector('.Login__input')
const logincodigoroom=login.querySelector('#codigoroom')
const logincriarRoom=login.querySelector('.criarRoom')
const fecharcriarRoom=document.querySelector('#fecharcriarRoom')
const enviarfoto=document.querySelector('#enviarfoto')
const menuescolherfoto=document.querySelector('#sendimage')
const enviarfotoprevia=menuescolherfoto.querySelector('div')
const fecharmenuescolherfoto=menuescolherfoto.querySelector('span')
const enviarfotoinput=menuescolherfoto.querySelector('input')
const enviarfotobutton=menuescolherfoto.querySelector('button')
const criar=document.querySelector('#criar')
const criarform=criar.querySelector('.login__form')
const criarinput=criar.querySelector('.criar__input')
const codigodasala=criar.querySelector('#codigo')
const emotescontainer=document.querySelector('#emotescontainer')
const emotesescolher=document.querySelector('#emotesescolher')
const fecharselecaoemotes=emotescontainer.querySelector('span')
const emotes=document.querySelectorAll('.emotes')

//barra de informação elements
const onlinediv=document.querySelector('.online')
const usuario=document.querySelector('#user')

const dropdownup=usuario.querySelector('span')
const optionsdiv=document.querySelector('.options')

const containeroptions=document.querySelector('#containeroptions')

const mudarfotoOpcao=document.querySelector('#mudarfoto')
const mudarnomeOpcao=document.querySelector('#mudarnome')
const mudarnome=document.querySelector('#alterarnome')
const fecharmudarnome=mudarnome.querySelector('span')
const mudarnomeinput=mudarnome.querySelector('input')
const mudarnomeconfirm=mudarnome.querySelector('div')
const mudarfoto=document.querySelector('.Foto')
const sairdasalaopcao=document.querySelector('#sairdasala')
const autopreencherfoto=document.querySelector('#foto')
let enviar=""
let fotoperfil=''
let estadigitando=false;
let typingtimeout
let logar=true
const selecionarfototeste=document.querySelector('.selecionarfoto')
const fecharselecaodefoto=document.querySelector('#fecharselecaodefoto')
const fotoinputfile=document.querySelector('#Fotoperfil')
const confirmarfotoperfil=document.querySelector('.confirmar')
const fotoampliadacontainer=document.querySelector('.zoomfotoperfil')
let podedigitar=true
const fotoampliada=document.querySelector('#fotoampliada')
const fecharfotoampliada=document.querySelector('#fecharfotoampliada')
const h2fotoampliada=fotoampliadacontainer.querySelector('h2')
//let selecionouclicar=false;

const room={
    type:"room",
    name:"",
    id:"",
    color:"",
    codigo:""
}
 
 const usuarioentrou={
    type:"login",
    name:"",
    id:"",
    sala:""
}

const usuariopreparando={
    type:"digitando",
    name:"",
    cor:"",
    id:""
}  
const usuarioparou={
    type:"notdigitando",
    name:""

}
const chat=document.querySelector(".chat")
const chatform=chat.querySelector('.chat__form')
const chatinput=chat.querySelector('.chat__input')
const  chatmessages=document.querySelector('.chat__messages')
const preparando=document.querySelector('.digitando')

    const colors=[
        "cadetblue",
        "darkgoldenrod",
        "cornflowerblue",
        "darkkhaki",
        "hotpink",
        "gold"




    ]
    
     const user={ type:"user",id:"",name:"", color:"",room:"",image:""}

    const image={
    type:"image",
    userId:user.id,
    room:user.room,
    name:user.name,
    image:"",
    color:user.color
}

    let websocket;
    
    
    function digitandoagora(pessoa,cor){
        preparando.style.display='flex'
        preparando.innerHTML=pessoa+' esta digitando...'
        preparando.style.width='auto'
        preparando.style.color=cor
        
    }
    function paroudigitar(){
        preparando.style.display='none'
        
    }

    function createsistemmensage(dado,texto){
        const sistema=document.createElement('div')
        sistema.classList.add('sistema')
        sistema.innerHTML=`${dado} ${texto}`
        chatmessages.appendChild(sistema)
    }

    function createMessageSelf(content,yourcolor){

        const div=document.createElement('div')
        const voce=document.createElement('span')
        div.classList.add('message--self')
        voce.classList.add('message--sender')
        div.appendChild(voce)
        
        voce.innerText='Você:'
        div.innerHTML+=content
        return div;
    }

    function createMessageother(content,sender,senderColor,senderImage){
        const dadoscontainer=document.createElement('div')
        dadoscontainer.classList.add('containerdados') 
        let div=document.createElement('div')
        const perfilimage=document.createElement('div')
        const span=document.createElement('span')
        div.classList.add('message--other')
        perfilimage.classList.add('message--fotoperfil')
        span.classList.add('message--sender')
        dadoscontainer.appendChild(perfilimage)
        dadoscontainer.appendChild(span)
        perfilimage.innerHTML=sender[0].toUpperCase()
        if(senderImage!==""){
            perfilimage.innerHTML=''
             perfilimage.style.backgroundImage=`url(${senderImage})`
        perfilimage.style.backgroundSize='cover'
        perfilimage.style.backgroundPosition='center'
        }
        
        div.appendChild(dadoscontainer)
        span.innerHTML=sender
        span.style.color=senderColor
        div.innerHTML+=content
        div.addEventListener('click',()=>{
            const imagemperfilmessage=document.querySelector('.zoomfotoperfilmensagem')
            imagemperfilmessage.style.display='flex'
            const imagemessage=imagemperfilmessage.querySelector('div')
            if(!senderImage){
                imagemessage.innerHTML=sender[0].toUpperCase()
                imagemperfilmessage.querySelector('h2').innerHTML=sender
            imagemperfilmessage.querySelector('span').addEventListener('click',()=>{
                imagemperfilmessage.style.display='none'
            })
                return
            }
            imagemessage.innerHTML=''
            imagemessage.style.backgroundImage=`url(${senderImage})`
            imagemessage.style.backgroundPosition='center'
            imagemessage.style.backgroundSize='cover'
            imagemperfilmessage.querySelector('h2').innerHTML=sender
            imagemperfilmessage.querySelector('span').addEventListener('click',()=>{
                imagemperfilmessage.style.display='none'
        })
        
        })
        
        return div;
    }
    function  createselfimage(content){
            const div =document.createElement('div')
            div.classList.add('image--self')
            const voce=document.createElement('span')
            const imagem=document.createElement('div')
            voce.innerHTML='você:'
            voce.classList.add('message--sender')
            imagem.classList.add('mostrarimagens')
            imagem.style.backgroundImage=`url(${content})`
            imagem.style.backgroundSize='cover'
            imagem.style.backgroundPosition='center'
            chatmessages.appendChild(div)
            div.appendChild(voce)
            div.appendChild(imagem)
    }
    function createotherimage(usersender,content,userColor){
        const div =document.createElement('div')
       
        div.classList.add('image--other')
        const sender=document.createElement('span')
        const imagem=document.createElement('div')
        sender.innerHTML=usersender
        sender.style.color=userColor
        imagem.classList.add('mostrarimagens')
        imagem.style.backgroundImage=`url(${content})`
        imagem.style.backgroundSize='cover'
        imagem.style.backgroundPosition='center'
        chatmessages.appendChild(div)
        div.appendChild(sender)
        div.appendChild(imagem)
    }
    function createselfvideo(content){
         const div =document.createElement('div')
            div.classList.add('image--self')
            const voce=document.createElement('span')
            const imagem=document.createElement('div')
            const video=document.createElement('video')
            video.src=content
            video.controls=true
            imagem.appendChild(video)
            video.style.width='100%'
            video.style.height='100%'
            voce.innerHTML='você:'
            imagem.classList.add('mostrarimagens')
            
            chatmessages.appendChild(div)
            div.appendChild(voce)
            div.appendChild(imagem)
    }
    function createothervideo(content,usersender,senderColor){
         const div =document.createElement('div')
            div.classList.add('image--other')
            const sender=document.createElement('span')
            const imagem=document.createElement('div')
            const video=document.createElement('video')
            video.src=content
            video.controls=true
            imagem.appendChild(video)
            video.style.width='100%'
            video.style.height='100%'
            sender.innerHTML=usersender
            sender.style.color=senderColor
            imagem.classList.add('mostrarimagens')
            
            chatmessages.appendChild(div)
            div.appendChild(sender)
            div.appendChild(imagem)
    }
    function atualizaronline(usuariosatuais){
        onlinediv.style.display='flex'
        onlinediv.innerHTML='Online:'+usuariosatuais
        
    }

    const getRandomColor=()=>{
        const randomIndex= Math.floor(Math.random() * colors.length) 
        return colors[randomIndex]
    }
   
    const scrollScreen=()=> {
        chatmessages.scrollTo({
            top:chat.scrollHeight,
            behavior:"smooth"
        })
    }
   
    const processMessage=(event)=>{
        const data=JSON.parse(event.data)
       if(data.type==='video'){
        if(data.userId===user.id){
            createselfvideo(data.image)
            return
        }
        createothervideo(data.image,data.name,data.color)
       }
        if(data.type==='image'){
            if(data.userId===user.id){
                createselfimage(data.image)
                return  
            }
            createotherimage(data.name,data.image,data.color)
            return
        }
        if(data.type==="Salaexiste"){
            alert(`A sala com a identificação ${data.senha} já existe!Por favor,crie uma identifcação exclusiva para sua sala. `)
            location.reload()
        }
        
        if(data.type==='naoencontrado'){
         if(data.name===user.name){
            alert('Sala não existe!')
            location.reload()
            
         }
        return;
        }
        if(data.type==="disconnected"){
            createsistemmensage(data.name,' saiu do chat!')
        }
        if(data.type==='login'&&logar){
            createsistemmensage(data.name,'entrou no chat!')
            
            //sistema.style.display='flex'
            //sistema.innerHTML=data.name +" entrou no chat!"
            console.log(data.name+"entrou na conversa")

        }
        if(data.type==='notdigitando'){
            
            paroudigitar();
            return;
        }
        if(data.type==='digitando'){
            if(data.id===user.id) return
            digitandoagora(data.name,'aqua')
            return;
        }
       if(data.type==='online'&&logar){
        atualizaronline(data.total);
        
        return;
       } 
       if(data.type==='message'){

        const {userId, userName ,userColor , content,image,foto}=data
        console.log(`${userName}:
${content}`)
            
            const message = userId==user.id ? createMessageSelf(content,userColor) : createMessageother(content,userName,userColor,image)
            //alert(mensagemonline)
            
            
                
                
            
                
                chatmessages.appendChild(message)
                scrollScreen()


       }
       

            

    }
   
    
    const handleLogin= (event)=>{
        
        
        event.preventDefault()
        user.name=logininput.value
        user.id=crypto.randomUUID();
        user.color=getRandomColor();
        user.room=logincodigoroom.value
        //selecionarfototeste.innerHTML=user.name[0].toUpperCase()
        containeroptions.style.display='grid'
        login.style.display='none'
        chat.style.display="flex"
        usuarioentrou.name=user.name
        usuarioentrou.id=user.id
        usuarioentrou.sala=user.room
        websocket = new WebSocket("wss://chat-websocket-98oh.onrender.com")
        
        
        //websocket.send(JSON.stringify(usuarioentrou))
        websocket.onmessage=processMessage
        
        websocket.onopen = () =>   {
            websocket.send(JSON.stringify(usuarioentrou))
            websocket.send(JSON.stringify(user))
        }
        selecionarfototeste.innerHTML=user.name[0].toUpperCase()
        autopreencherfoto.innerHTML=user.name[0].toUpperCase()
        h2fotoampliada.innerHTML=user.name
        chatform.style.display='flex'
       
    }

    const handlecriar=(event)=>{
        
        event.preventDefault()
        room.name=criarinput.value
        room.id=crypto.randomUUID();
        room.color=getRandomColor();
        room.codigo=codigodasala.value
        user.name=criarinput.value
        user.color=room.color
        containeroptions.style.display='grid'
        criar.style.display='none'
        chat.style.display='flex'
        websocket = new WebSocket("wss://chat-websocket-98oh.onrender.com")
        websocket.onmessage=processMessage
        websocket.onopen=()=> websocket.send(JSON.stringify(room))
        //usuario.innerText=user.name[0]
        selecionarfototeste.innerHTML=user.name[0].toUpperCase()
        autopreencherfoto.innerHTML=user.name[0].toUpperCase()
                h2fotoampliada.innerHTML=user.name
        chatform.style.display='flex'
    }

    const sendMessage=(event)=>{
        event.preventDefault();
        
        if(websocket.readyState!==WebSocket.OPEN){
            console.warn("Websocket ainda não está aberto")
            return;
        }
        if(!podedigitar){
            return
        }
        notdigitando()
        const message={
            type:"message",
            userId:user.id,
            userName:user.name,
            userColor:user.color,
            content:chatinput.value,
            image:user.image
        }
        chatinput.value=''
        websocket.send(JSON.stringify(message))
        
    }

    const digitando=()=>{
        if(estadigitando===true)return
         estadigitando=true
        usuariopreparando.name=user.name
        usuariopreparando.cor=user.color
        usuariopreparando.id=user.id;
        websocket.send(JSON.stringify(usuariopreparando))
        clearTimeout(typingtimeout)
        typingtimeout=setTimeout(()=>{
            notdigitando()
        },1600)
        //websocket.send(JSON.stringify())
    }
    const notdigitando=()=>{
       // if(estadigitando===false)return;
        estadigitando=false;
        //usuarioparou.name=user.name
        
        websocket.send(JSON.stringify(usuarioparou))

    }
    let imagemallow=true
    let emotesallow=true
    let optionsallow=true 
    let  ampliarfotoallow=true
    function adicionarelementos(){
        podedigitar=false
        
        chatinput.blur()
       optionsdiv.classList.remove('options')
        optionsdiv.classList.add('optionsvisivel')
        
    
            
        
        
        optionsallow=false
       
    }
   
    function optionscriar(){
        
       if(optionsallow===true){
        optionsallow=false
        adicionarelementos()
        dropdownup.innerHTML='arrow_drop_up'
        emotescontainer.style.bottom=`-400px`
    emotescontainer.style.opacity=0
    menuescolherfoto.style.opacity=0
    setTimeout(()=>{
         emotescontainer.style.display=`none`
         menuescolherfoto.style.display=`none`
    },75)
       }
        
    }
    const options=()=>{
        
        optionscriar();
        
    }

//criar.addEventListener('submit',handleLogin
//)
loginform.addEventListener('submit',handleLogin)
chatform.addEventListener('submit',sendMessage)
chatinput.addEventListener('input',digitando)
logincriarRoom.addEventListener('click',()=>{
    
    login.style.display='none'
    criar.style.display='grid'
})
criarform.addEventListener('submit',handlecriar)
//chatinput.addEventListener('blur',notdigitando)
containeroptions.addEventListener('mouseenter',options)
containeroptions.addEventListener('mouseleave',()=>{
       dropdownup.innerHTML='arrow_drop_down'
         
        podedigitar=true
        optionsdiv.classList.remove('optionsvisivel')
        optionsdiv.classList.add('options')
        optionsallow=true

})
autopreencherfoto.addEventListener('mouseenter',()=>{
    optionsdiv.classList.add('optionsvisivel')
})
        fecharcriarRoom.addEventListener('click',()=>{
            criar.style.display='none'
            login.style.display='flex'
        })
   

 mudarfotoOpcao.addEventListener('click',()=>{
    imagemallow=false
    emotesallow=false
    ampliarfotoallow=false
    fotoampliadacontainer.style.display='none'
    mudarnome.style.display='none'
    mudarfoto.style.display='grid'
 })
 
fecharselecaodefoto.addEventListener('click',()=>{
    mudarfoto.style.display='none'
    
    selecionarfototeste.style.backgroundImage='none'
    imagemallow=true
    emotesallow=true
    ampliarfotoallow=true
})
fotoinputfile.addEventListener('change',()=>{
     const file=fotoinputfile.files[0]
     
    if(!file){
        
        return
    }
    if(!file.type.startsWith('image/')){
        alert('o tipo de arquivo deve ser imagem ')
        return
    }
    
        const reader= new FileReader
            reader.onload=()=>{
                selecionarfototeste.innerHTML=''
                selecionarfototeste.style.backgroundImage=`url(${reader.result})`
                selecionarfototeste.style.backgroundSize='cover'
                selecionarfototeste.style.backgroundPosition='center'
                fotoperfil=reader.result
            }
        
        reader.readAsDataURL(file)
})

confirmarfotoperfil.addEventListener('click',()=>{
    mudarfoto.style.display='none'
    autopreencherfoto.innerHTML=''
    autopreencherfoto.style.backgroundImage=`url(${fotoperfil})`
    autopreencherfoto.style.backgroundSize='cover'
    autopreencherfoto.style.backgroundPosition='center'
    fotoampliada.innerHTML=''
    fotoampliada.style.backgroundImage=`url(${fotoperfil})`
    fotoampliada.style.backgroundSize='cover'
    fotoampliada.style.backgroundPosition='center'
    imagemallow=true
    emotesallow=true
    ampliarfotoallow=true
    user.image=fotoperfil
    
})

autopreencherfoto.addEventListener('click',()=>{

    if(ampliarfotoallow===false){
        return
    }
    chatinput.blur()
    if(fotoperfil===''){
        fotoampliadacontainer.style.display='grid'
        fotoampliada.innerHTML=user.name[0].toUpperCase()
        mudarfoto.style.display='none'
        
        return
    }
    fotoampliadacontainer.style.display='grid'
    
    
}
   
    
)
fecharfotoampliada.addEventListener('click',()=>{
    fotoampliadacontainer.style.display="none"
    podedigitar=true
   })
mudarnomeOpcao.addEventListener('click',()=>{
    
    mudarnome.style.display='flex'
    mudarnomeinput.focus()
    fotoampliadacontainer.style.display='none'
    mudarfoto.style.display='none'
    imagemallow=false
    emotesallow=false
    ampliarfotoallow=false
})
fecharmudarnome.addEventListener('click',()=>{
    mudarnomeinput.value=''
    mudarnome.style.display='none'
    imagemallow=true
    emotesallow=true
    ampliarfotoallow=true
})
mudarnomeconfirm.addEventListener('click',()=>{
    if(mudarnomeinput.value===''){
        return
    }

    user.name=mudarnomeinput.value
    mudarnome.style.display='none'
    if(user.image===''){
         autopreencherfoto.innerHTML=user.name[0].toUpperCase()
        fotoampliada.innerHTML=user.name[0].toUpperCase()
    selecionarfototeste.innerHTML=user.name[0].toUpperCase()
    
    }
    
   h2fotoampliada.innerHTML=user.name
    mudarnomeinput.value=''
    ampliarfotoallow=true
    imagemallow=true
    emotesallow=true
    
})
enviarfoto.addEventListener('click',()=>{
    if(imagemallow){
        enviar=''
        emotesallow=false
        podedigitar=false
        emotescontainer.style.opacity=0
    emotescontainer.style.bottom=`-350px`
    setTimeout(()=>{
        emotescontainer.style.display='none'
    },75)

        menuescolherfoto.style.display='flex'
    setTimeout(()=>{
    menuescolherfoto.style.opacity=1
    
    },50)
    menuescolherfoto.style.opacity=0

    }
    

})

fecharmenuescolherfoto.addEventListener('click',()=>{
    menuescolherfoto.style.display='none'
    emotesallow=true
    podedigitar=true
    
})
enviarfotoinput.addEventListener('click',()=>{
    enviarfotoinput.files[0]=''
    enviarfotoprevia.innerHTML=''
    
})
enviarfotoinput.addEventListener('change',()=>{
    
    enviarfotoprevia.style.backgroundImage='none'
    enviarfotoprevia.innerHTML=''
    let file=enviarfotoinput.files[0]
    if(!file){
        return
    }
    if(!file.type.startsWith('image/')&&!file.type.startsWith('video/')){
        return;
    }
    
    const reader=new FileReader()
    reader.onload =()=>{
        if(file.type.startsWith('image/')){
            image.type='image'
             enviarfotoprevia.style.backgroundImage=`url(${reader.result})`
    enviarfotoprevia.style.backgroundSize='cover'
    enviarfotoprevia.style.backgroundPosition='center'
    enviar=reader.result
    
        }
        if(file.type.startsWith('video/')){

            image.type='video'
            const videoplayer=document.createElement('video')
            videoplayer.style.width='100%'
            videoplayer.style.height='100%'
            videoplayer.controls=true
            videoplayer.src=reader.result
            enviarfotoprevia.style.backgroundImage='none'
            enviarfotoprevia.appendChild(videoplayer)
            enviar=reader.result
        }
       
    }
    reader.readAsDataURL(file)
    
    enviarfotobutton.addEventListener('click',()=>{
    if(enviar===''){
        
        return
    }
    if(image.type==='image'||image.type==='video'){
    image.image=enviar
    image.name=user.name
    image.userId=user.id
    image.color=user.color
    websocket.send(JSON.stringify(image))
    menuescolherfoto.style.display='none'
    enviarfotoprevia.style.backgroundImage='none'
    enviarfotoprevia.innerHTML=''
    enviarfotoinput.value=''
    enviar=''
    image.image=''
    podedigitar=true
    emotesallow=true
    }
})


})


emotesescolher.addEventListener('click',()=>{
    if(!emotesallow){
        return
    }
    emotescontainer.style.display='grid'
    setTimeout(()=>{
          emotescontainer.style.opacity=1
        emotescontainer.style.bottom=`100px`
  

    })
    
})
   fecharselecaoemotes.addEventListener('click',()=>{
    emotescontainer.style.opacity=0
    emotescontainer.style.bottom=`-350px`
    setTimeout(()=>{
        emotescontainer.style.display='none'
    },75)
   })
   emotes.forEach(emote=>{
    emote.addEventListener('click',(event)=>{
        const idemote=event.target.id
        chatinput.value+=String.fromCodePoint(idemote)
        chatinput.focus()
    })
   })
   emotescontainer.addEventListener('mouseleave',()=>{
    emotescontainer.style.bottom=`-350px`
    emotescontainer.style.opacity=0
    setTimeout(()=>{
         emotescontainer.style.display=`none`
    },75)
   
   })
   document.addEventListener('keydown',(e)=>{
       
     
    if(e.code==='Space'){
        chatinput.focus()
    }
   })
   sairdasalaopcao.addEventListener('click',()=>{
    location.reload()
   })