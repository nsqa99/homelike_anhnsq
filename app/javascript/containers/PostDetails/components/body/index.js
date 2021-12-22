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
import Comment from "../../../../components/Comment";
import CustomPagination from "../../../../components/Pagination";
import Post from "../../../../components/Post";
import { RouterLink } from "../../../../components/custom/RouterLink";

const DetailBody = ({ post, location }) => {
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
          detail={true}
          imageSize="400px"
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
