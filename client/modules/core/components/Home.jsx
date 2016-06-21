import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default class extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {

    const {i18n, loggedIn, user, name, appName} = this.props;

    const styles = {
      page: {
        padding:20,
      },
      cardContent: {
        padding:20,
      },
    };


    return (
      <div>

        {loggedIn ?
          <div style={styles.page}>
            <div>{i18n.Welcome + " " + appName + ", " + name +"!"} </div>
          </div> :
          <div style={styles.page}>
            <h3>{i18n.Welcome + " " + appName + "!"} </h3>
            <FlatButton
              primary={true}
              label={i18n.Login}
              icon={<FontIcon className="fa fa-sign-in"/>}
              onTouchTap={() => {this.context.router.push(`/login`);}}/>
            <FlatButton
              primary={true}
              label={i18n.Register}
              icon={<FontIcon className="fa fa-user"/>}
              onTouchTap={() => {this.context.router.push(`/register`);}}/>
          </div>
        }

        <Card
          initiallyExpanded={false}
        >
          <CardHeader
            title={i18n.Go}
            subtitle=""
            avatar="/images/gogame.png"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText
            expandable={true}
            style={styles.cardContent}
          >
          </CardText>
          <CardActions
            expandable={false}
          >
            <FlatButton
              primary={true}
              label={i18n.GoGames}
              onTouchTap={() => {this.context.router.push(`/go/game`); }} />
            <FlatButton
              primary={true}
              label={i18n.GoManuals}
              onTouchTap={() => {this.context.router.push(`/go/sgf`); }} />
          </CardActions>
        </Card>

        <Card
          initiallyExpanded={false}
        >
          <CardHeader
            title={i18n.Chess}
            subtitle=""
            avatar="/images/chessgame.png"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText
            expandable={true}
            style={styles.cardContent}
          >
          </CardText>
          <CardActions
            expandable={false}
          >
            <FlatButton
              primary={true}
              label={i18n.ChessGames}
              onTouchTap={() => {this.context.router.push(`/chess/game`); }} />
            <FlatButton
              primary={true}
              label={i18n.ChessManuals}
              onTouchTap={() => {this.context.router.push(`/chess/pgn`); }} />
          </CardActions>
        </Card>

      </div>
    );
  }

}




