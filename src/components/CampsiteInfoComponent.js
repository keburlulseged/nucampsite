import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';






  const RenderCampsite = ({campsite}) => {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }

  const RenderComments = ({comments}) => {
    if(comments) {
      return (
        <div className="col-md-5 m1">
          <h4>Comments</h4>
          {comments.map(comment => {
            return (
            <div key={comment.id}>
              <p>
                {comment.text} <br/>
                --- {comment.author + ',  ' }
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
            )
            })
          }
          <CommentForm />
        </div>
      )
    }
    return (
      <div></div>
    )
  }

 class CommentForm extends Component {
   constructor(props) {
     super(props);
     this.state = {
       isModalOpen: false
     }

     this.toggleModal = this.toggleModal.bind(this);
   }

   toggleModal() {
     this.setState({
       isModalOpen: !this.state.isModalOpen
     })
   }

   handleSubmit(values) {
    alert("Current state is: " + JSON.stringify(values));
   }


   render() {
     return (
       <React.Fragment>
         <Button onClick={this.toggleModal} outline>
           <i className="fa fa-sign-in fa-lg" /> Sumbit Comment
         </Button>

         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
           <ModalHeader>Submit Comment</ModalHeader>
           <ModalBody>
             <LocalForm onSubmit={values => this.handleSubmit(values)}>
               <Row className="form-group">
                 <Label htmlFor="rating" md={2}>Rating</Label>
                 <Col md={10}>
                   <Control.select model=".rating" id="rating" name="rating" className="form-control" defaultValue="5">
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                   </Control.select>
                 </Col>
               </Row>
               <Row className="form-group">
                 <Label htmlFor="author" md={2}>Your Name</Label>
                 <Col md={10}>
                   <Control.text model=".author" id="author" name="author" className="form-control" />
                 </Col>
               </Row>
               <Row className="form-group">
                 <Label htmlFor="comment" md={2}>Comment</Label>
                 <Col md={10}>
                   <Control.textarea model=".comment" rows="6" id="comment" name="comment" className="form-control" />
                 </Col>
               </Row>
               <Row className="form-group">
                 <Col md={{size: 10, offset: 2}}>
                   <Button type="submit" color="primary">
                     Submit
                   </Button>
                 </Col>
               </Row>
             </LocalForm>
           </ModalBody>
         </Modal>
       </React.Fragment>
     )
   }
    }

  const CampsiteInfo = (props) => {
    if(props.campsite) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <Breadcrumb>
                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
              </Breadcrumb>
              <h2>{props.campsite.name}</h2>
              <hr />
            </div>
          </div>
          <div className="row">
            <RenderCampsite campsite={props.campsite} />
            <RenderComments comments={props.comments} />
          </div>

        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }


export default CampsiteInfo;
