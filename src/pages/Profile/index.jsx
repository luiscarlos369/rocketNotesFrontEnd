import {useState} from "react";
import { Container, Form, Avatar } from "./style";
import{ FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { useNavigate} from "react-router-dom"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { useAuth } from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { api } from "../../services/api";


export function Profile(){
const { user, updateProfile } = useAuth();
const navigate = useNavigate();

const [name, setName] = useState(user.name);
const [email, setEmail] = useState(user.email);
const [old_password, setOld_password] = useState();
const [password, setPassword] = useState();


const avatarUrl = user.avatar ? ` ${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
const [avatar, setAvatar] = useState(avatarUrl);
const [avatarFile, setAvatarFile] = useState(null);

function goBack(){
navigate(-1)
}

async function handleUpdate(){
const update = {
name,
email,
old_password : old_password,
password : password,
};

const userUpdate = Object.assign(user, update)

await updateProfile({user: userUpdate, avatarFile});

}

function handleChangeAvatar(event){
const file = event.target.files[0];
setAvatarFile(file);

const imgPreview = URL.createObjectURL(file);
setAvatar(imgPreview);

}



return(

<Container>

<header>
<ButtonText
title={<FiArrowLeft />}
onClick={goBack} 
/>

</header>

<Form>

<Avatar>
<img 
src={avatar}
alt="Foto do Usúario" 
/>
<label htmlFor="avatar">
<FiCamera />

<Input
id="avatar"
type="file"
onChange = {handleChangeAvatar}
/>
</label>
</Avatar>

<Input 
placeholder ="Nome"
type="text"
icon={FiUser}
value={name}
onChange = {e => setName(e.target.value)}
/>

<Input 
placeholder ="E-mail"
type="text"
icon={FiMail}
value = {email}
onChange = {e => setEmail(e.target.value)}
/>

<Input 
placeholder ="Senha atual"
type="password"
icon={FiLock}
onChange = {e => setOld_password(e.target.value)}
/>

<Input 
placeholder ="Nova senha"
type="password"
icon={FiLock}
onChange = {e => setPassword(e.target.value)}
/>

<Button title="Salvar" onClick={handleUpdate} />
</Form>
</Container>
)
}