import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import styles from './calc.module.scss';

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
            dispAmount = (totalPayroll * 3.5).toString();
            this.setState({amount: dispAmount})
          } else if (isSeasonalBusiness === 'SeasonalBusinessNo') {
            dispAmount = (totalPayroll * 2.5).toString();
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
            dispAmount = (totalPayroll1 * 2.5 / 4).toString();
          } else {
            dispAmount = (totalPayroll2 * 2.5 / 2.75).toString();
          }
          this.setState({amount: dispAmount});

        } else if (isSeasonalBusiness === 'SeasonalBusinessNo'){
          dispAmount = (totalPayroll * 2.5 / 12).toString();
          this.setState({amount: dispAmount});
        }
      } else if (isInBussinessFeb2020 === 'BussinessFeb2020No'){
        dispAmount = (totalPayroll * 2.5 / 2).toString();
        this.setState({amount: dispAmount});
      }
    }
  }

  renderForm1(){
    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      isSeasonalBusiness,
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Were you in business February 15, 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formSeasonalBusiness" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Are you a seasonal business?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio1"
              value="SeasonalBusinessYes"
              checked={isSeasonalBusiness === 'SeasonalBusinessYes'}
              onChange={this.handleSeasonalBusiness}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          What were your total payroll costs in the last 12 months? 
        </Form.Label>
        <Form.Control 
          type="number" 
          placeholder="$" 
          name="amount1" 
          onChange={event=>{
            this.setState({totalPayroll: event.target.value})
          }}
        />
      </Form.Group>
    </>
  }

  renderForm2(){
    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
      isSeasonalBusiness,
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Were you in business February 15, 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formSeasonalBusiness" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Are you a seasonal business?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio1"
              value="SeasonalBusinessYes"
              checked={isSeasonalBusiness === 'SeasonalBusinessYes'}
              onChange={this.handleSeasonalBusiness}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          What was your total payroll costs between March 1 2019 and June 30 2019?
        </Form.Label>
        <Form.Control 
          type="number" 
          placeholder="$" 
          name="amount2" 
          onChange={event=>{
            this.setState({totalPayroll1: event.target.value})
          }}
        />
      </Form.Group>
      <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          What was your total payroll costs between Feb 15 2019 and May 10 2019? 
        </Form.Label>
        <Form.Control 
          type="number" 
          placeholder="$" 
          name="amount3"
          onChange={event=>{
            this.setState({totalPayroll2: event.target.value})
          }}
        />
      </Form.Group>
    </>
  }

  renderForm3(){
    const {
      recievedPPPFunds2020,
      isInBussinessFeb2020,
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Were you in business February 15, 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
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
            />
          </Col>
        </Row>
        <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
          <Form.Label className="text-muted">
            What were your total payroll costs between Jan 1 2020 and Feb 29 2020?
          </Form.Label>
          <Form.Control 
            type="number" 
            placeholder="$" 
            name="amount4"
            onChange={event=>{
              this.setState({totalPayroll: event.target.value})
            }}
          />
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
        <Form.Label className="text-muted">
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Were you in business February 15, 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
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
            />
          </Col>
        </Row>
        {
          isInBussinessFeb2020 === 'BussinessFeb2020No' && <Form.Text>
            To qualify for additional PPP funds, you would have needed to be in business before February 15, 2020.
          </Form.Text>
        }
      </Form.Group>
      <Form.Group controlId="formQuater2019" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          In any quarter in 2020 did your business have 25% less gross receipts than the same quarter in 2019
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formQuater2019"
              id="formQuater2019Radio1"
              value="Quater2019Yes"
              checked={isQuater2019 === "Quater2019Yes"}
              onChange={this.handleQuater2019}
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
            />
          </Col>
        </Row>
        {
          isQuater2019 === 'Quater2019No' && <Form.Text>
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
      isQuater2019
    } = this.state;

    return <>
      <Form.Group controlId="formPPPFunds2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Did you receive PPP funds in 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formPPPFunds2020"
              id="formPPPFunds2020Raido1"
              value="PPPFunds2020Yes"
              checked={recievedPPPFunds2020 === 'PPPFunds2020Yes'}
              onChange={this.handleFormPPPFunds2020}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formBussinessFeb2020" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Were you in business February 15, 2020?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formBussinessFeb2020"
              id="formBussinessFeb2020Radio1"
              value="BussinessFeb2020Yes"
              checked={isInBussinessFeb2020 === 'BussinessFeb2020Yes'}
              onChange={this.handleBussinessFeb2020}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formQuater2019" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          In any quarter in 2020 did your business have 25% less gross receipts than the same quarter in 2019
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formQuater2019"
              id="formQuater2019Radio1"
              value="Quater2019Yes"
              checked={isQuater2019 === "Quater2019Yes"}
              onChange={this.handleQuater2019}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formSeasonalBusiness" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Are you a seasonal business?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formSeasonalBusiness"
              id="formSeasonalBusinessRadio1"
              value="SeasonalBusinessYes"
              checked={isSeasonalBusiness === 'SeasonalBusinessYes'}
              onChange={this.handleSeasonalBusiness}
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
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="formFoodHospitalityIndustry" className={`${styles.formGroupLeftContainer}`}>
        <Form.Label className="text-muted">
          Is your business in the food or hospitality industry? 
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="formFoodHospitalityIndustry"
              id="formFoodHospitalityIndustryRadio1"
              value="FoodHospitalityIndustryYes"
              checked={isFoodHospitalityIndustry === "FoodHospitalityIndustryYes"}
              onChange={this.handleFoodHospitalityIndustry}
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
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="formAmount" className={`${styles.formGroupLeftContainer}`}>
        { isSeasonalBusiness === 'SeasonalBusinessNo' ? <Form.Label className="text-muted">
            Average monthly payroll costs over the last year
          </Form.Label> 
          : <Form.Label className="text-muted">
            Average monthly payroll costs for any 12-week period between February 15, 2019 and February 15, 2020 
          </Form.Label>
        }
        <Form.Control 
          type="number"
          placeholder="$"
          name="amount5"
          onChange={event=>{
            this.setState({totalPayroll: event.target.value})
          }}
        />
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
            <Col xl={8} lg={8} md={7} sm={12} xs={12} className={`${styles.rightCol}`}>
              <Form className={`${styles.formContainer}`}>
                <Form.Group controlId="formCalcPPPContainer" className={`${styles.formGroupLeftContainer}`}>
                  <Form.Label className={`${styles.formCalcPPPContainerLabel}`}>
                    PPP Loan Calculator
                  </Form.Label>
                </Form.Group>
                {loanCalcForm}
                <Form.Group className="text-center">
                  <Button variant="primary" onClick={this.onCalc}>
                    Calculate
                  </Button>
                </Form.Group>
              </Form>
            </Col>
            <Col xl={4} lg={4} md={5} sm={12} xs={12} className={`${styles.leftCol}`}>
              <Form className={`${styles.formContainer}`}>
                <Form.Group controlId="calcPPPContainer" className="text-center">
                  <img 
                    src="https://creditera-assets.s3-us-west-2.amazonaws.com/design-assets/icons/logged-out/moneyBag.svg" 
                    alt="Illustration of a bag of money" 
                  />
                  <Form.Group>
                    <Form.Label>
                      How much you may qualify for
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      $- {amount}
                    </Form.Label>
                  </Form.Group>
                  <Card>
                    <Card.Body>
                      <Card.Title>Paycheck Protection Program (PPP)</Card.Title>
                      <Card.Text>
                        Complete your PPP application in 15 minutes or less with one of Nav’s trusted partners.
                      </Card.Text>
                      <Button variant="primary">Get Started</Button>
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