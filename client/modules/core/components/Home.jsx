import React from 'react';

import styles from '../../../libs/styles.js';

import {
  FlatButton,
  RaisedButton,
  FontIcon,
} from 'material-ui';

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';


export default class extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {

    const {i18n, loggedIn, name, appName} = this.props;
    const {router} = this.context;

    return (
      <div>

        {loggedIn ?
          <div style={styles.header}>
            <div>{i18n.Welcome + " " + appName + ", " + name +"!"} </div>
          </div> :
          <div style={styles.header}>
            <div>{i18n.Welcome + " " + appName + "!"} </div>
            <FlatButton
              primary={true}
              label={i18n.Login}
              onTouchTap={() => {router.push(`/login`);}}
            />
            <FlatButton
              primary={true}
              label={i18n.Register}
              onTouchTap={() => {router.push(`/register`);}}
            />
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
          >
          </CardText>
          <CardActions
            expandable={false}
            style={{textAlign:'center'}}
          >
            <FlatButton
              primary={true}
              label={i18n.Games}
              onTouchTap={() => {router.push(`/go/game`); }}
            />
            <FlatButton
              primary={true}
              label={i18n.Manuals}
              onTouchTap={() => {router.push(`/go/sgf`); }}
            />
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
          >
          </CardText>
          <CardActions
            expandable={false}
            style={{textAlign:'center'}}
          >
            <FlatButton
              primary={true}
              label={i18n.Games}
              onTouchTap={() => {router.push(`/chess/game`); }}
            />
            <FlatButton
              primary={true}
              label={i18n.Manuals}
              onTouchTap={() => {router.push(`/chess/pgn`); }}
            />
          </CardActions>
        </Card>

      </div>
    );
  }

}




