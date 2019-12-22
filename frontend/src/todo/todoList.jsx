import React from 'react';
import IconButton from '../template/iconButton';
import todoForm from './todoForm';
import './todo.css';

export default props => {

    const renderRows = () => {
        const list = props.list || [];
        return list.map( row => 
            <tr key={row._id}>
                <td className={row.done ? 'markedAsDone' : ''}>{row.description}</td>
                <td>
                    <IconButton style='success' icon='check' hide={row.done} 
                        onClick={()=>props.handleMarkAsDone(row)}/>
                    <IconButton style='warning' icon='undo' hide={!row.done}
                        onClick={()=>props.handleMarkAsPending(row)}/>
                    <IconButton style='danger' icon='trash-o' hide={!row.done} 
                        onClick={()=>props.handleRemove(row)}/>
                </td>
            </tr>
        );
    };

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
};