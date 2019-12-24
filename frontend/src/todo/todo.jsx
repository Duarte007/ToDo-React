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
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.refresh = this.refresh.bind(this);
        this.reload = this.reload.bind(this);
        this.refresh();
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : '';
        axios.get(`${URL}?sort=-createdAt${search}`).then(success => {
            this.setState({
                ...this.state,
                description: description ? description : '',
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
        if(description){
            axios.post(URL, {description}).then( success => {
                this.refresh();
            });
        }
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`).then( success => {
            this.refresh(this.state.description);
        });
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: true}).then(success => {
            this.refresh(this.state.description);
        });
    }

    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: false}).then(success => {
            this.refresh(this.state.description);
        });
    }

    handleSearch() {
        this.refresh(this.state.description);
    }

    reload(){
        this.refresh();
    }

    render(){
        return (
            <React.Fragment>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm 
                    description={this.state.description} 
                    handleSearch={this.handleSearch}
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    reload={this.reload}/>
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove} 
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}/>
            </React.Fragment>
        );
    }
    
}