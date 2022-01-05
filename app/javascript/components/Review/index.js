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
import StarIcon from "@material-ui/icons/Star";
import { formatDateTime } from "../../utils";
import { destroyReview } from '../../redux/review/review.action'

const Review = ({ review, isOwner }) => {
  const dispatch = useDispatch();
  const handleDestroyReview = () => {
    const data = {
      itemId: review.itemId,
      reviewId: review.id,
    };
    dispatch(destroyReview(data));
  };

  return (
    <Card styleName="comment">
      <CardBody>
        <div className="d-flex align-items-center mb-2">
          <img
            src={review.owner.avatar || Avatar}
            styleName="comment__avatar"
          />
          <CardTitle className="ms-2 mb-0" styleName="">
            {review.owner.fullname}
          </CardTitle>
          <div className="ms-auto text-warning">
            {!!review.rate && Array(review.rate)
              .fill()
              .map((_, index) => (
                <StarIcon key={index}></StarIcon>
              ))}
          </div>
        </div>
        <CardSubtitle className="mb-2 ms-1 text-muted" style={{ fontSize: 13 }}>
          {formatDateTime(review.created_at)}
        </CardSubtitle>

        <hr />
        <div className="d-flex align-items-center">
          <div styleName="comment__content">{review.content}</div>
          {isOwner && (
            <Button
              className="ms-auto"
              color="danger"
              outline
              onClick={handleDestroyReview}
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
export default CSSModules(Review, style);
