import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';




  const required = val => val && val.length;
  const maxLength = len => val => !val || (val.length <= len);
  const minLength = len => val => val && (val.length >= len);


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

  const RenderComments = ({comments, addComment, campsiteId}) => {
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
          <CommentForm campsiteId={campsiteId} addComment={addComment} />
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
       rating: '',
       author: '',
       comment: '',
       isModalOpen: false,
       touched: {
         rating: false,
         author: false,
         comment: false
       }

     }

     this.toggleModal = this.toggleModal.bind(this);
   }

   toggleModal() {
     this.setState({
       isModalOpen: !this.state.isModalOpen
     })
   }

   handleSubmit(values) {
     this.toggleModal();
     this.props.addComment(this.props.campsiteId, values.rating, values.author, values.comment);
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
                   <Control.select model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                    defaultValue="5"
                    validators ={{required}}
                    >
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                   </Control.select>
                   <Errors className="text-danger"
                    model=".rating"
                    show="touched"
                    component="div"
                    messages={{required: 'Required'}}
                   />
                 </Col>
               </Row>
               <Row className="form-group">
                 <Label htmlFor="author" md={2}>Your Name</Label>
                 <Col md={10}>
                   <Control.text model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    validators={{
                      required,
                      minLength : minLength(2),
                      maxLength: maxLength(15)}}
                    />
                   <Errors className="text-danger"
                   model=".author"
                   show="touched"
                   messages={{
                     required: 'Required',
                     minLength: 'Must be at least 2 characters',
                     maxLength: 'Must be less than 15 characters'}}
                    />
                 </Col>
               </Row>
               <Row className="form-group">
                 <Label htmlFor="comment" md={2}>Comment</Label>
                 <Col md={10}>
                   <Control.textarea model=".comment"
                      rows="6"
                      id="comment"
                      name="comment"
                      className="form-control"
                      validators={{required}}
                    />
                   <Errors className="text-danger"
                      model=".comment"
                      show="touched"
                      messages={{required: "Input feild can\'t be empty"}} />
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
    if (props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      )
    }
    if (props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>{props.errMess}</h4>
            </div>
          </div>
        </div>
      )
    }
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
            <RenderComments
                comments={props.comments}
                addComment={props.addComment}
                campsiteId={props.campsite.id}
            />
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
