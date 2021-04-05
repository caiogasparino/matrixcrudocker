import styled from 'styled-components';

export const Container = styled.div`
  color: #2d2d2d;
`;

export const TableContainer = styled.section`
  margin-top: 20px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #999;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      color: #222;

      li {
        list-style: inside;
      }
    }

    .user-actions {
      button {
        background: transparent;
        border: 0;
        color: #fff;
        transition: 0.2s;

        &:hover {
          opacity: 0.6;
        }
      }

      > button {
        margin-right: 5px;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
