import { FiPlus, FiSearch } from "react-icons/fi";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import{ Container, Brand, Menu, Search, Content, NewNote } from "./style";
import { Section } from "../../components/Section";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Note } from "../../components/Note";
import { ButtonText } from "../../components/ButtonText";
import { api } from "../../services/api";



export function Home(){
const [tags, setTags] = useState([]);
const [tagsSelected, setTagsSelected] = useState([]);
const [search, setSearch ] = useState("")
const [notes, setNotes ] = useState([]);

const navigate = useNavigate();

function handleTagSelected(tagName){

if(tagName === "all"){
return setTagsSelected([])
};


const allReadySelected = tagsSelected.includes(tagName);

if(allReadySelected){
const filteredTags = tagsSelected.filter(tag => tag !== tagName);
setTagsSelected(filteredTags);
}else{
setTagsSelected(prevState => [...prevState, tagName]);
}
}

function handleDetails(id){
navigate(`/details/${id}`)
}


async function fetchTags(){
const response = await api.get("/tags");
setTags(response.data);
}

useEffect(() =>{
fetchTags();
}, [] );


async function fetchNotes(){
const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
setNotes(response.data);
}

useEffect(() =>{
fetchNotes();
}, [tagsSelected, search] );







return(
<Container>

<Brand>
<h1>Rocketnotes</h1>
</Brand>

<Header />

<Menu>
<li>
<ButtonText 
title="Todos" 
onClick={() => handleTagSelected("all")}
isActive = {tagsSelected.length === 0}
/>
</li>

{
tags && tags.map(tag => (
<li key={String(tag.id)}>
<ButtonText 
title={tag.name} 
onClick={() => handleTagSelected(tag.name)}
isActive = {tagsSelected.includes(tag.name)}
/>
</li>
))

}

</Menu>

<Search>
<Input 
icon={FiSearch} 
placeholder="Pesquisar pelo título." 
onChange={e => setSearch(e.target.value)}
/>
</Search>

<Content>
<section title="Minhas Notas">

{
notes.map(note => (
<Note
key={String(note.id)}  
data={note}
onClick={() => handleDetails(note.id)}
/>
))

}

</section>

</Content>

<NewNote to="/new">
<FiPlus />
Criar Nota
</NewNote>




</Container>
)
}