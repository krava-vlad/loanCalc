import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card, Media } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import styles from './calc.module.scss';
import dollarImg from '../assets/images/dollar-bag.png';

export default class calc extends Component {
  constructor(props){
    super(props);
    this.state = {
      recievedPPPFunds2020: props.recievedPPPFunds2020,
      isInBussinessFeb2020: props.isInBussinessFeb2020,
      isSeasonalBusiness: props.isSeasonalBusiness,
      isFoodHospitalityIndustry: props.isFoodHospitalityIndustry,
      isQuater2019: props.isQuater2019,
      amount: props.amount,
      totalPayroll: 0,
      totalPayroll1: 0,
      totalPayroll2: 0,
      errorMessage: '',
      className: '',
      findMore: false
    };
  };

  handleFormPPPFunds2020 = (event) => {
    this.setState({recievedPPPFunds2020: event.target.value});
  };

  handleBussinessFeb2020 = (event) => {
    this.setState({isInBussinessFeb2020: event.target.value});
  };

  handleQuater2019 = (event) => {
    this.setState({isQuater2019: event.target.value});
  };

  handleSeasonalBusiness = (event) => {
    this.setState({isSeasonalBusiness: event.target.value});
  };

  handleFoodHospitalityIndustry = (event) => {
    this.setState({isFoodHospitalityIndustry: event.target.value});
  };

  onCalc = () => {

    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      isSeasonalBusiness,
      isQuater2019,
      totalPayroll,
      totalPayroll1,
      totalPayroll2,
    } = this.state;

    let dispAmount = 0;

    if (recievedPPPFunds2020 === 'PPPFunds2020Yes'){
      if (isInBussinessFeb2020 === 'BussinessFeb2020Yes') {
        if (isQuater2019 === 'Quater2019Yes') {
          if (isSeasonalBusiness === 'SeasonalBusinessYes') {
            dispAmount = (new Intl.NumberFormat().format((Math.round(totalPayroll * 3.5)))).toString();
            this.setState({amount: dispAmount})
          } else if (isSeasonalBusiness === 'SeasonalBusinessNo') {
            dispAmount = (new Intl.NumberFormat().format((Math.round(totalPayroll * 2.5)))).toString();
            this.setState({amount: dispAmount})
          }
        } else if (isQuater2019 === 'Quater2019No') {
          this.setState({amount: '0'});
        }
      } else if (isInBussinessFeb2020 === 'BussinessFeb2020No'){
        this.setState({amount: '0'});
      }
    } else if (recievedPPPFunds2020 === 'PPPFunds2020No'){
      if (isInBussinessFeb2020 === 'BussinessFeb2020Yes') {
        if (isSeasonalBusiness === 'SeasonalBusinessYes') {
          if (totalPayroll1 * 2.5 / 4 > totalPayroll2 * 2.5 / 2.75) {
            dispAmount = (new Intl.NumberFormat().format(Math.round((totalPayroll1 * 2.5 / 4)))).toString();
          } else {
            dispAmount = (new Intl.NumberFormat().format(Math.round((totalPayroll2 * 2.5 / 2.75)))).toString();
          }
          this.setState({amount: dispAmount});

        } else if (isSeasonalBusiness === 'SeasonalBusinessNo'){
          dispAmount = (new Intl.NumberFormat().format(Math.round((totalPayroll * 2.5 / 12)))).toString();
          this.setState({amount: dispAmount});
        }
      } else if (isInBussinessFeb2020 === 'BussinessFeb2020No'){
        dispAmount = (new Intl.NumberFormat().format(Math.round((totalPayroll * 2.5 / 2)))).toString();
        this.setState({amount: dispAmount});
      }
    }
  }

  onShowFindMore = () => {
    const {findMore} = this.state;
    this.setState({findMore: !findMore});
  }

  validateValue = (value, type='totalPayroll') => {
    const rawValue = value === undefined ? 'undefined' : value;
    switch (type) {
      case 'totalPayroll':
        this.setState({ totalPayroll: rawValue || ' ' });
        break;
      case 'totalPayroll1':
        this.setState({ totalPayroll1: rawValue || ' ' });
        break;
      case 'totalPayroll2':
        this.setState({ totalPayroll2: rawValue || ' ' });
        break;
      default:
        break;
    }
    if (!value) {
      this.setState({className: ''});
    } else if (Number.isNaN(Number(value))) {
      this.setState({
        errorMessage: 'Please enter a valid number',
        className: 'is-invalid'
      })
    } else {
      this.setState({className: 'is-valid'});
    }
  };
 

  renderForm1(){
    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      isSeasonalBusiness,
      className,
      errorMessage
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido2"
              value="PPPFunds2020No"
              checked={recievedPPPFunds2020 === 'PPPFunds2020No'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Were you in business February 15, 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio2"
              value="BussinessFeb2020No"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020No'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formSeasonalBusiness" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Are you a seasonal business?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio1"
              value="SeasonalBusinessYes"
              checked={isSeasonalBusiness === 'SeasonalBusinessYes'}
              onChange={this.handleSeasonalBusiness}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio2"
              value="SeasonalBusinessNo"
              checked={isSeasonalBusiness === 'SeasonalBusinessNo'}
              onChange={this.handleSeasonalBusiness}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          What were your total payroll costs in the last 12 months? 
        </Form.Label>
        <CurrencyInput
          id="amount1"
          placeholder="$0"
          allowDecimals={false}
          className={`form-control ${className}`}
          onValueChange={(value) => this.validateValue(value, 'totalPayroll')}
          prefix={'$'}
          step={10}
        />
        <div className="invalid-feedback">{errorMessage}</div>
      </Form.Group>
    </>
  }

  renderForm2(){
    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      isSeasonalBusiness,
      className,
      errorMessage
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido2"
              value="PPPFunds2020No"
              checked={recievedPPPFunds2020 === 'PPPFunds2020No'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Were you in business February 15, 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio2"
              value="BussinessFeb2020No"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020No'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formSeasonalBusiness" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Are you a seasonal business?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio1"
              value="SeasonalBusinessYes"
              checked={isSeasonalBusiness === 'SeasonalBusinessYes'}
              onChange={this.handleSeasonalBusiness}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio2"
              value="SeasonalBusinessNo"
              checked={isSeasonalBusiness === 'SeasonalBusinessNo'}
              onChange={this.handleSeasonalBusiness}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          What was your total payroll costs between March 1 2019 and June 30 2019?
        </Form.Label>
        <CurrencyInput
          id="amount2"
          placeholder="$0"
          allowDecimals={false}
          className={`form-control ${className}`}
          onValueChange={(value) => this.validateValue(value, 'totalPayroll1')}
          prefix={'$'}
          step={10}
        />
        <div className="invalid-feedback">{errorMessage}</div>
      </Form.Group>
      <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          What was your total payroll costs between Feb 15 2019 and May 10 2019? 
        </Form.Label>
        <CurrencyInput
          id="amount3"
          placeholder="$0"
          allowDecimals={false}
          className={`form-control ${className}`}
          onValueChange={(value) => this.validateValue(value, 'totalPayroll2')}
          prefix={'$'}
          step={10}
        />
        <div className="invalid-feedback">{errorMessage}</div>
      </Form.Group>
    </>
  }

  renderForm3(){
    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      className,
      errorMessage
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido2"
              value="PPPFunds2020No"
              checked={recievedPPPFunds2020 === 'PPPFunds2020No'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Were you in business February 15, 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio2"
              value="BussinessFeb2020No"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020No'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
        <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
          <Form.Label className={`text-muted ${styles.labelText}`}>
            What were your total payroll costs between Jan 1 2020 and Feb 29 2020?
          </Form.Label>
          <CurrencyInput
            id="amount4"
            placeholder="$0"
            allowDecimals={false}
            className={`form-control ${className}`}
            onValueChange={(value) => this.validateValue(value, 'totalPayroll')}
            prefix={'$'}
            step={10}
          />
          <div className="invalid-feedback">{errorMessage}</div>
        </Form.Group>
      </Form.Group>
    </>
  }

  renderForm4() {
    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      isQuater2019
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido2"
              value="PPPFunds2020No"
              checked={recievedPPPFunds2020 === 'PPPFunds2020No'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Were you in business February 15, 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio2"
              value="BussinessFeb2020No"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020No'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
        {
          isInBussinessFeb2020 === 'BussinessFeb2020No' && <Form.Text className={`${styles.alertText}`}>
            To qualify for additional PPP funds, you would have needed to be in business before February 15, 2020.
          </Form.Text>
        }
      </Form.Group>
      <Form.Group controlId="formQuater2019" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          In any quarter in 2020 did your business have 25% less gross receipts than the same quarter in 2019
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formQuater2019"
              id="formQuater2019Radio1"
              value="Quater2019Yes"
              checked={isQuater2019 === "Quater2019Yes"}
              onChange={this.handleQuater2019}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formQuater2019"
              id="formQuater2019Radio2"
              value="Quater2019No"
              checked={isQuater2019 === "Quater2019No"}
              onChange={this.handleQuater2019}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
        {
          isQuater2019 === 'Quater2019No' && <Form.Text className={`${styles.alertText}`}>
            To qualify for additional PPP funds, your business would have needed to experience a 25% reduction in gross receipts.
          </Form.Text>
        }
      </Form.Group>
    </>
  }

  renderForm5() {
    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      isSeasonalBusiness,
      isFoodHospitalityIndustry,
      isQuater2019,
      className,
      errorMessage
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido2"
              value="PPPFunds2020No"
              checked={recievedPPPFunds2020 === 'PPPFunds2020No'}
              onChange={this.handleFormPPPFunds2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Were you in business February 15, 2020?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio2"
              value="BussinessFeb2020No"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020No'}
              onChange={this.handleBussinessFeb2020}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formQuater2019" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          In any quarter in 2020 did your business have 25% less gross receipts than the same quarter in 2019
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formQuater2019"
              id="formQuater2019Radio1"
              value="Quater2019Yes"
              checked={isQuater2019 === "Quater2019Yes"}
              onChange={this.handleQuater2019}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formQuater2019"
              id="formQuater2019Radio2"
              value="Quater2019No"
              checked={isQuater2019 === "Quater2019No"}
              onChange={this.handleQuater2019}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formSeasonalBusiness" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Are you a seasonal business?
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio1"
              value="SeasonalBusinessYes"
              checked={isSeasonalBusiness === 'SeasonalBusinessYes'}
              onChange={this.handleSeasonalBusiness}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio2"
              value="SeasonalBusinessNo"
              checked={isSeasonalBusiness === 'SeasonalBusinessNo'}
              onChange={this.handleSeasonalBusiness}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formFoodHospitalityIndustry" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className={`text-muted ${styles.labelText}`}>
          Is your business in the food or hospitality industry? 
        </Form.Label>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formFoodHospitalityIndustry"
              id="formFoodHospitalityIndustryRadio1"
              value="FoodHospitalityIndustryYes"
              checked={isFoodHospitalityIndustry === "FoodHospitalityIndustryYes"}
              onChange={this.handleFoodHospitalityIndustry}
              className={`${styles.radioText}`}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="formFoodHospitalityIndustry"
              id="formFoodHospitalityIndustryRadio2"
              value="FoodHospitalityIndustryNo"
              checked={isFoodHospitalityIndustry === "FoodHospitalityIndustryNo"}
              onChange={this.handleFoodHospitalityIndustry}
              className={`${styles.radioText}`}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
        { isSeasonalBusiness === 'SeasonalBusinessNo' ? <Form.Label className={`text-muted ${styles.labelText}`}>
            Average monthly payroll costs over the last year
          </Form.Label> 
          : <Form.Label className={`text-muted ${styles.labelText}`}>
            Average monthly payroll costs for any 12-week period between February 15, 2019 and February 15, 2020 
          </Form.Label>
        }
        <CurrencyInput
          id="amount1"
          placeholder="$0"
          allowDecimals={false}
          className={`form-control ${className}`}
          onValueChange={(value) => this.validateValue(value, 'totalPayroll')}
          prefix={'$'}
          step={10}
        />
        <div className="invalid-feedback">{errorMessage}</div>
      </Form.Group>
    </>
  }

  render() {
    let loanCalcForm

    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      isSeasonalBusiness,
      isQuater2019,
      amount,
      findMore
    } = this.state;

    if (recievedPPPFunds2020 === 'PPPFunds2020Yes'){
      if (isInBussinessFeb2020 === 'BussinessFeb2020Yes') {
        if (isQuater2019 === 'Quater2019Yes') {
          loanCalcForm = this.renderForm5();
        } else if (isQuater2019 === 'Quater2019No') {
          loanCalcForm = this.renderForm4();
        }
      } else if (isInBussinessFeb2020 === 'BussinessFeb2020No'){
        loanCalcForm = this.renderForm4();
      }
    } else if (recievedPPPFunds2020 === 'PPPFunds2020No'){
      if (isInBussinessFeb2020 === 'BussinessFeb2020Yes') {
        if (isSeasonalBusiness === 'SeasonalBusinessYes') {
          loanCalcForm = this.renderForm2();
        } else if (isSeasonalBusiness === 'SeasonalBusinessNo'){
          loanCalcForm = this.renderForm1();
        }
      } else if (isInBussinessFeb2020 === 'BussinessFeb2020No'){
        loanCalcForm = this.renderForm3();
      }
    }

    return (
      <div>
        <Container className={`border themed-container ${styles.calcContainer}`}>
          <Row>
            <Col xl={7} lg={7} md={7} sm={12} xs={12} className={`${styles.rightCol}`}>
              <Form className={`${styles.formContainer}`}>
                <Form.Group controlId="formCalcPPPContainer" className={`${styles.formGroupLeftContainer}`}>
                  <Form.Label className={`${styles.formCalcPPPContainerLabel}`}>
                    PPP Loan Calculator
                  </Form.Label>
                </Form.Group>
                {loanCalcForm}
                <Form.Group>
                  <Form.Text className={`${styles.findMore}`}>
                    Self-employed? Find out more here.
                    <div className={`${styles.svgContainer}`} onClick={this.onShowFindMore}>
                      <svg fill="currentcolor" width="15" height="15" viewBox="0 0 24 24" className="styled-svg svg-cc42820e styled-Info Info-0 ">
                        <path d="M13,15.5 L13.5001925,15.5 C14.0523709,15.5 14.5,15.9438648 14.5,16.5 C14.5,17.0522847 14.0562834,17.5 13.5001925,17.5 L10.4998075,17.5 C9.94762906,17.5 9.5,17.0561352 9.5,16.5 C9.5,15.9477153 9.94371665,15.5 10.4998075,15.5 L11,15.5 L11,12.5 L10.5029595,12.5 C9.94904028,12.5 9.5,12.0561352 9.5,11.5 C9.5,10.9477153 9.94327742,10.5 10.5029595,10.5 L11.9970405,10.5 C12.275656,10.5 12.5252617,10.6117379 12.70615,10.7926069 C12.8881391,10.9728223 13,11.2224272 13,11.5 L13,15.5 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M12,9.5 C11.1715729,9.5 10.5,8.82842712 10.5,8 C10.5,7.17157288 11.1715729,6.5 12,6.5 C12.8284271,6.5 13.5,7.17157288 13.5,8 C13.5,8.82842712 12.8284271,9.5 12,9.5 Z">
                        </path>
                      </svg>
                    </div>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="text-center">
                  <Button variant="success" onClick={this.onCalc} size='lg' className={`${styles.button}`}>
                    <div className={`${styles.buttonText}`}>
                      Calculate
                    </div>
                  </Button>
                </Form.Group>
                {
                  findMore && <Media className={`${styles.findMoreContainer}`}>
                    <Media.Body>
                      <div className={`${styles.svgMediaContainer}`}>
                        <svg fill="currentcolor" width="25" height="25" viewBox="0 0 24 24" className="styled-svg svg-cc42820e styled-Info Info-0 ">
                          <path d="M13,15.5 L13.5001925,15.5 C14.0523709,15.5 14.5,15.9438648 14.5,16.5 C14.5,17.0522847 14.0562834,17.5 13.5001925,17.5 L10.4998075,17.5 C9.94762906,17.5 9.5,17.0561352 9.5,16.5 C9.5,15.9477153 9.94371665,15.5 10.4998075,15.5 L11,15.5 L11,12.5 L10.5029595,12.5 C9.94904028,12.5 9.5,12.0561352 9.5,11.5 C9.5,10.9477153 9.94327742,10.5 10.5029595,10.5 L11.9970405,10.5 C12.275656,10.5 12.5252617,10.6117379 12.70615,10.7926069 C12.8881391,10.9728223 13,11.2224272 13,11.5 L13,15.5 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M12,9.5 C11.1715729,9.5 10.5,8.82842712 10.5,8 C10.5,7.17157288 11.1715729,6.5 12,6.5 C12.8284271,6.5 13.5,7.17157288 13.5,8 C13.5,8.82842712 12.8284271,9.5 12,9.5 Z">
                          </path>
                        </svg>
                      </div>
                      <p><b>Payroll costs include:</b> Salary, wage or similar compensation; Payment of cash tips or equivalent; 
                        Payment for vacation, parental, family, medical, or sick leave; Allowance for dismissal or separation; 
                        Payment required for the provisions of group health care benefits, including insurance premiums; 
                        Payment of any retirement benefit; Payment of State or local tax assessed on the compensation of employees; 
                        plus the sum of payments of any compensation or income that is a wage, commission, income, net earnings 
                        from self-employment, or similar compensation and that is in an amount that is not more than $100,000 in 1 year, 
                        as prorated for the covered period.
                      </p>

                      <p>
                        Self employed individuals (including independent contractors) who file IRS Form 1040 Schedule C with 
                        no employees should enter their net profit from their 2019 Schedule C (line 31).
                      </p>
                      
                      <p><b>Payroll costs exclude:</b> compensation of an individual person in excess of $100,000 (as prorated for the period); 
                        federal employment taxes imposed or withheld taxes; compensation to an employee whose principal residence is outside 
                        of the U.S.; qualified sick leave for which a credit is allowed under Section 7001 of the Families 
                        First Coronavirus Response Act; and qualified family leave wages for which a credit is allowed under Section 
                        7001 of the Families First Coronavirus Response Act.
                      </p>

                      <p><b>Self-employment:</b> Self employed individuals (including independent contractors) who file IRS Form 1040 Schedule 
                        C with no employees should enter their net profit from their 2019 Schedule C line 31 as payroll. 
                        (The 2019 tax return does not have to be filed, but it must be completed to complete this calculation.)
                      </p>

                      <p><b>Hospitality:</b> Businesses with a NAICS industry code starting with 72 (hospitality or food industry) 
                        may qualify for a second draw PPP loan of 3.5 times the average monthly payroll.
                      </p>
                    </Media.Body>
                  </Media>
                }
              </Form>
            </Col>
            <Col xl={5} lg={5} md={5} sm={12} xs={12} className={`${styles.leftCol}`}>
              <Form className={`${styles.formContainer}`}>
                <Form.Group controlId="calcPPPContainer" className="text-center">
                  <img 
                    src={dollarImg} 
                    alt="Illustration of a bag of money" 
                    style={{width: 96, height: 96}}
                  />
                  <Form.Group>
                    <Form.Label className={`${styles.formCalcPPPContainerRightLabel}`}>
                      How much you may qualify for
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={`${styles.amount}`}>
                      ${amount}
                    </Form.Label>
                  </Form.Group>
                  <Card>
                    <Card.Body>
                      <Card.Title className={`${styles.cardTitleText}`}>Paycheck Protection Program (PPP)</Card.Title>
                      <Card.Text className={`${styles.cardBodyText}`}>
                        Complete your PPP application in 15 minutes or less with one of Nav’s trusted partners.
                      </Card.Text>
                      <Button variant="success" size='lg' className={`${styles.button}`}>
                        <div className={`${styles.buttonText}`}>
                          Get Started
                        </div>
                      </Button>
                    </Card.Body>
                  </Card>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
};

calc.defaultProps = {
  recievedPPPFunds2020: 'PPPFunds2020No',
  isInBussinessFeb2020: 'BussinessFeb2020Yes',
  isSeasonalBusiness: 'SeasonalBusinessNo',
  isFoodHospitalityIndustry: 'FoodHospitalityIndustryNo',
  isQuater2019: 'Quater2019No',
  amount: ''
};