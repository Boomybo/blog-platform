import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../Header';
import ArticlesList from '../ArticlesList';
import ArticlePage from '../ArticlePage';
import * as actions from '../../redux/actions/actions';
import Forms from '../Forms';
import NewArticle from '../NewArticle';

const App = () => {
  return (
    <React.Fragment>
      <Route component={Header}></Route>
      <Switch>
        <Route path={['/sign-up', '/sign-in', '/profile']} component={Forms}></Route>
        <Route path={['/', '/articles/']} exact component={ArticlesList}></Route>
        <Route
          path="/articles/:id"
          render={({ match, history }) => {
            return <ArticlePage slug={match.params.id} history={history} />;
          }}
          exact
        ></Route>

        <Route
          path="/articles/:id/edit"
          render={({ match }) => {
            return <NewArticle slug={match.params.id} />;
          }}
        ></Route>
        <Route path="/new-article" component={NewArticle}></Route>
        <Redirect push to="/" />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(App);
