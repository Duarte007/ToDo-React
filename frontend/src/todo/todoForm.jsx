import React from 'react';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import './todo.css';

export default props => {
    const keyHandler = (e) =>{
        if(e.key === "Enter"){
            e.shiftKey ? props.handleSearch() : props.handleAdd();
        } else if(e.shiftKey && (e.key === 'A' || e.key === 'a')){
            props.reload();
        }
    }
    return(
        <div role='form' className='todoForm'>
            <Grid cols="12 9 10">
                <input id="description" className="form-control" onChange={props.handleChange}
                placeholder="Adicione uma tarefa" value={props.description} onKeyUp={keyHandler}></input>
            </Grid>

            <Grid className="12 3 2">
                <IconButton style="primary" icon='plus' onClick={props.handleAdd}/>
                <IconButton style="info" icon='search' onClick={props.handleSearch}/>
                <IconButton style="secondary" icon='refresh' onClick={props.reload}/>
            </Grid>
        </div>
    )
};