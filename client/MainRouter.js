import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Menu from './core/Menu'
import Terms from './term/Terms'
import EditTerm from './term/EditTerm'
import NewTerm from './term/NewTerm'


const MainRouter = () => {
    return (
      <div>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Terms}/>
          <Route exact path="/term" component={Terms}/>
          <Route exact path="/term/new" component={NewTerm}/>
          <Route path="/term/:id" component={EditTerm}/>
        </Switch>
      </div>
    )
  }

export default MainRouter
