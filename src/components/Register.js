import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from 'react-native';

import { Form, InputField, Separator } from 'react-native-form-generator';
import Icon from 'react-native-vector-icons/Ionicons';

const dismissKeyboard = require('dismissKeyboard');

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData:{},
      formValid: false,
      emailPlaceholder: 'Email',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      focusedInput: null,
      emailValid: true,
      emailValidationError: "",
      usernameValid: true,
      usernameValidationError: "",
      passwordValid: true,
      passwordValidationError: "",
      serverErrorReceived: false
    }
  }

  _goBack() {
    dismissKeyboard();
    Actions.pop();
  }

  _register() {
    const {email, username, password} = this.state.formData;

    if ((email && username && password) && this.state.formValid) {
      this.props.register(email, username, password);
    }
  }

  handleFormChange(formData) {
    this._validateInput(this.state.focusedInput)

    const {emailValid, usernameValid, passwordValid} = this.state;
    let validInputs = (emailValid && usernameValid && passwordValid)
    let presentInputs = (this.state.formData.email && this.state.formData.username && this.state.formData.password)
    let formValid = (validInputs && presentInputs)

    this.setState({formData:formData, formValid: formValid});
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  handleFormFocus(e, component) {
    if (this._focusedInput('email') == true ) {
      this.setState({emailPlaceholder: '', focusedInput: 'email'});
    } else if (this._focusedInput('username') == true) {
      this.setState({usernamePlaceholder: '', focusedInput: 'username'});
    } else if (this._focusedInput('password') == true) {
      this.setState({passwordPlaceholder: '', focusedInput: 'password'});
    }
  }

  handleBlur(ref) {
    switch (ref) {
      case "email":
        this._validateInput('email');
        this.setState({emailPlaceholder: 'Email'});
        break;
      case "username":
        this._validateInput('username');
        this.setState({usernamePlaceholder: 'Username'});
        break;
      case "password":
        this._validateInput('password');
        this.setState({passwordPlaceholder: 'Password'});
        break;
    }
  }

  _focusedInput(ref) {
    const formRefs = this.refs.registrationForm.refs
    switch (ref) {
      case "email":
        return formRefs.email.refs.fieldComponent.refs.inputBox.isFocused()
        break;
      case "username":
        return formRefs.username.refs.fieldComponent.refs.inputBox.isFocused()
        break;
      case "password":
        return formRefs.password.refs.fieldComponent.refs.inputBox.isFocused()
        break;
    }
  }

  _validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _validateInput(ref) {
    switch(ref) {
      case "email":
        if (!this.state.formData.email || this.state.formData.email == "") {
          this.setState({emailValid: false, emailValidationError: "Required"});
        } else if(this._validateEmail(this.state.formData.email) === false) {
          this.setState({emailValid: false, emailValidationError: "Invalid Email"})
        } else if(this.props.errors.email && !this.state.serverErrorReceived) {
          this.setState({emailValid: false, emailValidationError: this.props.errors.email.message, serverErrorReceived: true})
        } else {
          this.setState({emailValid: true, emailValidationError: ""})
        }
        break;
      case "username":
        if (!this.state.formData.username || this.state.formData.username == "") {
          this.setState({usernameValid: false, usernameValidationError: "Required"});
        } else if (this.props.errors.username && !this.state.serverErrorReceived) {
          this.setState({usernameValid: false, usernameValidationError: this.props.errors.username.message, serverErrorReceived: true})
        } else {
          this.setState({usernameValid: true, usernameValidationError: ""})
        }
        break;
      case "password":
        if (!this.state.formData.password || this.state.formData.password == "") {
          this.setState({passwordValid: false, passwordValidationError: "Required"});
        } else {
          this.setState({passwordValid: true, passwordValidationError: ""})
        }
        break;
    }
  }

  _renderSeparator(ref) {
    switch(ref) {
      case 'email':
        if (this.state.focusedInput === 'email' || (this.state.formData.email && this.state.emailValid)) {
          return(
            <Separator
              label="Email"
              labelStyle={formStyles.activeLabel}
              containerStyle={formStyles.activeLabelContainer}
            />
          )
        } else {
          return(
            <Separator
              label={this.state.emailValidationError}
              labelStyle={formStyles.errorLabel}
              containerStyle={formStyles.activeLabelContainer}
            />
          )
        }
        break;
      case 'username':
        if (this.state.focusedInput === 'username' || (this.state.formData.username && this.state.usernameValid)) {
          return(
            <Separator
              label="Username"
              labelStyle={formStyles.activeLabel}
              containerStyle={formStyles.activeLabelContainer}
            />
          )
        } else {
          return(
            <Separator
              label={this.state.usernameValidationError}
              labelStyle={formStyles.errorLabel}
              containerStyle={formStyles.activeLabelContainer}
            />
          )
        }
        break;
      case 'password':
        if (this.state.focusedInput === 'password' || (this.state.formData.password && this.state.passwordValid)) {
          return(
            <Separator
              label="Password"
              labelStyle={formStyles.activeLabel}
              containerStyle={formStyles.activeLabelContainer}
            />
          )
        } else {
          return(
            <Separator
              label={this.state.passwordValidationError}
              labelStyle={formStyles.errorLabel}
              containerStyle={formStyles.activeLabelContainer}
            />
          )
        }
        break;
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.errors.count > 0 && !this.state.serverErrorReceived) {
      let errors = this.props.errors;
      if (errors.email) {
        this._validateInput('email');
      }

      if (errors.username) {
        this._validateInput('username');
      }
    }
  }

  renderSpinner() {
    return(
      <ActivityIndicator
        animating={this.props.loginLoading}
        style={[styles.loadingSpinner, {height: 20}]}
        size="small"
      />
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => this._goBack()}
            style={styles.navContainer}
          >
            <Icon name='ios-arrow-round-back-outline' style={styles.back} size={28}></Icon>
          </TouchableOpacity>

          <View>
            <Text style={styles.headerText}> SIGN UP </Text>
          </View>

          <TouchableOpacity
            disabled={!this.state.formValid}
            onPress={() => this._register()}
            style={this.state.formValid ? styles.activeSubmitContainer : styles.navContainer}
          >
            <Icon name='ios-arrow-round-forward-outline' style={this.state.formValid ? styles.submit : styles.submitDisabled} size={28}></Icon>
          </TouchableOpacity>
        </View>

        { this.props.loginLoading ? this.renderSpinner() : null }

        <View style={styles.inputs}>
          <Form
            ref='registrationForm'
            onFocus={this.handleFormFocus.bind(this)}
            onChange={this.handleFormChange.bind(this)}>

            {this._renderSeparator('email')}
            <InputField
              ref='email'
              onBlur={() => this.handleBlur('email')}
              autoFocus={true}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={this.state.emailPlaceholder}
              placeholderTextColor='#320D3A'
              style={formStyles.input}
              containerStyle={formStyles.inputContainer}
              containerStyle={ 
                this.state.focusedInput === 'email' ? formStyles.inputContainerActive : (this.state.emailValid ? formStyles.inputContainer : formStyles.inputContainerError)}
              iconRight={(() => {
                if (this.state.formData.email) {
                  if (this.state.emailValid) {
                    return <Icon name='ios-checkmark' size={40} style={formStyles.validIcon}/>
                  } else {
                    return <Icon name='ios-close' size={30} style={formStyles.errorIcon}/>
                  }
                } else if (!this.state.emailValid) {
                  return <Icon name='ios-close' size={30} style={formStyles.errorIcon}/>
                } else {
                  return null
                }
              })()}
            />
            {this._renderSeparator('username')}
            <InputField
              ref='username'
              onBlur={() => this.handleBlur('username')}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={this.state.usernamePlaceholder}
              placeholderTextColor='#320D3A'
              style={formStyles.input}
              containerStyle={formStyles.inputContainer}
              containerStyle={ this.state.focusedInput === 'username' ? formStyles.inputContainerActive : (this.state.usernameValid ? formStyles.inputContainer : formStyles.inputContainerError)}
              iconRight={(() => {
                if (this.state.formData.username) {
                  if (this.state.usernameValid) {
                    return <Icon name='ios-checkmark' size={40} style={formStyles.validIcon}/>
                  } else {
                    return <Icon name='ios-close' size={30} style={formStyles.errorIcon}/>
                  }
                } else if (!this.state.usernameValid) {
                  return <Icon name='ios-close' size={30} style={formStyles.errorIcon}/>
                } else {
                  return null
                }
              })()}
            />

            {this._renderSeparator('password')}
            <InputField
              ref='password'
              password={true}
              secureTextEntry={true}
              onBlur={() => this.handleBlur('password')}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={this.state.passwordPlaceholder}
              placeholderTextColor='#320D3A'
              style={formStyles.input}
              containerStyle={ this.state.focusedInput === 'password' ? formStyles.inputContainerActive : (this.state.passwordValid ? formStyles.inputContainer : formStyles.inputContainerError)}
              validationFunction = {(value)=>{return true;}}
              iconRight={(() => {
                if (this.state.formData.password) {
                  if (this.state.passwordValid) {
                    return <Icon name='ios-checkmark' size={40} style={formStyles.validIcon}/>
                  } else {
                    return <Icon name='ios-close' size={30} style={formStyles.errorIcon}/>
                  }
                } else if (!this.state.passwordValid) {
                  return <Icon name='ios-close' size={30} style={formStyles.errorIcon}/>
                } else {
                  return null
                }
              })()}
            />
          </Form>
        </View>

        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>By signing up, you're agreeing to our Privacy Policy {"\n"} and terms of service </Text>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F7'
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    height: 50
  },

  headerText: {
    color: '#320D3A',
    fontSize: 18,
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  inputs: {
    padding: 10,
    marginTop: 40
  },

  navContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 40
  },

  activeSubmitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 40,
    backgroundColor: '#23EC69'
  },

  back: {
    color: '#320D3A'
  },

  submit: {
    color: '#320D3A'
  },

  submitDisabled: {
    color: 'rgba(50, 13, 58, .20)'
  },

  policyContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  policyText: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'MaisonNeueTRIAL-Demi',
    color: 'rgba(50, 13, 58, .30)',
    padding: 25
  },

  loadingSpinner: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const formStyles = StyleSheet.create({

  inputContainerActive: {
    backgroundColor: '#FAF8F7',
    borderBottomWidth: 2,
    borderBottomColor: '#331238',
    marginRight: 19,
    marginLeft: 19,
    marginTop: 10
  },

  inputContainerError: {
    backgroundColor: '#FAF8F7',
    borderBottomWidth: 2,
    borderBottomColor: '#F76148',
    marginRight: 19,
    marginLeft: 19,
    marginTop: 10
  },

  inputContainer: {
    backgroundColor: '#FAF8F7',
    borderBottomWidth: 1,
    borderBottomColor: '#331238',
    marginRight: 19,
    marginLeft: 19,
    marginTop: 10
  },

  input: {
    backgroundColor: '#FAF8F7',
    fontFamily: 'MaisonNeueTRIAL-Demi',
    fontSize: 16,
    color: '#320D3A',
    paddingLeft: 0
  },

  activeLabelContainer: {
    borderBottomWidth: 0,
    paddingTop: 10,
    height: 20
  },

  activeLabel: {
    fontFamily: 'MaisonNeueTRIAL-Demi',
    fontSize: 10,
    color: 'rgba(50, 13, 58, .50)',
    marginLeft: 10,
    paddingBottom: 0,
    height: 10
  },

  errorLabel: {
    fontFamily: 'MaisonNeueTRIAL-Demi',
    fontSize: 10,
    color: '#F76148',
    marginLeft: 10,
  },

  validIcon: {
    marginTop: 7,
    marginLeft: 20,
    color: '#23EC69'
  },

  errorIcon: {
    fontFamily: 'MaisonNeueTRIAL-Demi',
    marginTop: 7,
    marginLeft: 15,
    color: '#F76148'
  }

})

export default Register;
