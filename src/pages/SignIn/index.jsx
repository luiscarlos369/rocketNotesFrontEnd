import { useState } from "react";
import  { Link } from "react-router-dom";
import { Container, Form, Background } from "./style";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { useAuth } from "../../hooks/auth";


export function SignIn(){
const [ email, SetEmail] = useState("");
const [ password, SetPassword] = useState("");

const { signIn } = useAuth();

function handleSignIn(){
signIn({email, password});
}


return(
<Container>
<Form>
<h1>Rocket Notes</h1>
<p>Aplicação para salvar e gerenciar seus links úties.</p>
<h2>Faça seu login</h2>
<Input 
type="text"
placeholder="E-mail"
icon={FiMail} 
onChange = {e => SetEmail(e.target.value)}
/>

<Input 
type="password"
placeholder="Senha"
icon={FiLock} 
onChange = {e => SetPassword(e.target.value)}
/>

<Button title="Entrar" onClick={handleSignIn} />

<Link to="/register">
Criar Conta
</Link>
</Form>
<Background />
</Container>
)
}