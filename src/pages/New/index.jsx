import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { FiPlus } from "react-icons/fi";
import { Container, Form } from "./style";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import {ButtonText} from "../../components/ButtonText";
import{api} from "../../services/api";


export function New(){
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const [links, setLinks ] = useState([]);
const [ newLink, setNewLink] = useState("");

const [tags, setTags ] = useState([]);
const [ newTag, setNewTag] = useState("");

const navigate = useNavigate();

function goBack(){
navigate(-1)
}

function handleAddLink(){
setLinks(prevState => [...prevState, newLink]);
setNewLink("");
}

function handleRemoveLInk(deleted){
setLinks(prevState => prevState.filter(link => link !== deleted));
}

function handleAddTag(){
setTags(prevState => [...prevState, newTag]);
setNewTag("");
}

function handleRemoveTag(deleted){
setTags(prevState => prevState.filter(tag => tag !== deleted));
}

async function handleNewNote(){
if(!title){
return alert("Digite o título da nota.")
}

if(newTag){
return alert(`Deve clicar no simbolo de + para adicionar sua nova Tag.`)
}

if(newLink){
return alert(`Deve clicar no simbolo de + para adicionar seu novo Link.`)
}

await api.post("/notes",{
title,
description,
tags,
links
});
alert("nota cadastrada com sucesso!");
navigate(-1);
}



return(
<Container>

<Header />

<main>
<Form>
<header>
<h1>Criar Nota</h1>
<ButtonText 
title="Voltar" 
onClick= {goBack}
/>
</header>
<Input 
type="text"
placeholder="Título"
onChange={e => setTitle(e.target.value)}
/>

<Textarea 
placeholder = "Observações"
onChange= {e=> setDescription(e.target.value)}
/>

<Section title="Links úties" >

{
links.map((link, index) =>(
<NoteItem
key={String(index)}
value={link}
onClick={() => handleRemoveLInk(link)}
/>
))
}

<NoteItem 
isNew 
placeholder="Novo link"
value={newLink}
onChange={e => setNewLink(e.target.value)}
onClick={handleAddLink}
/>    
</Section> 


<Section title="Marcadores" >
<div className="tags">

{
tags.map((tag, index) =>(
<NoteItem 
key={String(index)} 
value={tag}
onClick={() => handleRemoveTag(tag)}
/>
))
}

<NoteItem 
isNew 
placeholder="Nova Tag"
onChange= {e=> setNewTag(e.target.value)}
value={newTag}
onClick={handleAddTag}
/>    
</div>
</Section> 

<Button 
title="Salvar" 
onClick={handleNewNote}
/>

</Form>
</main>

</Container>
)
} 