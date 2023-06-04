import styled from "styled-components";

export const Container = styled.section`

margin: 24px 0;

h2 {

border-bottom-width: 1px;
border-bottom-style: solid;
border-bottom-color: ${({theme}) => theme.COLORS.BACKGROUND_700};

padding: 16px;
margin-bottom: 24px;

font-weight: 400;
font-size: 20px;
color: ${({theme}) => theme.COLORS.GRAY_100};
    
}

`;