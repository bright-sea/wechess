import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default class extends React.Component {


  render() {

    const {i18n, loggedIn, user, name, appName} = this.props;
    const {FlowRouter} = this.props.context();

    //console.log("users",users);
    //const userCount = users.length;
    //const onlineCount = users.filter((user)=>user.status.online).length;
    //
    //console.log(userCount,onlineCount);

    const styles = {
      page: {
        padding:20,
      },
      cardContent: {
        padding:0,
      },
    };


    return (
      <div>

        {loggedIn ?
          <div style={styles.page}>
            <h3>{i18n.Welcome + " " + appName + ", " + name +"!"} </h3>
          </div> :
          <div style={styles.page}>
            <h3>{i18n.Welcome + " " + appName + "!"} </h3>
            <FlatButton
              secondary={true}
              label={i18n.Login}
              icon={<FontIcon className="fa fa-sign-in"/>}
              onTouchTap={() => {FlowRouter.go(`/login`);}}/>
            <FlatButton
              secondary={true}
              label={i18n.Register}
              icon={<FontIcon className="fa fa-user"/>}
              onTouchTap={() => {FlowRouter.go(`/register`);}}/>
          </div>
        }

        <Card
          initiallyExpanded={true}
        >
          <CardHeader
            title={i18n.Go}
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
            expandable={true}
            style={styles.cardContent}
          >
            <FlatButton
              secondary={true}
              label={i18n.GoGame}
              onTouchTap={() => {FlowRouter.go(`/go/game`); }} />
            <FlatButton
              secondary={true}
              label={i18n.ProGoManuals}
              onTouchTap={() => {FlowRouter.go(`/go/sgf`); }} />
          </CardActions>
        </Card>

        <Card
          initiallyExpanded={true}
        >
          <CardHeader
            title={i18n.Chess}
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
            expandable={true}
            style={styles.cardContent}
          >
            <FlatButton
              secondary={true}
              label={i18n.ChessGame}
              onTouchTap={() => {FlowRouter.go(`/chess/game`); }} />
            <FlatButton
              secondary={true}
              label={i18n.ProChessManuals}
              onTouchTap={() => {FlowRouter.go(`/chess/pgn`); }} />
          </CardActions>
        </Card>

      </div>
    );
  }
}


