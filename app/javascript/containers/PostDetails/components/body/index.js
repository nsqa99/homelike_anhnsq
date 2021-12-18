import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useSelector } from "react-redux";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RightPanel from "./RightPanel";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Row,
} from "reactstrap";
import DefaultImage from "../../../../constants/images/DefaultImage.png";
import DefaultAvatar from "../../../../constants/images/DefaultAvatar.png";
import styled from "styled-components";
import Comment from "../../../../components/Comment";
import CustomPagination from "../../../../components/Pagination";
import { MySlider } from "../../../../components/Slider";
import { formatDate } from "../../../../utils";
import Post from "../../../../components/Post";
import { RouterLink } from "../../../../components/custom/RouterLink";

const CustomSlider = styled.div`
  .slick-list {
    height: 500px;
    border-radius: 3px;

    img {
      object-fit: cover;
      min-height: 500px;
    }
  }
`;

const Slider = ({ images }) => {
  return (
    <CustomSlider>
      <MySlider items={images} />
    </CustomSlider>
  );
};

const DetailBody = ({ post, location }) => {
  const carouselImages = post.images?.length
    ? post.images.map((image) => {
        return { key: image.url, altText: "Image", src: image.url };
      })
    : [
        {
          altText: "Test",
          key: 1,
          // src: DefaultImage,
          src: DefaultAvatar,
        },
        {
          altText: "Test2",
          key: 2,
          // src: DefaultImage,
          src: DefaultAvatar,
        },
        {
          altText: "Test3",
          key: 3,
          // src: DefaultImage,
          src: "https://picsum.photos/id/678/1200/600",
        },
      ];

  return (
    <Row>
      <Col md="12" lg="9" className="mt-4 d-flex flex-column align-items-center">
        <div styleName="body__title" className="mb-5 align-self-start">
          <RouterLink
            to={location.state?.prevPath || "/social"}
            className="d-flex align-items-center w-100 justify-content-start"
            styleName="post__create"
          >
            <ArrowBackIosIcon styleName="icon__back" />
            Back
          </RouterLink>
        </div>
        <Post
          post={post}
          slider={<Slider images={carouselImages}/>}
          detail={true}
          style={{maxWidth: "80%"}}
        />
        <Card styleName="body__merchant">
          <CardBody>
            {"Comments"}

            <Input
              id="comment"
              name="comment"
              type="textarea"
              placeholder="Write down your comment"
              className="mt-3"
              rows="5"
            />
            <Button color="danger" className="mt-3 mb-3">
              Post
            </Button>

            <hr />

            <Comment />
            <CustomPagination
              url={`/posts/${post.id}/comments`}
              totalPages={4}
              currentPage={1}
            />
          </CardBody>
        </Card>
      </Col>
      <Col md="12" lg="3" className="pl-3">
        <RightPanel />
      </Col>
    </Row>
  );
};
export default CSSModules(DetailBody, style);
