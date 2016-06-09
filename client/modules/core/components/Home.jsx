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

    console.log("props", this.props);

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
            <div>{i18n.welcome + ", " + name +"!"} </div>
          </div> :
          <div style={styles.page}>
            <div>{i18n.welcome +"!"} </div>
            <FlatButton
              secondary={true}
              label="登录"
              icon={<FontIcon className="fa fa-sign-in"/>}
              onTouchTap={() => {FlowRouter.go(`/login`);}}/>
            <FlatButton
              secondary={true}
              label="注册"
              icon={<FontIcon className="fa fa-user"/>}
              onTouchTap={() => {FlowRouter.go(`/register`);}}/>
          </div>
        }

        <Card
          initiallyExpanded={true}
        >
          <CardHeader
            title="围棋"
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
              label="围棋对局"
              onTouchTap={() => {FlowRouter.go(`/go/game`); }} />
            <FlatButton
              secondary={true}
              label="职业围棋棋谱"
              onTouchTap={() => {FlowRouter.go(`/go/sgf`); }} />
          </CardActions>
        </Card>

        <Card
          initiallyExpanded={true}
        >
          <CardHeader
            title="国际象棋"
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
              label="国际象棋对局"
              onTouchTap={() => {FlowRouter.go(`/chess/game`); }} />
            <FlatButton
              secondary={true}
              label="国际象棋棋谱"
              onTouchTap={() => {FlowRouter.go(`/chess/pgn`); }} />
          </CardActions>
        </Card>

      </div>
    );
  }
}


