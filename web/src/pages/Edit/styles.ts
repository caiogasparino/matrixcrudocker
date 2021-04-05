import styled from 'styled-components';
import NumberFormat from 'react-number-format';

export const Container = styled.div`
  min-height: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0 50px;
`;

export const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    border: 0;
    padding: 8px;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: 0.2s;

    & + input {
      margin-top: 10px;
    }

    &:hover {
      border: 1px solid #444;
    }
  }

  fieldset {
    margin: 20px 0;
    min-width: 100%;
    padding: 0 5px 0 5px;

    ul {
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow-x: scroll;

      li {
        height: 50px;
        min-width: 200px;
        background-color: #d3d3d3;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        & + li {
          margin-left: 10px;
        }
      }
    }

    .items-grid li.selected {
      background: #e1faec;
      border: 2px solid #9183dc;
    }
  }
`;

export const Input = styled.input``;

export const InputMask = styled(NumberFormat)``;

export const Button = styled.button`
  margin-top: 10px;
  height: 40px;
  border: 0;
  border-radius: 4px;
  background-color: #9183dc;
  transition: 0.2s;

  &:hover {
    background-color: #2f5d7c;
    color: #fff;
  }
`;
