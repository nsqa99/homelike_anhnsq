import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
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
import {
  createComment,
  getAllComment,
} from "../../../../redux/comment/comment.action";

const DetailBody = ({ isAuthenticated, currentUser, post, location }) => {
  const listComments = useSelector((state) => state.comments);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState({
    postId: post.id,
    content: content,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (post) {
      setComment({ ...comment, postId: post.id });
      dispatch(getAllComment(post.id));
    }
  }, []);

  const handleComment = () => {
    dispatch(createComment(comment));
    setContent("");
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);

    setComment({ ...comment, content: e.target.value });
  };

  return (
    <Row>
      <Col
        md="12"
        lg="9"
        className="mt-4 d-flex flex-column align-items-center"
      >
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
          style={{ width: "80%" }}
        />

        <Card styleName="body__merchant">
          <CardBody>
            {isAuthenticated ? (
              <>
                {"Comments"}
                <Input
                  id="comment"
                  name="comment"
                  type="textarea"
                  placeholder="Write down your comment"
                  className="mt-3"
                  rows="5"
                  onChange={handleContentChange}
                  value={content}
                />
                <Button
                  color="danger"
                  className="mt-3 mb-5"
                  onClick={handleComment}
                >
                  Post
                </Button>{" "}
                <hr />
              </>
            ) : (
              <div className="fs-6 mt-2 fw-bold fst-italic">
                Sign in and drop some comments
              </div>
            )}

            {listComments.list?.length > 0 ? (
              <>
                {listComments.list
                  .slice(0)
                  .reverse()
                  .map((comment) => {
                    const isOwner =
                      isAuthenticated && comment.owner.username === currentUser;
                    return (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        isOwner={isOwner}
                      />
                    );
                  })}
                <CustomPagination
                  totalPages={listComments.pagination.total_pages}
                  currentPage={listComments.pagination.page}
                  fn={(options) => dispatch(getAllComment(comment.id, options))}
                />
              </>
            ) : (
              <div className="fs-6 mt-2 fw-bold fst-italic mt-5 mb-4 w-100 text-center">
                No comment
              </div>
            )}
          </CardBody>
        </Card>
      </Col>

      <Col md="12" lg="3" className="pl-3">
        {/* <RightPanel /> */}
      </Col>
    </Row>
  );
};
export default CSSModules(DetailBody, style);
