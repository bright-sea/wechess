import React from 'react';


import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';


import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import {Tabs, Tab} from 'material-ui/Tabs';

import LoginForm from '../../users/components/LoginForm.jsx';
import LoginSocial from '../../users/components/LoginSocial.jsx';
import RegisterForm from '../../users/components/RegisterForm.jsx';
import PasswordForm from '../../users/components/PasswordForm.jsx';

import Profile from '../../users/containers/Profile.js';



export default class extends React.Component {

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

  render() {

    const {locale, i18n, dialog, loggedIn, user, name, appName} = this.props;

    const {Meteor, FlowRouter} = this.props.context();

    const styles = {
      toolbar: {
        backgroundColor: "#00bcd4",
        height: 48,
      },
      rightGroup: {
        marginRight: -24,

      },
      barButton:{
        margin:0,
        paddingLeft: 0,
        color:"white",
        fontSize: "large",
      },
      barIcon:{
        paddingTop:12,
      },
      barLabel:{
        padding:"0 6px",
      },
      title: {
//        cursor: 'pointer',
        lineHeight: "48px",
//        color: "white",
      },
      dialog: {
        padding:5,
      },
    };

    const route = FlowRouter.current();

    /*                <MenuItem primaryText="用户管理"
     leftIcon={<FontIcon className="fa fa-users" />}
     onTouchTap = {() => {FlowRouter.go(`/users`);}}/>
     <MenuItem primaryText="增加用户"
     leftIcon={<FontIcon className="fa fa-user-plus" />}
     onTouchTap = {() => {FlowRouter.go(`/users/add`);}}/>
     */


    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true} float="left">
          <IconButton onTouchTap={() => {FlowRouter.go(`/`); }}><FontIcon className="fa fa-home" color="white" />
          </IconButton>
          {
            route.path.startsWith("/go/sgf/")?
            <div>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              <FlatButton style={styles.barButton}
                          onTouchTap={() => {FlowRouter.go(`/go/sgf`); }}>
                <span style={styles.barLabel}>{i18n.ProGoManuals}</span>
              </FlatButton>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
            </div>  : (
            route.path.startsWith("/go/game/")?
            <div>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              <FlatButton style={styles.barButton}
                          onTouchTap={() => {FlowRouter.go(`/go/game`); }}>
                <span style={styles.barLabel}>{i18n.GoGame}</span>
              </FlatButton>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
            </div>  : (
            route.path.startsWith("/chess/pgn/")?
            <div>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              <FlatButton style={styles.barButton}
                          onTouchTap={() => {FlowRouter.go(`/chess/pgn`); }}>
                <span style={styles.barLabel}>{i18n.ProChessManuals}</span>
              </FlatButton>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
            </div>  : (
            route.path.startsWith("/chess/game/")?
            <div>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              <FlatButton style={styles.barButton}
                          onTouchTap={() => {FlowRouter.go(`/chess/game`); }}>
                <span style={styles.barLabel}>{i18n.ChessGame}</span>
              </FlatButton>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
            </div>  :
            <div/>
            )))
          }
        </ToolbarGroup>
        <ToolbarGroup float="right" style={styles.rightGroup}>
          <IconMenu
            iconButtonElement={
                <IconButton><FontIcon className="fa fa-user" color={loggedIn?"lightgreen":"gainsboro"} />
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
                <MenuItem primaryText={i18n.Profile}
                          leftIcon={<FontIcon className="fa fa-profile" />}
                          onTouchTap = {this.props.openDialogAction.bind(null, false, "profile")}/>
                <MenuItem primaryText={i18n.Logout}
                          leftIcon={<FontIcon className="fa fa-sign-out" />}
                          onTouchTap = {() => {Meteor.logout();}}/>
                <Divider inset={false}/>
                <MenuItem primaryText={i18n.About+" "+appName}
                          leftIcon={<FontIcon className="fa fa-info-circle" />}
                          onTouchTap = {this.props.openDialogAction.bind(null, false, "about")}/>
                <MenuItem primaryText={i18n.English}
                          leftIcon={<img src="/images/english.png" />}
                          onTouchTap = {this.handleSwitchLocale.bind(this, "en-US")}/>
                <MenuItem primaryText={i18n.Chinese}
                          leftIcon={<img src="/images/chinese.png" />}
                          onTouchTap = {this.handleSwitchLocale.bind(this, "zh-CN")}/>
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
                <Divider inset={false}/>
                <MenuItem primaryText={i18n.About+" "+appName}
                          leftIcon={<FontIcon className="fa fa-info-circle" />}
                          onTouchTap = {this.props.openDialogAction.bind(null, false, "about")}/>
                <MenuItem primaryText={i18n.English}
                          leftIcon={<img src="/images/english.png" />}
                          onTouchTap = {this.handleSwitchLocale.bind(this, "en-US")}/>
                <MenuItem primaryText={i18n.Chinese}
                          leftIcon={<img src="/images/chinese.png" />}
                          onTouchTap = {this.handleSwitchLocale.bind(this, "zh-CN")}/>
              </div>
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
              <Tabs tabItemContainerStyle={{backgroundColor:'darkcyan'}}>

                <Tab label={i18n.AccountLogin} >

                  <LoginForm {...this.props}
                    handleLoginSubmit={this.handleLoginSubmit.bind(this)}
                  />

                  <div>
                    <FlatButton
                      primary={true}
                      label={i18n.ForgotPassword}
                      onTouchTap={this.props.openDialogAction.bind(null, false, "password")} />
                  </div>
                  <div>
                    <FlatButton
                      primary={true}
                      label={i18n.RegisterNewAccount}
                      onTouchTap={this.props.openDialogAction.bind(null, false, "register")} />
                  </div>
                </Tab>

                <Tab label={i18n.SocialLogin} >
                  <LoginSocial {...this.props}
                    handleLoginFacebook={this.handleLoginFacebook.bind(this)}
                    handleLoginTwitter={this.handleLoginTwitter.bind(this)}
                    handleLoginGoogle={this.handleLoginGoogle.bind(this)}
                    handleLoginGithub={this.handleLoginGithub.bind(this)}
                  />
                </Tab>
              </Tabs>:(
                dialog.dialogType === "register"?
                <div>
                  <h3>{i18n.RegisterNewAccount}</h3>

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
                    <h3>{i18n.FotgotPassword}</h3>

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
                    <Profile />:<div />
                  )
                )
              )
            )
          }
        </Dialog>

      </Toolbar>
    );
  }
}

