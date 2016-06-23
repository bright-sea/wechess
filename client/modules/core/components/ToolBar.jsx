import React from 'react';

import {
  FlatButton,
  IconButton,
  FontIcon,
  Avatar,
  Divider,
  IconMenu,
  MenuItem,
  Dialog,
} from 'material-ui';

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} from 'material-ui/Toolbar';

import {Tabs, Tab} from 'material-ui/Tabs';

import LoginForm from '../../users/components/LoginForm.jsx';
import RegisterForm from '../../users/components/RegisterForm.jsx';
import PasswordForm from '../../users/components/PasswordForm.jsx';

import Profile from '../../users/containers/Profile.js';
import Invitation from './Invitation.jsx';


export default class extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handleLoginSubmit(email, password) {
    this.props.submitLoginAction(email, password, this.props.closeDialogAction);
  }

  handleLoginFacebook() {
    this.props.loginWithFacebook(this.props.closeDialogAction);
  }

  handleLoginTwitter() {
    this.props.loginWithTwitter(this.props.closeDialogAction);
  }

  handleLoginGoogle() {
    this.props.loginWithGoogle(this.props.closeDialogAction);
  }

  handleLoginGithub() {
    this.props.loginWithGithub(this.props.closeDialogAction);
  }

  handleRegisterSubmit(email, password1, password2) {
    this.props.submitRegisterAction(email, password1, password2, this.props.closeDialogAction);
  }

  handlePasswordSubmit(email) {
    this.props.submitPasswordAction(email, this.props.closeDialogAction);
  }

  handleSwitchLocale(locale) {
    this.props.switchLocaleAction(locale);
  }

  handleInvitationSubmit(email, gameUrl, gameType) {
    this.props.submitInvitationAction(email, gameUrl, gameType, this.props.user,
      this.props.closeDialogAction);
  }

  render() {

    const {locale, i18n, dialog, loggedIn, name, appName} = this.props;

    const {Meteor} = this.props.context();
    const {router} = this.context;
    const path = this.props.location.pathname;

    const styles = {
      rightGroup: {
        float: "right",
        marginRight: -24,
      },
      barButton:{
        margin:0,
        paddingLeft: 0,
        color:"white",
      },
      barIcon:{
        paddingTop: 10,
      },
      barLabel:{
        paddingLeft: 5,
      },
      dialog:{
        padding:5,
      },
    };


    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <IconButton
            onTouchTap={() => {router.push(`/`); }}
          >
            <FontIcon className="fa fa-home" color="white" />
          </IconButton>
          {
            path === "/go/sgf"?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <span style={styles.barLabel}>{i18n.GoManuals}</span>
              </div>  : (
            path.startsWith("/go/sgf/")?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <FlatButton
                  style={styles.barButton}
                  onTouchTap={() => {router.push(`/go/sgf`); }}
                >
                  <span style={styles.barLabel}>{i18n.GoManuals}</span>
                </FlatButton>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              </div>  : (
            path === "/go/game"?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <span style={styles.barLabel}>{i18n.GoGames}</span>
              </div>  : (
            path === "/go/game/create"?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <FlatButton
                  style={styles.barButton}
                  onTouchTap={() => {router.push(`/go/game`); }}
                >
                  <span style={styles.barLabel}>{i18n.GoGames}</span>
                </FlatButton>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <span style={styles.barLabel}>{i18n.CreateNewGame}</span>
              </div>  : (
            path.startsWith("/go/game/")?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <FlatButton
                  style={styles.barButton}
                  onTouchTap={() => {router.push(`/go/game`); }}
                >
                  <span style={styles.barLabel}>{i18n.GoGames}</span>
                </FlatButton>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              </div>  : (
            path === "/chess/pgn"?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <span style={styles.barLabel}>{i18n.ChessManuals}</span>
              </div>  : (
            path.startsWith("/chess/pgn/")?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <FlatButton
                  style={styles.barButton}
                  onTouchTap={() => {router.push(`/chess/pgn`); }}
                >
                  <span style={styles.barLabel}>{i18n.ChessManuals}</span>
                </FlatButton>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              </div>  : (
            path === "/chess/game"?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <span style={styles.barLabel}>{i18n.ChessGames}</span>
              </div>  : (
            path === "/chess/game/create"?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <FlatButton
                  style={styles.barButton}
                  onTouchTap={() => {router.push(`/chess/game`); }}
                >
                  <span style={styles.barLabel}>{i18n.ChessGames}</span>
                </FlatButton>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <span style={styles.barLabel}>{i18n.CreateNewGame}</span>
              </div>  : (
            path.startsWith("/chess/game/")?
              <div>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
                <FlatButton
                  style={styles.barButton}
                  onTouchTap={() => {router.push(`/chess/game`); }}
                >
                  <span style={styles.barLabel}>{i18n.ChessGames}</span>
                </FlatButton>
                <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              </div>  : <div/>
            )))))))))
          }
        </ToolbarGroup>

        <ToolbarGroup style={styles.rightGroup}>
          <IconMenu
            iconButtonElement={
              <IconButton>
                <FontIcon className="fa fa-user" color={loggedIn?"lightgreen":"gainsboro"} />
              </IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          >

            { loggedIn?
              <div>
                <div style={{marginBottom:10, marginLeft:20}}>
                  {name}
                </div>
                <Divider inset={false}/>
                <MenuItem
                  primaryText={i18n.Profile}
                  leftIcon={<FontIcon className="fa fa-profile" />}
                  onTouchTap = {this.props.openDialogAction.bind(null, false, "profile")}
                />
                <MenuItem
                  primaryText={i18n.Logout}
                  leftIcon={<FontIcon className="fa fa-sign-out" />}
                  onTouchTap = {() => {Meteor.logout();}}
                />
              </div>:
              <div>
                <MenuItem
                  primaryText={i18n.Login}
                  leftIcon={<FontIcon className="fa fa-sign-in" />}
                  onTouchTap = {this.props.openDialogAction.bind(null, false, "login")}
                />
                <MenuItem
                  primaryText={i18n.Register}
                  leftIcon={<FontIcon className="fa fa-user" />}
                  onTouchTap = {this.props.openDialogAction.bind(null, false, "register")}
                />
              </div>
            }
            <Divider inset={false}/>
            <MenuItem
              primaryText={i18n.About+" "+appName}
              leftIcon={<FontIcon className="fa fa-info-circle" />}
              onTouchTap = {this.props.openDialogAction.bind(null, false, "about")}
            />
            {locale === "en-US"?
              <MenuItem
                primaryText={i18n.Chinese}
                leftIcon={<img src="/images/chinese.png" />}
                onTouchTap = {this.handleSwitchLocale.bind(this, "zh-CN")}
              />:
              <MenuItem
                primaryText={i18n.English}
                leftIcon={<img src="/images/english.png" />}
                onTouchTap = {this.handleSwitchLocale.bind(this, "en-US")}
              />
            }
            {this.props.stoneSound ?
              <MenuItem
                primaryText={i18n.StoneSound}
                leftIcon={<FontIcon className="fa fa-check-square-o" />}
                onTouchTap={this.props.switchStoneSoundAction.bind(this, false)}
              /> :
              <MenuItem
                primaryText={i18n.StoneSound}
                leftIcon={<FontIcon className="fa fa-square-o" />}
                onTouchTap={this.props.switchStoneSoundAction.bind(this, true)}
              />
            }

            {name === "test@test.com" ?
              <div>
                <MenuItem
                  primaryText={i18n.UserManagement}
                  leftIcon={<FontIcon className="fa fa-users" />}
                  onTouchTap={() => {this.context.router.push(`/users`);}}
                />
                <MenuItem
                  primaryText={i18n.AddNewUser}
                  leftIcon={<FontIcon className="fa fa-user-plus" />}
                  onTouchTap={() => {this.context.router.push(`/users/add`);}}
                />
              </div> : null
            }

          </IconMenu>
        </ToolbarGroup>

        <Dialog
          actions={[]}
          modal={dialog.modal}
          bodyStyle={styles.dialog}
          open={dialog.open}
          autoScrollBodyContent={true}
          onRequestClose={this.props.closeDialogAction}
        >
          {
            dialog.dialogType === "about"?
              <div>
                <h3>{appName}</h3>
                <p>{i18n.AboutText}</p>
              </div>: (
            dialog.dialogType === "login"?
              <div>
                <LoginForm {...this.props}
                  handleLoginSubmit={this.handleLoginSubmit.bind(this)}
                  handleLoginFacebook={this.handleLoginFacebook.bind(this)}
                  handleLoginTwitter={this.handleLoginTwitter.bind(this)}
                  handleLoginGoogle={this.handleLoginGoogle.bind(this)}
                  handleLoginGithub={this.handleLoginGithub.bind(this)}
                />
                <div>
                  <FlatButton
                    primary={true}
                    label={i18n.ForgotPassword}
                    onTouchTap={this.props.openDialogAction.bind(null, false, "password")}
                  />
                </div>
                <div>
                  <FlatButton
                    primary={true}
                    label={i18n.RegisterNewAccount}
                    onTouchTap={this.props.openDialogAction.bind(null, false, "register")}
                  />
                </div>
              </div>:(
            dialog.dialogType === "register"?
              <div>
                <RegisterForm {...this.props}
                  handleRegisterSubmit={this.handleRegisterSubmit.bind(this)}
                  />

                <div>
                  <FlatButton
                    primary={true}
                    label={i18n.LoginExistingAccount}
                    onTouchTap={this.props.openDialogAction.bind(null, false, "login")} />
                </div>
              </div>:(
            dialog.dialogType === "password"?
              <div>
                <PasswordForm {...this.props}
                  handlePasswordSubmit={this.handlePasswordSubmit.bind(this)}
                />

                <div>
                  <FlatButton
                    primary={true}
                    label={i18n.LoginExistingAccount}
                    onTouchTap={this.props.openDialogAction.bind(null, false, "login")} />
                </div>
              </div>:(
            dialog.dialogType === "profile"?
              <Profile />:(
            dialog.dialogType === "invitation"?
              <Invitation {...this.props}
                gameUrl = {dialog.payload.gameUrl}
                gameType = {dialog.payload.gameType}
                handleInvitationSubmit={this.handleInvitationSubmit.bind(this)}
              />:<div />
            )))))
          }
        </Dialog>

      </Toolbar>
    );
  }
}

