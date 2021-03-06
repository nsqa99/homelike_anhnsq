import React from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Input,
} from "reactstrap";
import Avatar from "../../constants/images/Avatar.png";
import DeleteIcon from "@material-ui/icons/Delete";
import { formatDateTime } from "../../utils";
import { destroyComment } from "../../redux/comment/comment.action";

const Comment = ({ comment, isOwner }) => {
  const dispatch = useDispatch();
  const handleDestroyComment = () => {
    const data = {
      postId: comment.post_id,
      commentId: comment.id,
    };
    dispatch(destroyComment(data));
  };

  return (
    <Card styleName="comment">
      <CardBody>
        <div className="d-flex align-items-center mb-2">
          <img
            src={comment.owner.avatar || Avatar}
            styleName="comment__avatar"
          />
          <CardTitle className="ms-2 mb-0" styleName="">
            {comment.owner.fullname}
          </CardTitle>
        </div>
        <CardSubtitle className="mb-2 ms-1 text-muted" style={{ fontSize: 13 }}>
          {formatDateTime(comment.created_at)}
        </CardSubtitle>

        <hr />
        <div className="d-flex align-items-center">
          <div styleName="comment__content">{comment.content}</div>
          {isOwner && (
            <Button
              className="ms-auto"
              color="danger"
              outline
              onClick={handleDestroyComment}
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
export default CSSModules(Comment, style);
