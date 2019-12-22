import React from 'react';
import IconButton from '../template/iconButton';

export default props => {

    const renderRows = () => {
        const list = props.list || [];
        return list.map( row => 
            <tr key={row._id}>
                <td>{row.description}</td>
                <td>
                    <IconButton style='danger' icon='trash-o' onClick={()=>props.handleRemove(row)}/>
                </td>
            </tr>
        );
    };

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
};