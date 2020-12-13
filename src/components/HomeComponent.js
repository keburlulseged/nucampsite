import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const RenderCard = ({item, isLoading, errMess}) => {
  if (isLoading) {
    return <Loading />
  }
  if (errMess) {
    return <h4>{errMess}</h4>
  }
  return (
    <FadeTransform
      in
      transfromProps={{
        exitTransform: 'scale(0.5) translate(50%)'
      }} >
      <Card>
        <CardImg src={baseUrl + item.image} alt={item.name} />
        <CardBody>
          <CardTitle> {item.name} </CardTitle>
          <CardText> {item.desctription}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  )
}

const Home = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md m-1">
          <RenderCard
            item={props.campsite}
            isLoading={props.campsitesLoading}
            errMess={props.campsitesErrMess}
          />
        </div>
        <div className="col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promotionLoading}
            errMess={props.promotionErrMess}/>
        </div>
        <div className="col-md m-1">
          <RenderCard
            item={props.partners}
            isLoading={props.partnersLoading}
            errMess={props.partnersErrMess}/>
        </div>
      </div>
    </div>
  )
}

export default Home;
