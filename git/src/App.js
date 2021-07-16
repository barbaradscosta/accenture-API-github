import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Profile from './Profile';
import Repo from './Repo';

class App extends Component {
   constructor(){
    
     super();
     this.state = {
        github: {
          url: "https://api.github.com/users",
          client_id: "b122d8f4d85af2996f9f",
          client_secret: "306886817748aef8d58218af0849a676f22d20e4",
          count: 7,
          sort: "created: asc"
        },
        user:[],
        repos: []
     }
    }
    getUser = (e) => {
      const user = e.target.value;

      const { url, client_id, client_secret, count, sort } = this.state.github;
      axios
        .get (
          `${url}/${user}?client_id=${client_id}=client_secret=${client_secret}`        )
        .then (({ data }) => this.setState({user: data}));
        axios
        .get (
          `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&=client_secret=${client_secret}`        )
        .then (({ data }) => this.setState({repos: data}));
    } 

    renderProfile=() => {
      const { user, repos } = this.state;
      return (
        <div className="row">
          <div className="col-md-4">
          <Profile user={user} />
          </div>
          <div className="col-md-8">
            {repos.map(repo => <Repo key={repo.name} repo={repo}/> )}
          </div>
        </div>
      )

    }

    render () {
    return (

    <div className="App">
     <Navbar/>

     <div className="container">
        <div className="card card-body">
          <h2>Campo de pesquisa de usuários</h2>
          <p className="lead">Busque por usuários e repositórios. Insira a informação abaixo:</p>
          <input onChange={this.getUser} id="search" type="text" className="form-control" required />
        </div>
       
        { this.state.user.length !== 0 ? this.renderProfile() : null }
     </div>

    </div>
  );
}
}
export default App;
