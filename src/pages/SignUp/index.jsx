import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Background } from "./style";
import { FiLogIn, FiMail, FiLock, FiUser } from "react-icons/fi"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { api } from "../../services/api";

export function SignUp(){
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

function goBack(){
navigate("/")
}

function handleSignUp(){
if(!name || !email || !password){
return alert("Por favor prencha todos os campos!")
}

api.post("/users", {name, email, password})
.then(() => {
alert("cadastrado con sucesso!");
goBack();
})
.catch(error => {
if(error.response){
alert(error.response.data.message);
} else{
alert("Não foi possível cadastrar.")
}

})
}

return(
<Container>
<Background />
<Form>
<h1>Rocket Notes</h1>
<p>Aplicação para salvar e gerenciar seus links úties.</p>
<h2>Crie sua conta</h2>

<Input 
type="text"
placeholder="Nome"
icon={FiUser}
onChange = { e => setName(e.target.value)} 
/>

<Input 
type="text"
placeholder="E-mail"
icon={FiMail}
onChange = { e => setEmail(e.target.value)}  
/>

<Input 
type="password"
placeholder="Senha"
icon={FiLock} 
onChange = { e => setPassword(e.target.value)} 
/>

<Button title="Cadastrar" onClick={handleSignUp} />

<ButtonText
id= "btnBack"
title="Voltar para o login"
onClick={goBack}
/>
</Form>
</Container>
)
}