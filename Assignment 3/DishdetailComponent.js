import React, {Component} from 'react';
import {
    Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Modal,Button,
    ModalBody,ModalHeader,FormGroup,Form,Input,Label,Row,Col,
  } from "reactstrap";  
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isConmmentModalopen: false,
      };
      this.toggleCommentModal = this.toggleCommentModal.bind(this);
      this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
    }
  
    toggleCommentModal() {
      this.setState({
        isCommentModalOpen: !this.state.isCommentModalOpen,
      });
    }
  
    handleCommentFormSubmit(values) {
      const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
      console.log(
        "Current State is: " + JSON.stringify(values, getCircularReplacer())
      );
      alert("Current State is: " + JSON.stringify(values, getCircularReplacer()));
    }
  
    render() {
      return (
        <React.Fragment>
          <Button outline onClick={this.toggleCommentModal}>
            <span className="fa fa-pencil fa-lg"> Submit Comment</span>
          </Button>
          <Modal
            isOpen={this.state.isCommentModalOpen}
            toggle={this.toggleCommentModal}
          >
            <ModalHeader toggle={this.toggleCommentModal}>
              Submit Comments
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleCommentFormSubmit}>
                <LocalForm
                  onSubmit={(values) => this.handleCommentFormSubmit(values)}
                >
                  <FormGroup>
                    <Row className="form-group">
                      <Label htmlFor="rating" md={10}>
                        Rating
                      </Label>
                      <Col md={12}>
                        <Control.select
                          model=".rating"
                          id="rating"
                          name="rating"
                          className="form-control"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Control.select>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row className="form-group">
                      <Label htmlFor="author" md={10}>
                        Your Name
                      </Label>
                      <Col md={12}>
                        <Control.text
                          model=".author"
                          id="author"
                          name="author"
                          placeholder="Your Name"
                          className="form-control"
                          validators={{
                            required,
                            minLength: minLength(3),
                            maxLength: maxLength(15),
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".author"
                          show="touched"
                          messages={{
                            required: "Required ",
                            minLength: "Must be greater than 2 characters",
                            maxLength: "Must be 15 characters or less",
                          }}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row className="form-group">
                      <Label htmlFor="message" md={12}>
                        Comment
                      </Label>
                      <Col md={12}>
                        <Control.textarea
                          model=".comment"
                          id="comment"
                          name="comment"
                          rows="6"
                          className="form-control"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Row className="form-group">
                    <Col md={{ size: 10, offset: 2 }}>
                      <Button type="submit" color="primary">
                        Comment
                      </Button>
                    </Col>
                  </Row>
                </LocalForm>
              </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
      );
    }
  }
  


function RenderComments({ comments }) {
    if (comments == null) {
        return (<div></div>)
    }
    const cmnts = comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, &nbsp;
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                </p>
            </li>
        )
    })
    return (
        <Card>
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                {cmnts}
                <CommentForm />
            </ul>

        </Card>
    )
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
        )
    }
    else {
        return (<div></div>)
    }
}

const Dishdetail = (props) => {
    const dish = props.dish
    if (dish == null) { return (<div></div>) }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    );
}

export default Dishdetail
