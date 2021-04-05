import styled from 'styled-components';

export const Container = styled.div`
  height: 100px;
  width: 100%;
  background-color: #9183dc;
  color: #fff;
`;

export const Menu = styled.div`
  height: 100%;
  padding: 0 40% 0 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuItem = styled.div`
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    text-decoration: underline;
  }
`;
