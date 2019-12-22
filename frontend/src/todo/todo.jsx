import React from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';
import './todo.css';

const URL = "http://localhost:3003/api/todos";

export default class Todo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            description: '',
            list: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.refresh = this.refresh.bind(this);
        this.refresh();
    }

    refresh() {
        axios.get(`${URL}?sort=-createdAt`).then(success => {
            this.setState({
                ...this.state,
                description: '',
                list: success.data
            });
        });
    }

    handleChange(e){
        this.setState({
            ...this.state,
            description: e.target.value
        });
    }

    handleAdd() {
        const description = this.state.description;
        axios.post(URL, {description}).then( success => {
            this.refresh();
        });
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`).then( success => {
            this.refresh();
        });
    }

    render(){
        return (
            <React.Fragment>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm description={this.state.description} 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}/>
                <TodoList list={this.state.list} handleRemove={this.handleRemove}/>
            </React.Fragment>
        );
    }
    
}