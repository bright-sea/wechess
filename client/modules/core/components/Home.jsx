import React from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';


export default class Home extends React.Component {


  render() {

    const {i18n, loggedIn, user, name} = this.props;
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
            <div>{i18n.Welcome + ", " + name +"!"} </div>
          </div> :
          <div style={styles.page}>
            <div>{i18n.Welcome +"!"} </div>
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
              label={i18n.ProGoScript}
              onTouchTap={() => {FlowRouter.go(`/go/sgf`); }} />
          </CardActions>
        </Card>

        <Card
          initiallyExpanded={true}
        >
          <CardHeader
            title={i18n.Chess}
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
              label={i18n.ProChessScript}
              onTouchTap={() => {FlowRouter.go(`/chess/pgn`); }} />
          </CardActions>
        </Card>

      </div>
    );
  }
}


