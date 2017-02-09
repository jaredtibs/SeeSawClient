import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { Form, InputField, Separator } from 'react-native-form-generator';
import Icon from 'react-native-vector-icons/Ionicons';

const dismissKeyboard = require('dismissKeyboard');
//const ReactNativeComponentTree = require('react-native');

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData:{},
      formValid: false,
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      focusedInput: null,
      emailValid: true,
      emailValidationError: "",
      passwordValid: true,
      passwordValidationError: "",
      serverErrorReceived: false
    }
  }

  _goBack() {
    dismissKeyboard();
    Actions.pop();
  }

  _login() {
    const {email, password} = this.state.formData;

    if ((email && password) && this.state.formValid) {
      this.props.requestLogin(email, password);
    }
  }

  handleFormChange(formData) {
    this._validateInput(this.state.focusedInput)

    const {emailValid, passwordValid} = this.state;
    let validInputs = (emailValid && passwordValid)
    let presentInputs = (this.state.formData.email && this.state.formData.password)
    let formValid = (validInputs && presentInputs)

    this.setState({formData:formData, formValid: formValid});
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  handleFormFocus(e, component) {
    //let targetComponent = ReactNativeComponentTree.getNodeFromInstance(component);
    //let inputRef = targetComponent._currentElement.props.fieldRef;
    switch ('email') {
      case 'email':
        this.setState({emailPlaceholder: '', focusedInput: 'email'});
        break;
      case 'password':
        this.setState({passwordPlaceholder: '', focusedInput: 'password'});
        break;
    }
  }

  handleBlur(ref) {
    switch (ref) {
      case "email":
        this._validateInput('email');
        this.setState({emailPlaceholder: 'Email'});
        break;
      case "password":
        this._validateInput('password');
        this.setState({passwordPlaceholder: 'Password'});
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
        } else {
          this.setState({emailValid: true, emailValidationError: ""})
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

  //TBD
  //componentDidUpdate(previousProps, previousState) {
  //  if (this.props.errors.count > 0 && !this.state.serverErrorReceived) {
  //    let errors = this.props.errors;
  //    if (errors.email) {
  //      this._validateInput('email');
  //   }
  // }
  //}


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
            onPress={() => this._login()}
            style={this.state.formValid ? styles.activeSubmitContainer : styles.navContainer}
          >
            <Icon name='ios-arrow-round-forward-outline' style={this.state.formValid ? styles.submit : styles.submitDisabled} size={28}></Icon>
          </TouchableOpacity>
        </View>

        { this.props.loginLoading ? this.renderSpinner() : null }

        <View style={styles.inputs}>
          <Form
            ref='loginForm'
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
              containerStyle={ this.state.focusedInput === 'email' ? formStyles.inputContainerActive : (this.state.emailValid ? formStyles.inputContainer : formStyles.inputContainerError)}
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
            />
          </Form>
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
    height: 10
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
    paddingBottom: 0
  }

})

export default Login;
