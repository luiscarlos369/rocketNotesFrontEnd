import styled from "styled-components";

export const Container = styled.div`
display: flex;
align-items: center;

background-color: ${({ theme, isNew}) => isNew ? "transparent" : theme.COLORS.BACKGROUND_900};
color: ${({ theme}) => theme.COLORS.GRAY_300};

border: ${({ theme, isNew}) => isNew ? `2px dashed ${theme.COLORS.GRAY_300}` : "none"};
border-radius: 1rem;
padding-right: .6rem;

>button{
border:none;
background:none;
}

.button-delete{
color: ${({ theme}) => theme.COLORS.RED};  
}

.button-add{
color: ${({ theme}) => theme.COLORS.ORANGE};  
}

>input{
/* height:56px; */
width:100%;
padding: 1.2rem;

color: ${({ theme}) => theme.COLORS.WHITE};
background: transparent;

border:none;

&::placeholder{
color: ${({ theme}) => theme.COLORS.GRAY_300};
}

}
`;