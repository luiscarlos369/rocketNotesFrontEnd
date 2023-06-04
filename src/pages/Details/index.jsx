import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import { Container, Links, Content } from "./style";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import {api} from "../../services/api";



export function Details(){
const params = useParams();
const navigate = useNavigate();

const [data, setData ] = useState(null);

function goBack(){
navigate(-1)
}

async function handleRemoveNote(){
const confirm = window.confirm("Tem certeza?")
if(confirm){
const response = await api.delete(`/notes/${params.id}`);
setData(response.data);
navigate(-1);
}
}

async function fetchNote(){
const response = await api.get(`/notes/${params.id}`);
setData(response.data);
};

useEffect(() => {
fetchNote();
}, [])

return(
  <Container>
    <Header />
{
data &&
<main>
    <Content>
    <ButtonText 
    title = "Excluir nota"
    onClick={handleRemoveNote} 
    />

    <h1>{data.title}</h1>

    <p>{data.description}</p>
    
{
  data.links &&
  <Section title="Links">
  <Links>
  {
  data.links.map(link => (
  <li key={String(link.id)}>
  <a href={link.url} target="_blank" >
  {link.url}
  </a>
  </li>
  ))
  }
  </Links>
  </Section>
}
    
{
  data.tags && 
  <Section title="Tags">
{
data.tags.map(tag => (
<Tag 
key={String(tag.id)}
title={tag.name} />
))
}
  </Section>
}    
    <Button 
    title = "Voltar"
    onClick={goBack} 
    />
  </Content>
</main>
}
</Container>
)
}
