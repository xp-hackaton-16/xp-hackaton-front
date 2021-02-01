import styled from 'styled-components';

export const ElipsisText = styled.h1`
    max-width: 750px;
`;

export const Subtitle = styled.h3`
    font-size: 16px;
    font-weight: 400;
    color: #666;
    line-height: 1;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const ListItem = styled.li`
    padding: 13px;
    color: #333;
    font-size: 16px;

    &:not(:last-child) {
        border-bottom: 1px solid #eee;
    }
`;